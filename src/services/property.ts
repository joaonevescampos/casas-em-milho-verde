import { convertToWebp } from "@/utils/convertFiles";
import { supabase } from "../lib/supabase";
import type {
  ShortImagesType,
  Property,
  PropertyCardType,
  PropertyImages,
} from "../types/properties";

export default class Services {
  async getCoverImagesFromPurpose(
    purpose: string,
  ): Promise<ShortImagesType[] | null> {
    try {
      const { data } = await supabase
        .from("property_images")
        .select("id, property_id, cover_image, image_url")
        .eq("purpose", purpose)
        .order("position", { ascending: true });
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async detailCoverImageFromPropertyID(
    propertyId: string,
  ): Promise<ShortImagesType | null> {
    try {
      const { data } = await supabase
        .from("property_images")
        .select("id, property_id, cover_image, image_url")
        .eq("property_id", propertyId)
        .eq("cover_image", true)
        .single();
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async detailImagesFromPropertyId(
    propertyId: string,
  ): Promise<ShortImagesType[] | null> {
    console.log("acessei o banco");
    try {
      const { data } = await supabase
        .from("property_images")
        .select("id, property_id, cover_image, image_url")
        .eq("property_id", propertyId);
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async addImages(files: File[], propertyId: string, initialLength: number) {
    try {
      const imagesToInsert: PropertyImages[] = [];

      const timestamp = Date.now();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Converte para WebP
        const webpBlob = await convertToWebp(file);

        if (!webpBlob) {
          throw new Error("Erro ao converter imagem para WebP.");
        }

        // Sempre salva como .webp
        const fileName = `${timestamp}-${initialLength + i}.webp`;

        const filePath = `${propertyId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property_images")
          .upload(filePath, webpBlob, {
            contentType: "image/webp",
          });

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("property_images").getPublicUrl(filePath);

        imagesToInsert.push({
          property_id: propertyId,
          image_url: publicUrl,
          position: initialLength + i,
          cover_image: initialLength + i === 0,
        });
      }

      const { data, error } = await supabase
        .from("property_images")
        .insert(imagesToInsert)
        .select("*");

      if (error) throw error;

      return data ?? null;
    } catch (error) {
      throw error;
    }
  }

  async deletePropertyImages(propertyId: string) {
    try {
      // Lista arquivos da pasta
      const { data: files, error } = await supabase.storage
        .from("property_images")
        .list(propertyId);

      if (error) throw error;

      // Remove arquivos do Storage
      if (files?.length) {
        const { error: removeError } = await supabase.storage
          .from("property_images")
          .remove(files.map((file) => `${propertyId}/${file.name}`));

        if (removeError) throw removeError;
      }

      // Remove registros do banco
      const { error: deleteError } = await supabase
        .from("property_images")
        .delete()
        .eq("property_id", propertyId);

      if (deleteError) throw deleteError;
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(imageId: string) {
    try {
      // Verifica se o usuário está autenticado
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Usuário não autenticado");
      }

      // Busca o registro da imagem
      const { data: image, error } = await supabase
        .from("property_images")
        .select("*")
        .eq("id", imageId)
        .single();

      if (error) throw error;

      if (!image) return null;

      // Extrai o caminho do arquivo no bucket
      const filePath = image.image_url.split("/public/property_images/")[1];

      // Remove o arquivo do Storage
      const { error: storageError } = await supabase.storage
        .from("property_images")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Remove o registro do banco
      const { error: deleteError } = await supabase
        .from("property_images")
        .delete()
        .eq("id", imageId);

      if (deleteError) throw deleteError;

      // Se era a capa, promove outra imagem
      if (image.cover_image) {
        const { data: firstImage } = await supabase
          .from("property_images")
          .select("id")
          .eq("property_id", image.property_id)
          .order("position", { ascending: true })
          .limit(1)
          .single();

        if (firstImage) {
          await supabase
            .from("property_images")
            .update({
              cover_image: true,
            })
            .eq("id", firstImage.id);
        }
      }
      return image;
    } catch (error) {
      throw error;
    }
  }
  async selectRelatedPropertySale(
    category: string,
  ): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      let finalResults: PropertyCardType[] = [];

      // Primeiro: Buscar 4 propriedades da categoria específica
      const { data: categoryData, error: categoryError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "sale")
        .eq("category", category)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(4);

      if (categoryError) throw categoryError;

      // Adiciona os resultados da categoria específica
      if (categoryData && categoryData.length > 0) {
        finalResults = [...categoryData];
      }

      // Se não completou 4 resultados, busca o restante da categoria "sale"
      if (finalResults.length < 4) {
        const remainingCount = 4 - finalResults.length;

        // Buscar IDs já selecionados para evitar duplicatas
        const existingIds = finalResults.map((item) => item.id);

        const { data: saleData, error: saleError } = await supabase
          .from("properties")
          .select(
            "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
          )
          .eq("purpose", "sale")
          .not("category", "eq", category) // Exclui a categoria já buscada
          .order("order", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false })
          .limit(remainingCount);

        if (saleError) throw saleError;

        // Filtra para evitar duplicatas (segurança extra)
        if (saleData) {
          const filteredSaleData = saleData.filter(
            (item) => !existingIds.includes(item.id),
          );
          finalResults = [...finalResults, ...filteredSaleData];
        }
      }

      return finalResults.length > 0 ? finalResults : null;
    } catch (error) {
      throw Error(`Error to fetch sale properties ${error}`);
    }
  }

  async selectRelatedPropertyRent(
    category: string,
  ): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      let finalResults: PropertyCardType[] = [];

      // Primeiro: Buscar 4 propriedades da categoria específica
      const { data: categoryData, error: categoryError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "rent")
        .eq("category", category)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(4);

      if (categoryError) throw categoryError;

      // Adiciona os resultados da categoria específica
      if (categoryData && categoryData.length > 0) {
        finalResults = [...categoryData];
      }

      // Se não completou 4 resultados, busca o restante da categoria "rent"
      if (finalResults.length < 4) {
        const remainingCount = 4 - finalResults.length;

        // Buscar IDs já selecionados para evitar duplicatas
        const existingIds = finalResults.map((item) => item.id);

        const { data: rentData, error: rentError } = await supabase
          .from("properties")
          .select(
            "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
          )
          .eq("purpose", "rent")
          .not("category", "eq", category) // Exclui a categoria já buscada
          .order("order", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false })
          .limit(remainingCount);

        if (rentError) throw rentError;

        // Filtra para evitar duplicatas (segurança extra)
        if (rentData) {
          const filteredRentData = rentData.filter(
            (item) => !existingIds.includes(item.id),
          );
          finalResults = [...finalResults, ...filteredRentData];
        }
      }

      return finalResults.length > 0 ? finalResults : null;
    } catch (error) {
      throw Error(`Error to fetch rent properties ${error}`);
    }
  }

  async selectCardSaleProperties(): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      // Buscar propriedades de venda com ordenação
      const { data: saleData, error: saleError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "sale")
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (saleError) throw saleError;

      return saleData;
    } catch (error) {
      throw Error(`Error to featch sale properties ${error}`);
    }
  }

  async selectCardRentProperties(): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      // Buscar propriedades de venda com ordenação
      const { data: rentData, error: rentError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, beds, bedrooms, guests, bathrooms, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "rent")
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (rentError) throw rentError;

      return rentData;
    } catch (error) {
      throw Error(`Error to featch rent properties featured ${error}`);
    }
  }

  async selectFeaturedSale(): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      // Buscar propriedades de venda com ordenação
      const { data: saleData, error: saleError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, emphasis1, emphasis2, emphasis3, emphasis4, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "sale")
        .eq("is_featured", true)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (saleError) throw saleError;

      return saleData;
    } catch (error) {
      throw Error(`Error to featch sale properties featured ${error}`);
    }
  }

  async selectFeaturedRent(): Promise<PropertyCardType[] | null> {
    console.log("acessei o banco");
    try {
      // Buscar propriedades de venda com ordenação
      const { data: rentData, error: rentError } = await supabase
        .from("properties")
        .select(
          "id, purpose, title, description, beds, bedrooms, guests, bathrooms, city, state, neighborhood, is_featured",
        )
        .eq("purpose", "rent")
        .eq("is_featured", true)
        .order("order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (rentError) throw rentError;

      return rentData;
    } catch (error) {
      throw Error(`Error to featch rent properties ${error}`);
    }
  }

  async detailProperty(slug: string): Promise<Property | null> {
    console.log("acessei o banco");
    try {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .single();
      return data ? data : null;
    } catch (error) {
      throw Error(`Cannot detail property: ${error}`);
    }
  }

  async insertProperty(data: Property): Promise<Property> {
    try {
      const response = await supabase
        .from("properties")
        .insert(data)
        .select()
        .single();
      return response.data;
    } catch (error) {
      throw Error(`Cannot insert property: ${error}`);
    }
  }

  async updateProperty(id: string, data: Property) {
    try {
      await supabase.from("properties").update(data).eq("id", id);
    } catch (error) {
      throw Error(`Cannot delete property: ${error}`);
    }
  }

  async deleteProperty(id: string) {
    try {
      await supabase.from("properties").delete().eq("id", id);
    } catch (error) {
      throw Error(`Cannot delete property: ${error}`);
    }
  }
}

import { supabase } from "../lib/supabase";
import type { Property, PropertyImages } from "../types/properties";

export default class Services {
  async getAllImages() {
    try {
      const { data } = await supabase
        .from("property_images")
        .select("*")
        .order("position", { ascending: true });
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async detailImagesFromPropertyId(propertyId: string) {
    try {
      const { data } = await supabase
        .from("property_images")
        .select("*")
        .eq("property_id", propertyId);
      // console.log("resposta1", data, "resposta2", response.data, "ID", propertyId)
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async addImages(files: File[], propertyId: string, initialLength: number) {
    try {
      const imagesToInsert: PropertyImages[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const extension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${initialLength + i}.${extension}`;

        const filePath = `${propertyId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property_images")
          .upload(filePath, file);

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
          cover_image: initialLength + i == 0 ? true : false,
        });
      }

      const { data } = await supabase
        .from("property_images")
        .insert(imagesToInsert)
        .select("*");

      return data ? data : null;
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

  async selectAllProperties(): Promise<Property[] | null> {
    try {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: true });

      return data ? data : null;
    } catch (error) {
      throw Error(`Cannot get properties: ${error}`);
    }
  }

  async detailProperty(id: string): Promise<Property | null> {
    try {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
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

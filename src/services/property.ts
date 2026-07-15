import { supabase } from "../lib/supabase";
import type { Property, PropertyImages } from "../types/properties";

export default class Services {
  async getAllImages() {
    try {
      const { data } = await supabase.from("property_images").select("*");
      return data ? data : null;
    } catch (error) {
      throw error;
    }
  }

  async addImages(files: File[], propertyId: string) {
    try {
      const imagesToInsert: PropertyImages[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const extension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${i}.${extension}`;

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
          position: i,
          cover_image: i == 0 ? true : false,
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

  async deleteImage(imageId: string) {
    try {
      // Busca a imagem que será excluída
      const { data: image } = await supabase
        .from("property_images")
        .select("*")
        .eq("id", imageId)
        .single();

      if (!image) return null;

      // Exclui a imagem
      await supabase.from("property_images").delete().eq("id", imageId);

      // Se ela era a capa, escolhe outra
      if (image.cover_image) {
        const { data: firstImage } = await supabase
          .from("property_images")
          .select("id")
          .eq("property_id", image.property_id)
          .order("created_at", { ascending: true }) // ou "order", se existir
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
        console.log("primeira imagem", firstImage);
      }

      return image;
    } catch (error) {
      throw error;
    }
  }

  async selectAllProperties(): Promise<Property[] | null> {
    try {
      const { data } = await supabase.from("properties").select("*");

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

import { supabase } from "../lib/supabase";
import type { Property, PropertyImages } from "../types/properties";

export default class Services {
  async getAllImages() {
    try {
      const { data } = await supabase.from("property_images").select("*");

      console.log("imagens", data);
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

        console.log("dados da imagem: ", {
          property_id: propertyId,
          image_url: publicUrl,
          position: i,
          cover_image: i == 0 ? true : false,
        });

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

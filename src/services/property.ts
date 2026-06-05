import { supabase } from "../lib/supabase";
import type { Property } from "../types/properties";

export default class Services {
  async selectAllProperties() : Promise<Property[] | null> {
    try {
      const { data } = await supabase.from("properties").select("*");
     
      return data ? data : null ;
    } catch (error) {
      throw Error(`Cannot get properties: ${error}`);
    }
  };

  async detailProperty(id: string) : Promise<Property | null> {
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
  };

  async insertProperty (data: Property) : Promise<Property> {
    try {
      await supabase.from("properties").insert(data).select();
      return data
    } catch (error) {
      throw Error(`Cannot insert property: ${error}`);
    }
  };

  async updateProperty (id: string, data: Property) {
    try {
      await supabase.from("properties").update(data).eq("id", id);
    } catch (error) {
      throw Error(`Cannot delete property: ${error}`);
    }
  };

  async deleteProperty(id: string) {
    try {
      await supabase.from("properties").delete().eq("id", id);
    } catch (error) {
      throw Error(`Cannot delete property: ${error}`);
    }
  };
}

import { useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";
import { toast } from "react-toastify";

export default function useUpdateProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function updateProperty(id: string, data: Property) {
    try {
      setLoading(true);
      await api.updateProperty(id, data);
      setError(false);
      toast.success("Edição realizada com sucesso!");
    } catch (error) {
      setError(true);
      toast.error("Falha na edição do anúncio!");

      throw Error(
        `Cannot update property using hook useUpdateProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { updateProperty, loading, error };
}

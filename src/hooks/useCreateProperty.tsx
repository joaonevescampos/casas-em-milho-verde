import { useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";
import { toast } from "react-toastify";

export default function useCreateProperty() {
  const [propertyId, setPropertyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function createProperty(data: Property) {
    try {
      setLoading(true);

      const response: Property = await api.insertProperty(data);
      toast.success("Cadastro realizado com sucesso!");

      setError(false);
      setPropertyId(response.id!);

      return response;
    } catch (error) {
      setError(true);
      toast.error("Falha no cadastro do anúncio!");
      throw new Error(
        `Cannot create property using hook useCreateProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { propertyId, createProperty, loading, error };
}

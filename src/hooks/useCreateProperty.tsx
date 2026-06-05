import { useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";

export default function useCreateProperty() {
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function createProperty(data : Property) {
    try {
      setLoading(true);
      const response: Property = await api.insertProperty(data);
      if (response) {
        setError(false);
        setProperty(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot create property using hook useCreateProperty: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { property, createProperty, loading, error };
}

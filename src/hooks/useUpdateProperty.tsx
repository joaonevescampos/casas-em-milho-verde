import { useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";

export default function useUpdateProperty() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function updateProperty(id: string, data: Property) {
    try {
      setLoading(true);
      await api.updateProperty(id, data);
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot update property using hook useUpdateProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { updateProperty, loading, error };
}

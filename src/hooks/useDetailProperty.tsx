import { useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";

export default function useDetailProperty() {
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function detailProperty(slug : string) {
    try {
      setLoading(true);
      const response: Property | null = await api.detailProperty(slug);
      if (response) {
        setError(false);
        setProperty(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot detail property using hook useDetailProperty - ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { property, detailProperty, loading, error };
}

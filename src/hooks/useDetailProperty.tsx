import { useEffect, useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";

export default function useDetailProperty(id : string) {
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function detailProperty() {
    try {
      setLoading(true);
      const response: Property | null = await api.detailProperty(id);
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

  useEffect(() => {
    detailProperty()
  }, [])

  return { property, detailProperty, loading, error };
}

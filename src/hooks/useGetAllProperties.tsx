import { useEffect, useState } from "react";
import Services from "../services/property";
import type { Property } from "../types/properties";

export default function useGetAllProperties() {
  const [properties, setProperties] = useState<Property[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getAllProperties() {
    try {
      setLoading(true);
      const response: Property[] | null = await api.selectAllProperties();
      if (response) {
        setError(false);
        setProperties(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot get all properties using hook useGetAllProperties: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProperties();
  }, []);

  return { properties, getAllProperties, loading, error };
}

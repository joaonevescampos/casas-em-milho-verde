import { useEffect, useState } from "react";
import Services from "../services/property";
import type { PropertyCardType } from "../types/properties";

export default function useGetPropertiesCardRent() {
  const [propertiesRent, setProperties] = useState<PropertyCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function useGetPropertiesCardRent() {
    try {
      setLoading(true);
      const response: PropertyCardType[] | null = await api.selectCardRentProperties();
      if (response) {
        setError(false);
        setProperties(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot get all properties using hook useGetPropertiesCardRent: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    useGetPropertiesCardRent();
  }, []);

  return { propertiesRent, useGetPropertiesCardRent, loading, error };
}

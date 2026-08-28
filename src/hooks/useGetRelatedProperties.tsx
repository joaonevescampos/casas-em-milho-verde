import { useState } from "react";
import Services from "../services/property";
import type { PropertyCardType } from "@/types/properties";

export default function useGetRelatedProperties() {
  const [properties, setProperties] = useState<PropertyCardType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getRelatedProperties(purpose: string, category: string) {
    try {
      setLoading(true);
      if (purpose === "rent") {
        const response: PropertyCardType[] | null =
          await api.selectRelatedPropertyRent(category);
        if (response) {
          setProperties(response);
          return response;
        }
      } else {
        const response: PropertyCardType[] | null =
          await api.selectRelatedPropertySale(category);
        if (response) {
          setProperties(response);
          return response;
        }
      }
      setError(false);
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all propertiess using hook useGetRelatedProperties: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { properties, getRelatedProperties, loading, error };
}

import { useState } from "react";
import Services from "../services/property";
import type { PropertyCardType } from "../types/properties";

export default function useFeatured() {
  const [properties, setProperties] = useState<PropertyCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function useFeaturedProperties(purpose: string) {
    try {
      setLoading(true);
      if (purpose === "rent") {
        const response: PropertyCardType[] | null = await api.selectFeaturedRent();
        if (response) {
          setProperties(response);
          return response;
        }
      } else {
        const response: PropertyCardType[] | null = await api.selectFeaturedSale();
        if (response) {
          setProperties(response);
          return response;
        }
      }
      setError(false);
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all properties using hook useFeaturedSale: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { properties, useFeaturedProperties, loading, error };
}

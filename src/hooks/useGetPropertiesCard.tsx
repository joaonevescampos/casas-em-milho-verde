import { useState } from "react";
import Services from "../services/property";
import type { PropertyCardType } from "../types/properties";

export default function useGetPropertiesCard() {
  const [properties, setProperties] = useState<PropertyCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getPropertiesCardFunc(purpose: string) {
    try {
      setLoading(true);
      if (purpose === "rent") {
        const response: PropertyCardType[] | null =
          await api.selectCardRentProperties();
        if (response) {
          setProperties(response);
          return response;
        }
      } else {
        const response: PropertyCardType[] | null =
          await api.selectCardSaleProperties();
        if (response) {
          setProperties(response);
          return response;
        }
      }
      setError(false);
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all properties using hook useGetPropertiesCardSale: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { properties, getPropertiesCardFunc, loading, error };
}

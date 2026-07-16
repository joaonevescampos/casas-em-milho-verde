import { useState } from "react";
import Services from "../services/property";
import type { PropertyImages } from "@/types/properties";

export default function useDetailPropertyImages() {
  const [images, setImages] = useState<PropertyImages[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function detailImagesProperty(propertyId: string) {
    try {
      setLoading(true);
      const response: PropertyImages[] | null =
        await api.detailImagesFromPropertyId(propertyId);
      if (response) {
        setError(false);
        setImages(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all images using hook useDetailImagesProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { images, detailImagesProperty, loading, error };
}

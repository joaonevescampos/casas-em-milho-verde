import { useState } from "react";
import Services from "../services/property";
import type { ShortImagesType } from "@/types/properties";

export default function useGetCoverImageFromPropertyID() {
  const [image, setImage] = useState<ShortImagesType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getCoverImagesFromPropertyID(propertyId: string) {
    try {
      setLoading(true);
      const response: ShortImagesType | null =
        await api.detailCoverImageFromPropertyID(propertyId);
      if (response) {
        setError(false);
        setImage(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all images using hook useGetCoverImageFromProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { image, getCoverImagesFromPropertyID, loading, error };
}

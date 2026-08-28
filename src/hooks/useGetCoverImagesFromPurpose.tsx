import { useState } from "react";
import Services from "../services/property";
import type { ShortImagesType } from "@/types/properties";

export default function useGetCoverImagesFromPurpose() {
  const [images, setImages] = useState<ShortImagesType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getCoverImagesFromPurpose(purpose: string) {
    try {
      setLoading(true);
      const response: ShortImagesType[] | null =
        await api.getCoverImagesFromPurpose(purpose);
      if (response) {
        setError(false);
        setImages(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot get all images using hook useGetCoverImagesFromPurpose: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { images, getCoverImagesFromPurpose, loading, error };
}

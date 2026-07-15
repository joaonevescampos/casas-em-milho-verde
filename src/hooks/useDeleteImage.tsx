import { useState } from "react";
import Services from "../services/property";
import type { PropertyImages } from "@/types/properties";

export default function useDeleteImages() {
  const [images, setImages] = useState<PropertyImages[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function deleteImage(imageId: string) {
    try {
      setLoading(true);
      const response: PropertyImages[] | null = await api.deleteImage(imageId);
      if (response) {
        setError(false);
        setImages(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot get all images using hook usedeleteImages: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { images, deleteImage, loading, error };
}

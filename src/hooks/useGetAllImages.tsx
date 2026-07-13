import { useEffect, useState } from "react";
import Services from "../services/property";
import type { PropertyImages } from "@/types/properties";

export default function useGetAllImages() {
  const [images, setImages] = useState<PropertyImages[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function getAllImages() {
    try {
      setLoading(true);
      const response: PropertyImages[] | null = await api.getAllImages();
      if (response) {
        setError(false);
        setImages(response);
        return response;
      }
    } catch (error) {
      setError(true);
      throw Error(`Cannot get all images using hook useGetAllImages: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllImages();
  }, []);

  return { images, getAllImages, loading, error };
}

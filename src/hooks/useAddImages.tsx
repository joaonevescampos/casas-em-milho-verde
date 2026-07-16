import { useState } from "react";
import Services from "../services/property";
import type { PropertyImages } from "@/types/properties";
import { toast } from "react-toastify";

export default function useAddImages() {
  const [images, setImages] = useState<PropertyImages[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function addImages(files: File[], propertyId: string, initialLength: number) {
    try {
      setLoading(true);
      const response: PropertyImages[] | null = await api.addImages(
        files,
        propertyId,
        initialLength
      );
      if (response) {
        setError(false);
        setImages(response);
        toast.success("Imagens enviadas com sucesso!");
        return response;
      }
    } catch (error) {
      setError(true);
      toast.error("Erro ao cadastrar imagens!");
      throw Error(`Cannot get all images using hook useAddImages: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { images, addImages, loading, error };
}

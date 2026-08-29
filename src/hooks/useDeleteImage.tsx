import { useState } from "react";
import Services from "../services/property";
import type { PropertyImages } from "@/types/properties";

export default function useDeleteImages() {
  const [images, setImages] = useState<PropertyImages[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function deleteImageFunc(imageId: string) {
  try {
    setLoading(true);
    setError(false);
    
    const response: PropertyImages[] | null = await api.deleteImage(imageId);

    if (response) {
      setImages(response);
      return response;
    } else {
      throw new Error("Resposta vazia ao deletar imagem");
    }
  } catch (error) {
    setError(true);
    console.error("Erro ao deletar imagem:", error);
    throw error; // Re-lança para o componente tratar
  } finally {
    setLoading(false);
  }
}

  return { images, deleteImageFunc, loading, error };
}

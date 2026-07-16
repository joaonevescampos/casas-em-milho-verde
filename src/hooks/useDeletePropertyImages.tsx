import { useState } from "react";
import Services from "../services/property";

export default function useDeletePropertyImages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function deleteImages(propertyId: string) {
    try {
      setLoading(true);
      await api.deletePropertyImages(propertyId);
    } catch (error) {
      setError(true);
      throw Error(`Cannot get all images using hook usedeleteImages: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { deleteImages, loading, error };
}

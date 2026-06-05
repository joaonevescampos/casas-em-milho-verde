import { useState } from "react";
import Services from "../services/property";

export default function useDeleteProperty() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const api = new Services();

  async function deleteProperty(id: string) {
    try {
      setLoading(true);
      await api.deleteProperty(id);
    } catch (error) {
      setError(true);
      throw Error(
        `Cannot delete property using hook useDeleteProperty: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return { deleteProperty, loading, error };
}

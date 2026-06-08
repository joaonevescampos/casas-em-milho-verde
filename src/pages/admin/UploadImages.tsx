import { useState } from "react";
import { supabase } from "../../lib/supabase";

type PropertyImage = {
  id?: string;
  property_id: string;
  image_url: string;
  cover_image: boolean;
  position: number;
  created_at?: string;
};

export default function UploadImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  // Exemplo:
  const propertyId = "87653318-1c22-412b-93e0-097671f7857b";

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 15) {
      alert("Máximo de 15 imagens"); 
      return;
    }

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews(previewUrls);
  };

  const uploadImages = async () => {
    try {
      setLoading(true);

      const imagesToInsert: PropertyImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const extension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${i}.${extension}`;

        const filePath = `${propertyId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property_images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("property_images").getPublicUrl(filePath);

        imagesToInsert.push({
          property_id: propertyId,
          image_url: publicUrl,
          position: i,
          cover_image: false,
        });
      }

      const { error } = await supabase
        .from("property_images")
        .insert(imagesToInsert);

      if (error) {
        throw error;
      }

      alert("Imagens enviadas com sucesso!");
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl text-black! font-bold mb-4">
          Upload de Imagens
        </h1>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleSelectImages}
          className="mb-4"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg border"
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}
        </div>

        <p className="mb-4">{files.length} imagem(ns) selecionada(s)</p>

        <button
          onClick={uploadImages}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py_2 rounded"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}

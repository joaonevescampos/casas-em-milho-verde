export async function convertToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Não foi possível obter o contexto do canvas.");
  }

  ctx.drawImage(bitmap, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Falha ao converter para WebP."));
        }
      },
      "image/webp",
      0.85,
    );
  });
}

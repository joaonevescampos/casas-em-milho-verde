import { IoClose } from "react-icons/io5";
import DefaultButton from "../Button";
import useDetailProperty from "@/hooks/useDetailProperty";
import { useEffect, useMemo } from "react";
import useDetailPropertyImages from "@/hooks/useDetailPropertyImages";
import { toast } from "react-toastify";
import useDeletePropertyImages from "@/hooks/useDeletePropertyImages";
import useDeleteProperty from "@/hooks/useDeleteProperty";
import Loading from "../Loading";

type ModalProps = {
  onClose?: () => void;
  propertyId: string;
};

const ModalDelete = ({ onClose, propertyId }: ModalProps) => {
  const { property } = useDetailProperty(propertyId);
  const { deleteImages, loading: loadingDeleteImages } =
    useDeletePropertyImages();
  const { deleteProperty, loading: loadingDeleteProperty } =
    useDeleteProperty();

  const { detailImagesProperty, images } = useDetailPropertyImages();

  useEffect(() => {
    detailImagesProperty(propertyId);
  }, [propertyId]);

  const coverImage = useMemo(() => {
    return (
      images?.find(
        (image) => image.property_id === propertyId && image.cover_image,
      )?.image_url ?? ""
    );
  }, [images, propertyId]);

  const handleDelete = async () => {
    try {
      await deleteImages(propertyId);
      toast.success("imagens deletadas com sucesso!");
      await deleteProperty(propertyId);
      toast.success("Propriedades do imóvel deletadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar imagens");
      throw error;
    }
  };

  if (loadingDeleteImages || loadingDeleteProperty) {
    return <Loading />;
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 bg-white w-[calc(100vw-32px)] max-w-150 rounded-sm p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose />
        </button>
        <h1 className="font-semibold text-center pt-4">
          Tem certeza que deseja excluir este anúncio?
        </h1>
        <h2 className="text-xs font-medium">Anúncio a ser excluído:</h2>
        <div className="flex items-center justify-between gap-2 border border-primary1/30 rounded-sm p-2 w-full">
          <div className="flex items-center gap-2 rounded-sm">
            <div className="w-36 h-24 max-lg:w-28">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="image"
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <img
                  src="https://stock.adobe.com/br/search?k=no+image+available"
                  alt="no-image"
                  className="w-full h-full object-cover rounded-sm"
                />
              )}
            </div>
            <div className="max-[400px]:max-w-28 max-[380px]:max-w-24">
              <span className="text-primary2 font-medium text-[10px]">
                {property?.city.toLocaleUpperCase()} -{" "}
                {property?.state.toLocaleUpperCase()}
              </span>
              <h2 className="text-sm max-lg:text-xs font-semibold">
                {property?.title}
              </h2>
              <span className="font-medium text-xs max-lg:text-[10px] text-primary5">
                {property?.guests} hospedes . {property?.bedrooms} quartos .{" "}
                {property?.bathrooms} banheiro . {property?.beds} cama
              </span>
              <p className="text-sm max-lg:text-xs truncate max-w-72 max-md:max-w-48">
                {property?.description}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-red-700 font-medium">
          Ao clicar em <strong>EXCLUIR</strong> não será mais possível recuperar
          este anúncio e ele será excluido permanentemente. Clique em cancelar
          para não excluir mais este anúncio.
        </p>
        <div className="flex gap-4 justify-between">
          <DefaultButton
            text="EXCLUIR"
            style="bg-red-700!"
            onClick={() => handleDelete()}
          />
          <DefaultButton text="CANCELAR" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

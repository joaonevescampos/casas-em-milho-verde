import { propertiesToRent } from "@/data/propertiesToRent";
import { propertiesToSend } from "@/data/propertiesToSend";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import DefaultButton from "../Button";

type ModalProps = {
  onClose?: () => void;
  propertyId: string;
};

type Property = {
  propertyId: string;
  city: string;
  state: string;
  neighborhood?: string;
  title: string;
  description: string;
  guests: number;
  beds: number;
  bedroom: number;
  bathroom: number;
  coverImage: string;
};

const ModalDelete = ({ onClose, propertyId }: ModalProps) => {
  const [propertySelected, setPropertySelected] = useState<Property>({
    propertyId: "",
    city: "",
    state: "",
    title: "",
    description: "",
    guests: 1,
    beds: 1,
    bedroom: 1,
    bathroom: 1,
    coverImage: "",
  });
  useEffect(() => {
    //fazer o get do imóvel
    const getProperty = propertiesToRent.some(
      (property) => property.id === propertyId,
    )
      ? propertiesToRent.find((property) => property.id === propertyId)
      : propertiesToSend.find((property) => property.id === propertyId);

    if (getProperty) {
      const formatProperty: Property = {
        propertyId: getProperty.id,
        city: getProperty.city,
        state: getProperty.state,
        title: getProperty.title,
        description: getProperty.description,
        guests: getProperty.guests,
        beds: getProperty.beds,
        bedroom: getProperty.bedroom,
        bathroom: getProperty.bathroom,
        coverImage:
          getProperty.images.find((item) => item.cover_image)?.image_url || "",
      };

      setPropertySelected(formatProperty);
    }
  }, []);
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 bg-white w-[calc(100vw-32px) max-w-150] rounded-sm p-4">
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
              {propertySelected.coverImage ? (
                <img
                  src={propertySelected.coverImage}
                  alt={propertySelected.title}
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
                {propertySelected.city.toLocaleUpperCase()} -{" "}
                {propertySelected.state.toLocaleUpperCase()}
              </span>
              <h2 className="text-sm max-lg:text-xs font-semibold">
                {propertySelected.title}
              </h2>
              <span className="font-medium text-xs max-lg:text-[10px] text-primary5">
                {propertySelected.guests} hospedes . {propertySelected.bedroom}{" "}
                quartos . {propertySelected.bathroom} banheiro .{" "}
                {propertySelected.beds} cama
              </span>
              <p className="text-sm max-lg:text-xs truncate max-w-72 max-md:max-w-48">
                {propertySelected.description}
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
          <DefaultButton text="EXCLUIR" style="bg-red-700!" />
          <DefaultButton text="CANCELAR" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

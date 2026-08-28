import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import fallback from "../../assets/no-image.png";
import useGetCoverImageFromPropertyID from "@/hooks/useGetCoverImageFromPropertyID";
import { useEffect } from "react";

type PropertiesCard = {
  propertyId?: string;
  purpose: string;
  city: string;
  state: string;
  title: string;
  description: string;
  guests?: number | null;
  beds?: number | null;
  bedroom?: number | null;
  bathroom?: number | null;
  coverImage?: string | null;
  emphasis1?: string | null;
  emphasis2?: string | null;
  emphasis3?: string | null;
  emphasis4?: string | null;
  is_featured?: boolean;
  onEdit: (propertyId: string | undefined) => void;
  onDelete: (propertyId: string | undefined) => void;
};

const AdminCard = ({
  propertyId,
  purpose,
  city,
  state,
  title,
  description,
  guests,
  beds,
  bedroom,
  bathroom,
  emphasis1,
  emphasis2,
  emphasis3,
  emphasis4,
  is_featured,
  onEdit,
  onDelete,
}: PropertiesCard) => {
// CRIAR O HOOK!!!
  const {image, getCoverImagesFromPropertyID} = useGetCoverImageFromPropertyID()

  useEffect(() => {
    getCoverImagesFromPropertyID(propertyId!)
  }, [propertyId])

  return (
    <div
      className={`flex items-center justify-between gap-2 border border-primary1/30 rounded-sm p-2 w-full ${is_featured && "bg-secondary5/10"}`}
    >
      {is_featured && (
        <div className="absolute top-0 left-0 bg-secondary5 rounded text-white font-bold text-[10px] px-4 py-1">
          EM DESTAQUE
        </div>
      )}
      <div className="flex items-center gap-2 rounded-sm">
        <div className="w-36 min-w-36 h-24 max-lg:w-28 max-lg:min-w-28">
          {image ? (
            <img
              src={image.image_url}
              alt={title}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <img
              src={fallback}
              alt="no-image"
              className="w-full h-full object-cover rounded-sm"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 max-[400px]:max-w-28 max-[380px]:max-w-24">
          <span className="text-primary2 font-medium text-[10px]">
            {city.toLocaleUpperCase()} - {state.toLocaleUpperCase()}
          </span>
          <h2 className="text-sm max-lg:text-xs font-semibold">{title}</h2>
          <span className="font-medium text-xs max-lg:text-[10px] text-primary5 trucante line-clamp-1">
            {purpose === "rent"
              ? `${guests} hospedes . ${bedroom} quartos . ${bathroom} banheiro . ${beds}`
              : `${emphasis1} . ${emphasis2} . ${emphasis3} . ${emphasis4}`}{" "}
            cama
          </span>
          <p className="text-sm max-lg:text-xs truncate max-w-100 max-lg:max-w-36">
            {description}
          </p>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:gap-2 gap-4">
        <button
          className="flex items-center justify-center border border-primary5/30 rounded-xl cursor-pointer w-20 h-20 max-lg:w-12 max-lg:h-12"
          onClick={() => onEdit(propertyId)}
        >
          <BiSolidPencil className="text-primary5" />
        </button>
        <button
          className="flex items-center justify-center border border-red-700/50 rounded-xl cursor-pointer w-20 h-20 max-lg:w-12 max-lg:h-12 bg-red-300/20"
          onClick={() => onDelete(propertyId)}
        >
          <FaRegTrashAlt className="text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default AdminCard;

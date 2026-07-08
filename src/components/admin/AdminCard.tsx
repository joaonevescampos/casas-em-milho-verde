import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

type PropertiesCard = {
  city: string;
  state: string;
  title: string;
  description: string;
  guests: number;
  beds: number;
  bedroom: number;
  bathroom: number;
  coverImage: string;
};

const AdminCard = ({
  city,
  state,
  title,
  description,
  guests,
  beds,
  bedroom,
  bathroom,
  coverImage,
}: PropertiesCard) => {
  return (
    <div className="flex items-center justify-between gap-2 border border-primary1/30 rounded-sm p-2 w-full">
      <div className="flex items-center gap-2 rounded-sm">
        <div className="w-36 h-24 max-lg:w-28">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
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
            {city.toLocaleUpperCase()} - {state.toLocaleUpperCase()}
          </span>
          <h2 className="text-sm max-lg:text-xs font-semibold">{title}</h2>
          <span className="font-medium text-xs max-lg:text-[10px] text-primary5">
            {guests} hospedes . {bedroom} quartos . {bathroom} banheiro . {beds}{" "}
            cama
          </span>
          <p className="text-sm max-lg:text-xs truncate max-w-100 max-lg:max-w-36">
            {description}
          </p>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:gap-2 gap-4">
        <button className="flex items-center justify-center border border-primary5/30 rounded-xl cursor-pointer w-20 h-20 max-lg:w-12 max-lg:h-12">
          <BiSolidPencil className="text-primary5" />
        </button>
        <button className="flex items-center justify-center border border-red-700/50 rounded-xl cursor-pointer w-20 h-20 max-lg:w-12 max-lg:h-12">
          <FaRegTrashAlt className="text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default AdminCard;

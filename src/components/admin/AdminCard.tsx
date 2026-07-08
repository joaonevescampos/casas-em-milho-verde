import React from "react";

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
    <div className="flex gap-2 border border-primary1/30 rounded-sm p-2 w-full">
      <div className="w-36 h-24">
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
          />
        )}
      </div>
      <div>
        <span className="text-primary2 font-medium text-[10px]">
          {city.toLocaleUpperCase()} - {state.toLocaleUpperCase()}
        </span>
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="font-medium text-xs text-primary5">
          {guests} hospedes . {bedroom} quartos . {bathroom} banheiro . {beds}{" "}
          cama
        </span>
        <p className="text-sm truncate max-w-100 max-lg:max-w-36">{description}</p>
      </div>
    </div>
  );
};

export default AdminCard;

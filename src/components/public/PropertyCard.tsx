import useDetailPropertyImages from "@/hooks/useDetailPropertyImages";
import type { Property } from "@/types/properties";
import { useEffect } from "react";
import fallback from "../../assets/no-image.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {
  property: Property;
};
const PropertyCard = ({ property }: Props) => {
  const { detailImagesProperty, images } = useDetailPropertyImages();

  useEffect(() => {
    if (property.id) {
      detailImagesProperty(property.id);
    }
  }, [property.id, images]);

  const coverImage =
    images?.find((image) => image.cover_image)?.image_url ?? null;

  return (
    <div className="w-full rounded-xl shadow bg-white">
      <picture className="relative">
        {property.is_featured && (
          <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl bg-linear-120 from-primary2 to-secondary1 text-white px-3 py-1.5 text-[8px] font-bold">
            EM DESTAQUE
          </span>
        )}
        <img
          src={coverImage ? coverImage : fallback}
          alt={property.title}
          className="w-full h-50 max-lg:h-70 object-cover rounded-t-xl"
        />
      </picture>

      <div className="flex flex-col gap-2 p-4">
        <span className="text-primary2 text-[10px] font-medium">
          {property.city.toUpperCase()} - {property.state.toUpperCase()}
        </span>
        <h2 className="text-xl font-cormorant font-semibold truncate">
          {property.title}
        </h2>
        <span className="text-xs opacity-50 font-medium">
          {property.guests} hóspedes . {property.bedrooms} quartos .{" "}
          {property.bathrooms} banheiros . {property.beds} camas{" "}
        </span>
        <p className="line-clamp-2 text-sm opacity-70 leading-6.5">
          {property.description}
        </p>
      </div>
      <hr />
      <Link to={property.purpose==="rent" ? `/alugueis-temporada/${property.slug}` : `/venda/${property.slug}`} className="flex gap-2 items-center text-xs text-primary2 w-full p-4 cursor-pointer hover:text-secondary5">
        <span className="font-semibold">VER DETALHES</span>
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

export default PropertyCard;

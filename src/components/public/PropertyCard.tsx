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
          <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl bg-secondary5 text-white px-3 py-1.5 text-[8px] font-bold">
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-primary2 text-[10px] font-medium">
              {property?.city.toUpperCase()} - {property?.state.toUpperCase()}
            </span>
            {property?.purpose === "sale" && (
              <span className="text-primary2 text-[10px] font-medium">
                {property?.neighborhood!.toUpperCase()}
              </span>
            )}
          </div>
          {property?.purpose === "sale" && (
            <span className="text-xs text-black/60 font-medium py-1 px-2 bg-primary2/20 rounded-2xl">
              {property?.code}
            </span>
          )}
        </div>
        <h2 className="text-xl font-cormorant font-semibold truncate">
          {property.title}
        </h2>
        {property.purpose === "sale" && (
          <div className="flex flex-col gap-2">
            {property.id === "0e82d29b-a723-4e59-a2e3-50f803d3f6fd" ? (
              <div className="flex flex-col">
                <h3 className="text-xl font-cormorant font-semibold truncate text-primary1">
                  R$ 420.000 <span className="text-sm">sem mobília</span>
                </h3>
                <h3 className="text-xl font-cormorant font-semibold truncate text-primary1">
                  R$ {property.price?.toLocaleString("pt-BR") || "0"} <span className="text-sm">com mobília</span>
                </h3>
              </div>
            ) : (
              <h3 className="text-xl font-cormorant font-semibold truncate text-primary1">
                R$ {property.price?.toLocaleString("pt-BR") || "0"}
              </h3>
            )}
          </div>
        )}
        <span className="text-xs opacity-50 font-medium trucante line-clamp-1">
          {property.purpose === "rent"
            ? `${property.guests} hóspedes . ${property.bedrooms} quartos .
          ${property.bathrooms} banheiros . ${property.beds} camas`
            : `${property.emphasis1} . ${property.emphasis2} . ${property.emphasis3} . ${property.emphasis4}`}
        </span>
        <p className={`${property.id === "0e82d29b-a723-4e59-a2e3-50f803d3f6fd" ? "line-clamp-1" : "line-clamp-2"} text-sm opacity-70 leading-6.5`}>
          {property.description}
        </p>
      </div>
      <hr />
      <Link
        to={
          property.purpose === "rent"
            ? `/alugueis-temporada/${property.slug}`
            : `/venda/${property.slug}`
        }
        className="flex gap-2 items-center text-xs text-primary2 w-full p-4 cursor-pointer hover:text-secondary5"
      >
        <span className="font-semibold text-[10px]">VER DETALHES</span>
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

export default PropertyCard;

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import useDetailPropertyImages from "@/hooks/useDetailPropertyImages";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import { FaBath, FaBed, FaUser } from "react-icons/fa";
import user from "../../assets/user.png";
import DefaultButton from "@/components/Button";
import CityMap from "@/components/public/Map";
import RelatedProperties from "@/components/public/RelatedProperties";

const PropertyDetail = () => {
  const param = useParams();
  const { detailImagesProperty, images } = useDetailPropertyImages();
  const { properties } = useGetAllProperties();
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const location =useLocation()

  const [selected, setSelected] = useState(0);

  const property = properties?.find((property) => property.slug === param.slug);

  useEffect(() => {
    if (!property?.id) return;

    detailImagesProperty(property.id);
  }, [property?.id]);

  function scrollTo(index: number) {
    mainApi?.scrollTo(index);
    thumbApi?.scrollTo(index);
    setSelected(index);
  }

  function onSelect(api: CarouselApi) {
    if (api) {
      const index = api.selectedScrollSnap();

      setSelected(index);
      thumbApi?.scrollTo(index);
    }
  }

  return (
    <>
      <main className="mt-20! bg-linear-120! to-primary1/50! from-primary4! pb-4!">
        <div className="flex max-lg:flex-col gap-4 justify-center py-8 max-w-300 m-auto ">
          <div className="flex-2 w-full rounded-2xl bg-white p-4 shadow-lg">
            {/* IMAGEM PRINCIPAL */}

            <Carousel
              setApi={(api) => {
                setMainApi(api);

                if (api) {
                  api.on("select", () => onSelect(api));
                }
              }}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {images?.map((image, index) => (
                  <CarouselItem
                    key={image.id ?? image.image_url ?? index}
                    className="basis-full pl-0"
                  >
                    <img
                      src={image.image_url}
                      alt={`Foto ${index + 1} do imóvel`}
                      className="block h-105 w-full rounded-xl object-cover max-lg:h-80"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                      decoding="async"
                      width="800"
                      height="420"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* THUMBNAILS */}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => thumbApi?.scrollPrev()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border hover:bg-gray-100"
                aria-label="Miniatura anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <Carousel
                opts={{
                  dragFree: true,
                  containScroll: "trimSnaps",
                  slidesToScroll: 1,
                }}
                setApi={setThumbApi}
                className="min-w-0 flex-1"
              >
                <CarouselContent className="-ml-2">
                  {images?.map((image, index) => (
                    <CarouselItem
                      key={image.id ?? image.image_url ?? index}
                      className="basis-1/4 sm:basis-1/5 md:basis-1/6 pl-2 xl:basis-1/7 "
                    >
                      <button
                        type="button"
                        onClick={() => scrollTo(index)}
                        className={`overflow-hidden rounded-lg border-2 transition-all ${
                          selected === index
                            ? "border-orange-500"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={`Miniatura ${index + 1}`}
                          className="h-16 w-24 object-cover"
                          loading="lazy"
                          decoding="async"
                          width="96"
                          height="64"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <button
                type="button"
                onClick={() => thumbApi?.scrollNext()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border hover:bg-gray-100"
                aria-label="Próxima miniatura"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 rounded-2xl bg-white p-4">
            <span className="font-montserrat text-xs text-secondary5">
              {property?.city} - {property?.state}
            </span>
            <h2 className="font-cormorant font-semibold text-2xl max-lg:text-xl">
              {property?.title}
            </h2>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex flex-col gap-4 items-center justify-center border-2 border-gray-100 rounded-tl-lg p-4">
                <FaUser className="text-gray-300 text-3xl" />
                <span className="font-medium text-gray-500">
                  {property?.guests} hóspedes
                </span>
              </div>

              <div className="flex flex-col gap-4 items-center justify-center border-2 border-gray-100 rounded-tr-lg p-4">
                <FaBed className="text-gray-300 text-3xl" />
                <span className="font-medium text-gray-500">
                  {property?.guests} quartos
                </span>
              </div>

              <div className="flex flex-col gap-4 items-center justify-center border-2 border-gray-100 rounded-bl-lg p-4">
                <FaBath className="text-gray-300 text-3xl" />
                <span className="font-medium text-gray-500">
                  {property?.guests} banheiros
                </span>
              </div>

              <div className="flex flex-col gap-4 items-center justify-center border-2 border-gray-100 rounded-br-lg p-4">
                <FaBed className="text-gray-300 text-3xl" />
                <span className="font-medium text-gray-500">
                  {property?.guests} camas
                </span>
              </div>
            </div>
            <div className="flex gap-4 border border-gray-200 rounded-2xl p-4">
              <div>
                <img src={user} alt="user" className="rounded-full w-28" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Corretor & Anfitrião
                </span>
                <h2 className="font-semibold">Matias Hansen</h2>
                <span className="text-xs text-gray-500">
                  Casas Em Milho Verde
                </span>
                <span className="font-semibold text-xs text-gray-500">
                  CRECI-MG - 66066
                </span>
                <p className="text-xs text-gray-500">
                  Especialista em alugueis de temporada e corretor de imóveis.
                </p>
                <Link
                  to="https://www.airbnb.com.br/users/profile/1463193187508284145?previous_page_name=PdpHomeMarketplace"
                  target="_blank"
                  className="underline font-bold text-xs"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
            {property?.purpose === "rent" ? (
              <Link to={property?.airbnb_link!} target="_blank">
                <DefaultButton text="RESERVAR NO AIRBNB" style="w-full!" />
              </Link>
            ) : (
              <Link to={`https://wa.me/553899504678?text=Olá%2C%20me%20interessei%20por%20este%20anúncio%3A%0A%0A*${property?.title}*%0A"casasemmilhoverde.com${location?.pathname}"%0A%0AGostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20e%20disponibilidade%20para%20fazer%20uma%20visita.`} target="_blank">
                <DefaultButton text="CONVERSAR NO WHAT'S APP" style="w-full!" />
              </Link>
            )}
          </div>
        </div>
        <div className="flex max-lg:flex-col gap-4 w-full rounded-2xl bg-white p-4 shadow-lg max-w-300 m-auto mb-8 min-h-80">
          <div className="flex-2 flex flex-col gap-4 ">
            <h2 className="font-cormorant font-semibold text-2xl max-lg:text-xl">
              Sobre o espaço
            </h2>
            <p className="whitespace-pre-wrap wrap-break-words text-sm text-gray-600">
              {property?.description}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="font-cormorant font-semibold text-2xl max-lg:text-xl">
              Ønde você estará no mapa
            </h2>
            <span className="font-montserrat text-xs text-secondary3">
              {property?.city} - {property?.state}
            </span>
            <CityMap cityName={property?.city!} zoom={9} />
          </div>
        </div>
      </main>
      <aside className="px-4 pb-4">
        <RelatedProperties
          purpose={property?.purpose!}
          category={property?.category!}
          propertyId={property?.id!}
        />
      </aside>
    </>
  );
};

export default PropertyDetail;

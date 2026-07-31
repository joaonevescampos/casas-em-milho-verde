import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useDetailPropertyImages from "@/hooks/useDetailPropertyImages";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import { FaBath, FaBed, FaUser } from "react-icons/fa";
import user from "../../assets/user.png";
import DefaultButton from "@/components/Button";
import CityMap from "@/components/public/Map";

const PropertyDetail = () => {
  const param = useParams();
  const { detailImagesProperty, images } = useDetailPropertyImages();
  const { properties } = useGetAllProperties();
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

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
    <main className="mt-20! ">
      <div className="flex max-lg:flex-col gap-4 justify-center py-8 max-w-300 m-auto">
        <div className="flex-2 w-full rounded-2xl bg-white p-4 shadow-lg">
          {/* IMAGEM PRINCIPAL */}

          <Carousel
            setApi={(api) => {
              setMainApi(api);

              api?.on("select", () => onSelect(api));
            }}
            className="w-full"
          >
            <CarouselContent>
              {images?.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image.image_url}
                    alt=""
                    className="h-105 max-lg:h-80 w-full rounded-xl object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* THUMBNAILS */}

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => thumbApi?.scrollPrev()}
              className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>

            <Carousel
              opts={{
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              setApi={setThumbApi}
              className="flex-1 w-[calc(100%-100px)]"
            >
              <CarouselContent className="-ml-2">
                {images?.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/5 pl-2 md:basis-1/6"
                  >
                    <button
                      onClick={() => scrollTo(index)}
                      className={`overflow-hidden rounded-lg border-2 transition-all
                  ${
                    selected === index
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                    >
                      <img
                        src={image.image_url}
                        alt="image"
                        className="h-16 w-24 object-cover"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <button
              onClick={() => thumbApi?.scrollNext()}
              className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-100"
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
                CRECI - 123456
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
          <DefaultButton
            text="RESERVAR NO AIRBNB"
            path={property?.airbnb_link}
            style="w-full!"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full rounded-2xl bg-white p-4 shadow-lg max-w-300 m-auto mb-8">
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
          <CityMap
            cityName={property?.city!}
            zoom={9}
          />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;

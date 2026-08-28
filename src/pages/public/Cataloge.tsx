import HeroCataloge from "@/components/public/HeroCataloge";
import PropertyCard from "@/components/public/PropertyCard";
import Reveal from "@/components/Reveal";
import useGetPropertiesCard from "@/hooks/useGetPropertiesCard";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Cataloge = () => {
  const { properties, getPropertiesCardFunc } = useGetPropertiesCard();

  const location = useLocation();

  const purpose: "sale" | "rent" =
    location.pathname === "/venda" ? "sale" : "rent";

  useEffect(() => {
    getPropertiesCardFunc(purpose);
  }, []);

  // const saleProperties = properties
  //   .filter((property) => property.purpose === "sale")
  //   .sort((a, b) => {
  //     if (a.is_featured && !b.is_featured) return -1;
  //     if (!a.is_featured && b.is_featured) return 1;
  //     return 0;
  //   });

  // const rentProperties = properties
  //   .filter((property) => property.purpose === "rent")
  //   .sort((a, b) => {
  //     if (a.is_featured && !b.is_featured) return -1;
  //     if (!a.is_featured && b.is_featured) return 1;
  //     return 0;
  //   });

  return (
    <>
      <HeroCataloge purpose={purpose} />
      <Reveal delay={0.2}>
        <section className="relative min-h-139 max-w-300 m-auto pt-12 max-lg:pt-8 mt-[calc(100vh)]">
          <div className="flex flex-col max-lg:mx-4">
            <span className="text-secondary5 text-[10px]">
              {purpose === "rent"
                ? "HOSPEDAGENS EM DESTAQUE"
                : "IMÓVEIS EM DESTAQUE"}
            </span>
            <h2 className="text-2xl font-cormorant font-semibold">
              {purpose === "rent"
                ? "Casas para relaxar em Milho Verde."
                : "Imóveis à venda"}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4 my-4 max-lg:mx-4 max-lg:grid-cols-2 max-sm:grid-cols-1 min-h-100">
            {properties?.map((property, i) => (
              <div key={i}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  );
};

export default Cataloge;

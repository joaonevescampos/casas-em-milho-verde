import HeroCataloge from "@/components/public/HeroCataloge";
import PropertyCard from "@/components/public/PropertyCard";
import Reveal from "@/components/Reveal";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import type { Property } from "@/types/properties";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const Cataloge = () => {
  const { properties } = useGetAllProperties();
  const [purpose, setPurpose] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/venda") {
      setPurpose("sale");
    } else {
      setPurpose("rent");
    }
    console.log("teste");
  }, [location]);

  const getFeaturedProperties = (purpose: "sale" | "rent"): Property[] => {
    if (!properties?.length) return [];

    const filtered = properties.filter(
      (property) => property.purpose === purpose,
    );

    return filtered;
  };

  const saleProperties = useMemo(
    () => getFeaturedProperties("sale"),
    [properties],
  );

  const rentProperties = useMemo(
    () => getFeaturedProperties("rent"),
    [properties],
  );

  useEffect(() => {
    console.log(getFeaturedProperties("rent"));
  }, [getFeaturedProperties]);

  return (
    <>
      <HeroCataloge purpose={purpose} />
      <Reveal delay={0.5}>
        <section className="relative min-h-139 max-w-300 m-auto pt-12 max-lg:pt-8 mt-[calc(100vh)]">
          <div className="flex flex-col">
            <span className="text-secondary5 text-[10px]">
              {purpose === "rent"
                ? "HOSPEDAGENS EM DESTAQUE"
                : "IMÓVEIS EM DESTAQUE"}
            </span>
            <h2 className="text-2xl font-cormorant font-semibold">
              {purpose === "rent"
                ? "Casas para relaxar em Milho Verde."
                : "Casas à venda"}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4 my-4 max-lg:mx-4 max-lg:grid-cols-2 max-sm:grid-cols-1 min-h-100">
            {purpose === "rent"
              ? rentProperties.map((rentProperty, i) => (
                  <div key={i}>
                    <PropertyCard property={rentProperty} />
                  </div>
                ))
              : saleProperties.map((saleProperty, i) => (
                  <div key={i}>
                    <PropertyCard property={saleProperty} />
                  </div>
                ))}
          </div>
        </section>
      </Reveal>
    </>
  );
};

export default Cataloge;

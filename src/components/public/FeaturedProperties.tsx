import useGetAllProperties from "@/hooks/useGetAllProperties";
import type { Property } from "@/types/properties";
import { useEffect, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import Reveal from "../Reveal";

type Props = {
  purpose: string;
};

const FeaturedProperties = ({ purpose }: Props) => {
  const { properties } = useGetAllProperties();

  const getFeaturedProperties = (purpose: "sale" | "rent"): Property[] => {
    if (!properties?.length) return [];

    // Filtra pelo propósito primeiro
    const filtered = properties.filter(
      (property) => property.purpose === purpose,
    );

    const featured = filtered.filter((property) => property.is_featured);

    const notFeatured = filtered
      .filter((property) => !property.is_featured)
      .sort(() => Math.random() - 0.5);

    return [...featured, ...notFeatured].slice(0, 4);
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
    <Reveal delay={.5}>

    <section className="max-w-300 m-auto pt-12">
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
      <div className="grid grid-cols-4 gap-4 my-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {purpose === "rent"
          ? rentProperties.map((rentProperty, i) => (
              <div key={i}>
                <PropertyCard property={rentProperty} />
              </div>
            ))
          : rentProperties.map((saleProperty, i) => (
              <div key={i}>
                <PropertyCard property={saleProperty} />
              </div>
            ))}
      </div>
    </section>
    </Reveal>
  );
};

export default FeaturedProperties;

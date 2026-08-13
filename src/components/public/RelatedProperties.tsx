import useGetAllProperties from "@/hooks/useGetAllProperties";
import type { Property } from "@/types/properties";
import { useMemo } from "react";
import PropertyCard from "./PropertyCard";
import Reveal from "../Reveal";
import DefaultButton from "../Button";

type Props = {
  purpose: string;
  category: string;
  propertyId: string;
};

const RelatedProperties = ({ purpose, category, propertyId }: Props) => {
  const { properties } = useGetAllProperties();

  const getRelatedProperties = (purpose: "sale" | "rent"): Property[] => {
    if (!properties?.length) return [];

    // Filtra pelo propósito primeiro
    const filtered = properties.filter(
      (property) => property.purpose === purpose,
    );

    const related = filtered.filter(
      (property) => property.category === category && property.id != propertyId,
    );

    const notrelated = filtered
      .filter((property) => property.category != category)
      .sort(() => Math.random() - 0.5);

    return [...related, ...notrelated].slice(0, 4);
  };

  const saleProperties = useMemo(
    () => getRelatedProperties("sale"),
    [properties],
  );

  const rentProperties = useMemo(
    () => getRelatedProperties("rent"),
    [properties],
  );


  return (
    <Reveal delay={0.5}>
      <section className="relative min-h-139 max-w-300 m-auto pt-12 max-lg:pt-8">
        <div className="flex flex-col">
          <span className="text-secondary5 text-[10px]">
            {purpose === "rent"
              ? "HOSPEDAGENS RELACIONADAS"
              : "IMÓVEIS RELACIONADOS"}
          </span>
          <h2 className="text-2xl font-cormorant font-semibold">
            {purpose === "rent"
              ? "Casas para relaxar em Milho Verde."
              : "Imóveis à venda"}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 my-4 max-lg:grid-cols-2 max-sm:grid-cols-1 min-h-100">
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
        <div className="flex items-center justify-center max-lg:pt-4">
          <DefaultButton
            text="VER MAIS"
            style="absolute top-8 right-0 max-lg:static! max-lg:self-center! border border-secondary5/50! text-secondary5! bg-transparent! hover:bg-secondary5! hover:text-white!"
            path={purpose === "rent" ? "/alugueis-temporada" : "/venda"}
          />
        </div>
      </section>
    </Reveal>
  );
};

export default RelatedProperties;

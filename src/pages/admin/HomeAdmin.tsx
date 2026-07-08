import AdminCard from "@/components/admin/AdminCard";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import DefaultButton from "@/components/Button";
import { propertiesToRent } from "@/data/propertiesToRent";
import { propertiesToSend } from "@/data/propertiesToSend";
import { useEffect, useState } from "react";

const HomeAdmin = () => {
  const [purpose, setPurpose] = useState<string>("rent");

  const changePurpose = (value: string) => {
    value === "rent" ? setPurpose("rent") : setPurpose("send");
  };



  return (
    <>
      <AdminHeader isLogged={true} />
      <main className="flex flex-col gap-4 items-center justify-center bg-linear-to-b from-opacity1 to-opacity2 py-8! px-4">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-secondary5 font-medium text-[10px]">
            GERENCIAMENTO DE IMÓVEIS
          </span>
          <h1 className="font-cormorant font-semibold text-2xl">
            {purpose === "rent" ? "Aluguéis de temporada" : "Venda de imóveis"}
          </h1>
          <h2 className="text-xs opacity-80">
            Escolha qual imóvel deseja editar
          </h2>
        </div>

        <section className="flex flex-col items-center justify-center w-full">
          <div className="flex gap-4 items-center justify-center text-[10px]">
            <button
              className={`flex items-center justify-center w-40 py-4 cursor-pointer rounded-t-sm  font-medium bg-white  ${purpose === "send" ? "opacity-100" : "opacity-40"}`}
              onClick={() => changePurpose("send")}
            >
              VENDA DE IMÓVEIS
            </button>
            <button
              className={`flex items-center justify-center w-40 py-4 cursor-pointer rounded-t-sm  font-medium bg-white ${purpose === "rent" ? "opacity-100 " : "opacity-40"}`}
              onClick={() => changePurpose("rent")}
            >
              ALUGUÉIS DE TEMPORADA
            </button>
          </div>
          <div className="flex flex-col items-center justify-center bg-white w-full max-w-300 px-8 max-lg:px-4 py-4 rounded-sm">
            <div className="w-full">
              <div className="flex justify-between items-center pb-4">
                <span className="text-xs font-medium">21 anúncios</span>
                <DefaultButton text="+ ADICIONAR" />
              </div>
              <ul className="flex flex-col gap-2 w-full max-h-100 overflow-y-scroll">
                {purpose === "rent"
                  ? propertiesToRent.map((property, index) => (
                      <li className="w-full">
                        <AdminCard
                          city={property.city}
                          state={property.state}
                          title={property.title}
                          description={property.description}
                          guests={property.guests}
                          beds={property.beds}
                          bedroom={property.bedroom}
                          bathroom={property.bathroom}
                          coverImage={
                            property.images.find((item) => item.cover_image)
                              ?.image_url!
                          }
                        />
                      </li>
                    ))
                  : propertiesToSend.map((property, index) => (
                      <li className="w-full">
                        <AdminCard
                          city={property.city}
                          state={property.state}
                          title={property.title}
                          description={property.description}
                          guests={property.guests}
                          beds={property.beds}
                          bedroom={property.bedroom}
                          bathroom={property.bathroom}
                          coverImage={
                            property.images.find((item) => item.cover_image)
                              ?.image_url!
                          }
                        />
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <AdminFooter />
    </>
  );
};

export default HomeAdmin;

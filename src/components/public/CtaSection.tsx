import coverRent from "../../assets/home-cover.png";
import coverSale from "../../assets/home-cover.png";
import { motion } from "motion/react";
import Reveal from "../Reveal";
import FadeUp from "../FadeUp";
import DefaultButton from "../Button";

type Props = {
  purpose: string;
};

 const CtaSection = ({ purpose }: Props) => {
  return (
    <section className="-mx-20 max-md:-mx-4 my-8 overflow-hidden">
      <div className="relative h-80">
        {/* Apenas zoom ao carregar */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <img
            src={purpose === "rent" ? coverRent : coverSale}
            alt="home-cover"
            className="h-full w-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-secondary1/85" />
        </motion.div>

        {/* Conteúdo */}
        <div className="absolute inset-x-0 bottom-20 px-20 max-md:px-4 text-white">
          <Reveal className="flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start">
            <div className="flex flex-col gap-4">
              <FadeUp delay={.5}>
                <h1 className="font-cormorant text-5xl font-semibold max-lg:text-3xl">
                  {purpose === "rent" ? "Desacelere, respire e viva o essencial." : "Viva no seu próprio imóvel."}
                  
                </h1>
              </FadeUp>

              <FadeUp delay={1}>
                <h2 className="max-w-xl text-xs leading-relaxed">
                   {purpose === "rent" ? "Sua próxima reserva te espera..." : "Adquira seu próprio imóvel."}
                  
                </h2>
              </FadeUp>
            </div>

            <FadeUp delay={1.5}>
              {purpose === "rent" ? (
                <DefaultButton
                  text="FAZER RESERVA NO AIRBNB"
                  style="bg-linear-120! to-primary2/50! from-primary2! w-50!"
                  path=""
                />
              ) : (
                <DefaultButton
                  text="CONVERSAR NO WHAT'S APP"
                  style="bg-linear-120! to-primary2/50! from-primary2! w-50!"
                  path="/venda"
                />
              )}
            </FadeUp>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
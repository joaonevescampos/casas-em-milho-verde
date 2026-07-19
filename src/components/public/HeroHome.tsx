import homeCover from "../../assets/home-cover.png";
import DefaultButton from "../Button";
import Reveal from "../Reveal";
import FadeUp from "../FadeUp";
import { motion, useScroll, useTransform } from "motion/react";

const HeroHome = () => {
  const { scrollY } = useScroll();

  // A imagem desce mais devagar que o scroll
  const y = useTransform(scrollY, [0, 800], [0, 250]);

  // Opcional: zoom suave
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);
  return (
    <section className="absolute left-0 top-0 z-20 w-full h-screen">
      <picture className="relative block h-screen overflow-hidden">
        {/* Zoom Out ao carregar */}
        <motion.div
          initial={{ scale: 1.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <img
              src={homeCover}
              alt="home-cover"
              className="h-full w-full object-cover object-top"
            />

            <div className="absolute inset-0 bg-linear-120 from-[#0A160E] from-0% via-[#0A160E]/70 via-40% to-primary2/10 to-100%" />
          </motion.div>
        </motion.div>
      </picture>
      <div className="absolute top-1/2 -translate-y-1/2 left-16 max-lg:left-4 max-w-150 text-white">
        <Reveal className="flex flex-col gap-4">
          <FadeUp delay={1}>
            <span className="text-[10px]">
              MILHO VERDE E REGIÃO - MINAS GERAIS
            </span>
            <h1 className="font-cormorant text-5xl font-semibold">
              Encontre experiências únicas entre montanhas, natureza e
              aconchego.
            </h1>
          </FadeUp>
          <FadeUp delay={1.5}>
            <h2 className="text-xs max-w-100 leading-relaxed">
              Aluguel de temporada e venda de imóveis selecionados para quem
              valoriza tranquilidade, natureza e qualidade.
            </h2>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="flex gap-4 pt-12">
              <DefaultButton
                text="VER HOSPEDAGENS"
                style="bg-linear-120! to-primary2/50! from-primary2!"
                path="/alugueis-temporada"
              />
              <DefaultButton
                text="VER IMÓVEIS À VENDA"
                style="bg-black/20! border border-white/30"
                path="/venda"
              />
            </div>
          </FadeUp>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroHome;

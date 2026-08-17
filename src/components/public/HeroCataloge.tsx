import rentCover from "../../assets/rent-cover.png";
import saleCover from "../../assets/sale-cover.png";
import FadeUp from "../FadeUp";
import { motion, useScroll, useTransform } from "motion/react";

type Props = {
  purpose: string;
};

const HeroCataloge = ({ purpose }: Props) => {
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
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <img
              src={purpose === "rent" ? rentCover : saleCover}
              alt="Cataloge-cover"
              className="h-full w-full object-cover object-top"
            />

            <div className="absolute inset-0 bg-linear-120 from-[#0A160E] from-0% via-[#0A160E]/70 via-40% to-primary2/10 to-100%" />
          </motion.div>
        </motion.div>
      </picture>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-200 w-full text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <FadeUp delay={0.5}>
            <h1 className="font-cormorant text-5xl max-md:text-3xl font-semibold">
              {purpose === "rent"
                ? "Alugue uma casa por temporada!"
                : "Invista no seu próprio imóvel!"}
            </h1>
          </FadeUp>
          <FadeUp delay={1}>
            <h2 className="text-sm max-w-100 leading-relaxed max-md:text-xs">
              {purpose === "rent" && "Tire uns dias para relaxar na natureza."}
            </h2>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default HeroCataloge;

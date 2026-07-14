import { useEffect } from "react";
import { motion } from "motion/react";
import loadingIcon from "@/assets/logo.svg";

const Loading = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xl" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.img
          src={loadingIcon}
          alt="Carregando..."
          className="w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        <h1 className="mt-2 text-sm font-bold text-primary1 animate-pulse">
          CARREGANDO...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
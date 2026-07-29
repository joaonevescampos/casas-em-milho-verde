import logo from "../../assets/logo.svg";
import Reveal from "../Reveal";
import user from "../../assets/user.png";
import airbnbLogo from "../../assets/airbnb.png";
import whatsappLogo from "../../assets/whatsapp.png";
import instagramLogo from "../../assets/instagram.png";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="-mx-20 max-md:-mx-4 overflow-hidden bg-linear-120! to-primary1/50! from-primary4! py-12 px-20 max-md:px-4">
      <Reveal delay={0.5}>
        <div className="flex flex-col gap-4 max-w-300 m-auto ">
          <div className="flex gap-4">
            <img src={logo} alt="logo" className="w-14 max-lg:w-10" />
            <div className="flex flex-col">
              <span className="text-secondary5 text-[10px]">
                CORRETOR E ANFITRIÃO
              </span>
              <h2 className="text-2xl font-cormorant font-semibold">
                Sobre Matias
              </h2>
            </div>
          </div>
          <div className="flex-2 flex max-lg:flex-col max-lg:items-center justify-between p-8 rounded-xl bg-white shadow">
            <div className="flex-2 flex max-lg:flex-col gap-8">
              <img
                src={user}
                alt="user"
                className="rounded-xl object-cover max-lg:w-30 max-lg:m-auto"
              />
              <div className="flex flex-col max-lg:text-center gap-2">
                <h2 className="font-bold text-xl">Matias Hansen</h2>
                <span className="text-primary5 font-medium text-sm">
                  Corretor de imóveis & Superhost
                </span>
                <span className="font-semibold text-primary5 text-sm">
                  CRECI - 123456
                </span>
                <h3 className="text-secondary5 pb-4 font-bold">
                  Fundador da empresa Casas Em Milho Verde
                </h3>
                <Link
                  to="https://www.airbnb.com.br/users/profile/1463193187508284145?previous_page_name=PdpHomeMarketplace"
                  target="_blank"
                  className="flex gap-4 items-center justify-center p-4 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-fit hover:bg-primary5/10 max-lg:m-auto max-lg:w-full"
                >
                  <img src={airbnbLogo} alt="airbnb-logo" className="w-4" />
                  <span>Ver perfil do Airbnb</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center max-lg:pt-8 gap-4 max-lg:w-full">
              <Link
                to="https://www.airbnb.com.br/users/profile/1463193187508284145?previous_page_name=PdpHomeMarketplace"
                target="_blank"
                className="flex gap-4 items-center justify-center p-4 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-50 max-lg:w-full hover:bg-primary5/10"
              >
                <img src={whatsappLogo} alt="airbnb-logo" className="w-8" />
                <span>What's App</span>
              </Link>
              <Link
                to="https://www.airbnb.com.br/users/profile/1463193187508284145?previous_page_name=PdpHomeMarketplace"
                target="_blank"
                className="flex gap-4 items-center justify-center p-4 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-50 max-lg:w-full hover:bg-primary5/10"
              >
                <img src={instagramLogo} alt="airbnb-logo" className="w-5" />
                <span>Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default About;

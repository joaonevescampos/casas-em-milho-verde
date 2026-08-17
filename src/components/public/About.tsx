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
          <div className="flex flex-col gap-4 p-8 rounded-xl bg-white shadow">
            <div className="flex-2 flex max-lg:flex-col max-lg:items-center justify-between ">
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
                    CRECI-MG - 66066
                  </span>
                  <h3 className="text-secondary5 pb-4 font-bold text-sm">
                    Idealizador do Casas em Milho Verde
                  </h3>
                  <Link
                    to="https://www.airbnb.com.br/users/profile/1463193187508284145?previous_page_name=PdpHomeMarketplace"
                    target="_blank"
                    className="flex gap-4 items-center justify-center p-4 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-fit hover:bg-primary5/10 max-lg:m-auto max-lg:w-full max-w-80"
                  >
                    <img src={airbnbLogo} alt="airbnb-logo" className="w-4" />
                    <span className="text-sm">Ver perfil do Airbnb</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-center max-lg:pt-4 gap-4 max-lg:w-full">
                <Link
                  to="https://wa.me/553899504678?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20o%20Matias%20sobre%20casas%20e%20hospedagens!"
                  target="_blank"
                  className="flex gap-4 items-center justify-center p-2.5 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-50 max-lg:w-full hover:bg-primary5/10 max-w-80 m-auto"
                >
                  <img src={whatsappLogo} alt="airbnb-logo" className="w-8" />
                  <span className="text-sm">What's App</span>
                </Link>
                <Link
                  to="https://www.instagram.com/casasemmilhoverde?igsh=d2U5bGJvZW8wYzM0"
                  target="_blank"
                  className="flex gap-4 items-center justify-center p-4 border-2 border-primary5/20 rounded-xl font-medium text-primary5 cursor-pointer w-50 max-lg:w-full hover:bg-primary5/10 max-w-80 m-auto "
                >
                  <img src={instagramLogo} alt="airbnb-logo" className="w-5" />
                  <span className="text-sm">Instagram</span>
                </Link>
              </div>
            </div>
            <hr />
            <h3 className="font-semibold font-cormorant text-2xl">Sobre mim</h3>
            <p className="text-sm opacity-70 leading-7">
              Minha história com Milho Verde começou há mais de 10 anos, quando
              cheguei aqui depois de alguns anos viajando pela América do Sul,
              em uma jornada que começou na Argentina. Foi onde escolhi ficar,
              formar minha família e construir meu lar.
            </p>
            <p className="text-sm opacity-70 leading-7">
              A experiência como viajante me aproximou do universo das
              hospedagens e me ensinou o valor de receber bem, do cuidado com os
              lugares e do respeito à natureza.{" "}
            </p>
            <p className="text-sm opacity-70 leading-7">
              Foi vivendo aqui que percebi que enquanto o turismo crescia e
              faltavam opções de hospedagem, muitas casas permaneciam fechadas
              durante grande parte do ano, pois seus proprietários viviam em
              outras cidades.{" "}
            </p>
            <p className="text-sm opacity-70 leading-7">
              Casas em Milho Verde nasceu desse encontro: cuidar e administrar
              essas casas, ajudando seus proprietários a manter e melhorar seus
              espaços e, ao mesmo tempo, ampliando as opções de hospedagem para
              quem vem conhecer Milho Verde. Uma parceria pensada para
              beneficiar proprietários, hóspedes e a comunidade, contribuindo
              também para fortalecer o turismo local.{" "}
            </p>
            <p className="text-sm opacity-70 leading-7">
              Com o tempo, o projeto foi crescendo e, hoje, como Corretor de Imóveis, também ajudo quem deseja comprar ou vender casas e lotes em Milho Verde e região, mantendo a mesma proposta de um trabalho próximo, pessoal e conectado ao lugar onde vivo.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default About;

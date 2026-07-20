import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 py-8 px-20 max-lg:px-4 bg-secondary1 text-white">
      <div className="flex max-lg:flex-col gap-4 justify-between">
        <div className="flex flex-col gap-4 max-w-80">
          <Link to="/" className="flex gap-1 items-center h-12 cursor-pointer">
            <img src={logo} alt="logo" className="w-14 max-lg:w-10" />
            <div className="flex flex-col">
              <span className="font-cormorant font-semibold text-xl max-lg:text-sm pb-1">
                Casas em Milho Verde
              </span>
              <span className="font-montserrat text-[10px] max-lg:text-[8px] text-primary2">
                TEMPORADA & VENDA
              </span>
            </div>
          </Link>
          <p className="text-[10px]">
            Hospedagens selecionadas e imóveis especiais entre as montanhas do
            interior de Minas Gerais. Curadoria com alma, tranquilidade e
            respeito pela natureza.
          </p>
        </div>
        <div>
          <h2 className="font-montserrat text-[10px] max-lg:text-[8px] text-primary2 pb-4">
            NAVEGAÇÃO
          </h2>

          <nav className="flex flex-col gap-2 text-[10px]">
            <NavLink to="/alugueis-temporada" className="hover:font-semibold">
              Aluguéis de temporada
            </NavLink>
            <NavLink to="/venda" className="hover:font-semibold">
              Venda de imóveis
            </NavLink>
          </nav>
        </div>
        <div>
          <h2 className="font-montserrat text-[10px] max-lg:text-[8px] text-primary2 pb-4">
            CONTATO
          </h2>

          <nav className="flex flex-col gap-2 text-[10px]">
            <div className="flex gap-2 items-center">
              <FaLocationDot className="text-primary2 text-sm" />
              <NavLink
                to="https://www.google.com/maps/place/Milho+Verde,+Serro+-+MG,+39155-000/@-7.2076812,-34.8295578,15z/data=!4m6!3m5!1s0xaedd54a584f335:0xdb9ef20115927e73!8m2!3d-18.4708851!4d-43.4973649!16s%2Fg%2F11b6x9dhzj?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="hover:font-semibold"
              >
                Milho Verde - Serro, MG
              </NavLink>
            </div>
            <div className="flex gap-2 items-center">
              <IoLogoWhatsapp className="text-primary2 text-sm" />
              <NavLink
                to="/"
                target="_blank"
                className="hover:font-semibold"
              >
                +55 38 98999 - 9999
              </NavLink>
            </div>
            <div className="flex gap-2 items-center">
              <FaInstagram className="text-primary2 text-sm" />
              <NavLink
                to="https://www.instagram.com/casasemmilhoverde"
                target="_blank"
                className="hover:font-semibold"
              >
                @casasemmilhoverde
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
      <hr className="opacity-20" />
      <div className="flex gap-4 justify-between items-center text-[10px] max-sm:text-[8px]">
        <small className="opacity-70">
          <strong>CASAS EM MILHO VERDE</strong> - TODOS DIREITOS RESERVADOS -
          2026
        </small>
        <small className="opacity-70">
          DESENVOLVIDO POR{" "}
          <strong>
            <Link
              target="_blank"
              to="https://www.instagram.com/joaocampos_digital/"
            >
              @JOAOCAMPOS_DIGITAL
            </Link>
          </strong>
        </small>
      </div>
    </footer>
  );
};

export default Footer;

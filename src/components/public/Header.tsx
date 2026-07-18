import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import DefaultButton from "../Button";

const nav = [
  { name: "INÍCIO", path: "/" },
  { name: "ALUGUÉIS TEMPORADA", path: "/alugueis-temporada" },
  { name: "VENDA DE IMÓVEIS", path: "/venda" },
];
const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-30 flex justify-between items-center backdrop-blur-sm  bg-white/70 h-20 px-20 max-lg:px-4 w-full">
      <Link
        to="/"
        className="flex gap-1 items-center justify-center h-12 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-14 max-lg:w-10" />
        <div className="flex flex-col">
          <span className="font-cormorant font-semibold text-xl max-lg:text-sm pb-1">
            Casas em Milho Verde
          </span>
          <span className="font-montserrat text-[10px] max-lg:text-[7px] text-secondary5">
            TEMPORADA & VENDA
          </span>
        </div>
      </Link>
      <div className="flex flex-col">
        <span className="font-cormorant font-semibold text-xl max-lg:text-sm pb-1">
          Matias Hansen
        </span>
        <span className="font-montserrat text-[10px] max-lg:text-[7px] text-secondary5">
          CORRETOR DE IMÓVEIS . CRECI - 12345
        </span>
      </div>
      <nav className="flex text-xs items-center h-full">
        {nav.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "bg-white/80 border-b-2 border-primary1 font-semibold h-full flex items-center px-4"
                : "opacity-70 h-full flex items-center px-4 hover:bg-white/50 hover:border-b-2 hover:border-primary1 hover:font-semibold transition-all duration-500"
            }
          >
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <DefaultButton text="WHAT'S APP" />
    </header>
  );
};

export default Header;

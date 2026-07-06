import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "../Button";

const AdminHeader = () => {
  return (
    <header className="flex justify-between items-center bg-white h-20 px-20 max-lg:px-4">
      <Link
        to="/"
        className="flex gap-2 items-center justify-center h-12 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-14" />
        <div className="flex flex-col">
          <span className="font-cormorant font-semibold text-xl">
            Casas em Milho Verde
          </span>
          <span className="font-montserrat text-[10px] text-secondary5">
            TEMPORADA & VENDA
          </span>
        </div>
      </Link>
      <Button text="ACESSAR SITE" path="/" />
    </header>
  );
};

export default AdminHeader;

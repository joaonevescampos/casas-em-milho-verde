import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "../Button";
import profile from "../../assets/logo.svg"

type HeaderProps = {
  isLogged: boolean;
};

const AdminHeader = ({ isLogged }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center bg-white h-20 px-20 max-lg:px-4">
      <Link
        to={isLogged ? "/admin/home" : "/admin"}
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
      {isLogged ? (
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1 items-end">
            <span className="font-semibold text-xs">Matias Hansen</span>
            <span className="text-xs text-red-700">Sair</span>
          </div>
          <div>
            <img src={profile} alt="photo-profile" className="w-12 h-12 rounded-full" />
          </div>
        </div>
      ) : (
        <Button text="ACESSAR SITE" path="/" />
      )}
    </header>
  );
};

export default AdminHeader;

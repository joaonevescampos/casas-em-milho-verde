import Button from "../../components/Button";
import { loginToAdmin } from "../../services/login";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import logo from "../../assets/logo.svg";

const Login = () => {
  return (
    <>
      <AdminHeader />
      <main className="flex flex-col gap-4 items-center justify-center bg-linear-to-b from-opacity1 to-opacity2 h-[calc(100vh-80px-64px)] ">
        <div className="flex flex-col gap-2 items-center justify-ceter">
          <img src={logo} alt="logo" className="w-36" />
          <h1 className="font-cormorant text-3xl font-semibold">
            Gerenciar imóveis
          </h1>
          <h2 className="text-sm text-primary1 pb-4">
            Tenha total controle do seu site, editando, excluindo e adicionando
            imóveis.
          </h2>
        </div>
        <div className="flex flex-col gap-4 items-center p-8 w-150 h-100 bg-white rounded-xl ">
        <h3 className="font-semibold text-xl">Login</h3>
        <Button text="ENTRAR" style="w-50" onClick={() => loginToAdmin()} />
        </div>
        <div className="font-cormorant font-bold text-3xl"></div>
      </main>
      <AdminFooter />
    </>
  );
};

export default Login;

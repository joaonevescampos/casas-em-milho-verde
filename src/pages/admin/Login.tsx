import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import logo from "../../assets/logo.svg";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DefaultButton from "@/components/Button";
import { loginToAdmin } from "@/services/login";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/schemas/login";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm<FormData>();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      await loginToAdmin(data.email, data.password);
      navigate("home");
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao realizar login.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* <AdminHeader isLogged={false} /> */}
      {isLoading && <Loading />}
     
      <main className="flex flex-col gap-4 items-center justify-center bg-linear-to-b from-opacity1 to-opacity2 py-8! mt-0!">
        <div className="flex flex-col gap-2 items-center justify-ceter">
          <img src={logo} alt="logo" className="w-36" />
          <h1 className="font-cormorant text-3xl max-lg:text-2xl font-semibold">
            Gerenciar imóveis
          </h1>
          <h2 className="text-xs text-center text-primary1 pb-4">
            Tenha total controle do seu site, editando, excluindo e adicionando
            imóveis.
          </h2>
        </div>
        <div className="flex flex-col gap-4 items-center p-8 w-120 max-lg:w-80  bg-white rounded-xl ">
          <h3 className="font-semibold text-xl max-lg:text-sm">Login</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fieldgroup-email" className="text-xs">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="fieldgroup-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="nome@exemplo.com"
                      autoComplete="on"
                      className="h-10 max-lg:text-xs"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="fieldgroup-password"
                      className="text-xs"
                    >
                      Senha
                    </FieldLabel>
                    <Input
                      {...field}
                      id="fieldgroup-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="digite sua senha"
                      autoComplete="on"
                      className="h-10 max-lg:text-xs"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <DefaultButton text="ENTRAR" typeSubmit={true} />
            </FieldGroup>
          </form>
        </div>
        <div className="font-cormorant font-bold text-3xl"></div>
      </main>
      <AdminFooter />
    </>
  );
};

export default Login;

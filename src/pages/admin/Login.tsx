// import Button from "../../components/Button";
// import { loginToAdmin } from "../../services/login";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";
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

type FormData = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, "preencha seu e-mail")
    .email("Formato do email inválido"),
  password: z.string().min(1, "preencha sua senha"),
});

const Login = () => {
  // const { register, handleSubmit } = useForm<FormData>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    console.log(data);

    // enviar para o backend
    // await api.post("/login", data);
  }

  return (
    <>
      <AdminHeader />
      <main className="flex flex-col gap-4 items-center justify-center bg-linear-to-b from-opacity1 to-opacity2 h-full">
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
        <div className="flex flex-col gap-4 items-center p-8 w-120 h-100 bg-white rounded-xl ">
          <h3 className="font-semibold text-xl">Login</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="fieldgroup-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="nome@exemplo.com"
                      autoComplete="off"
                      className="h-12"
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
                    <FieldLabel htmlFor="fieldgroup-password">Senha</FieldLabel>
                    <Input
                      {...field}
                      id="fieldgroup-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="digite sua senha"
                      autoComplete="off"
                      className="h-12"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field orientation="horizontal">
                <Button type="submit">Entrar</Button>
              </Field>
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

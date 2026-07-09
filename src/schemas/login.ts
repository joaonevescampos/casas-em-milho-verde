import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "preencha seu e-mail")
    .email("Formato do email inválido"),
  password: z.string().min(1, "preencha sua senha"),
});
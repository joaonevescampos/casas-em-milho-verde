import * as z from "zod";

export const propertySchema = z.object({
  purpose: z.string(),
  title: z
    .string()
    .min(1, "preencha o título")
    .max(60, "título passou do limite permitido"),
  description: z
    .string()
    .min(1, "preencha a descrição")
    .min(1, "descrição passou do limite permitido"),
  category: z.string().min(1, "preencha a categoria"),
  is_featured: z.boolean(),
  state: z.string().min(1, "preencha o estatdo"),
  city: z.string().min(1, "preencha a cidade"),
  neighborhood: z.string(),
  bedrooms: z.number(),
  beds: z.number().min(1, "preencha a quantidade de cama"),
  guests: z.number().min(1, "preencha a quantidade de hóspedes"),
  bathrooms: z.number().min(1, "preencha a quantidade de banheiros"),
  airbnb_link: z
    .string(),
});

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
  emphasis1: z.string(),
  emphasis2: z.string(),
  emphasis3: z.string(),
  emphasis4: z.string(),
  code: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  beds: z.number(),
  guests: z.number(),
  bathrooms: z.number(),
  area: z.number().optional(),
  balcony: z.number(),
  garage: z.number(),
  airbnb_link: z.string(),
});

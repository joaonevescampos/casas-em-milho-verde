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
  state: z.string().min(1, "preencha o estado"),
  city: z.string().min(1, "preencha a cidade"),
  neighborhood: z.string().nullable().optional(),
  emphasis1: z.string().nullable().optional(),
  emphasis2: z.string().nullable().optional(),
  emphasis3: z.string().nullable().optional(),
  emphasis4: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  bedrooms: z.number().nullable().optional(),
  beds: z.number().nullable().optional(),
  guests: z.number().nullable().optional(),
  bathrooms: z.number().nullable().optional(),
  area: z.number().nullable().optional(),
  balcony: z.number().nullable().optional(),
  garage: z.number().nullable().optional(),
  airbnb_link: z.string().nullable().optional(),
  coordinate: z.string().nullable().optional(),
  order: z.number(), // Nova propriedade
});

export type Property = {
  id?: string;
  purpose: "sale" | "rent";

  category: string;

  slug: string;
  title: string;
  description: string;

  price: number;

  state: string;
  city: string;
  neighborhood: string;

  bedrooms: number;
  bathrooms: number;
  garage: number | null;
  balcony: number | null;
  area: number;

  guests: number | null;
  beds: number | null;

  airbnb_link: string | null;
  status: string;

  rate: number | null;

  is_featured: boolean;

  cover: string;

  created_at?: string;
  updated_at?: string;
};

export type PropertyImages = {
  id?: string;
  property_id: string;
  image_url: string;
  position: number
  created_at?: string;
  updated_at?: string
};

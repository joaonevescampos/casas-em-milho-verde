export type Property = {
  id?: string;
  purpose: string;

  category: string;

  slug?: string;
  title: string;
  description: string;

  state: string;
  city: string;
  neighborhood: string;

  emphasis1?: string;
  emphasis2?: string;
  emphasis3?: string;
  emphasis4?: string;

  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  beds?: number;
  area?: number;
  garage?: number;
  balcony?: number;

  code?: string;
  price?: number;

  airbnb_link?: string;
  status?: string;

  is_featured: boolean;

  created_at?: string;
  updated_at?: string;
};

export type PropertyImages = {
  id?: string;
  property_id: string;
  image_url: string;
  position: number;
  cover_image: boolean;
  created_at?: string;
  updated_at?: string;
};

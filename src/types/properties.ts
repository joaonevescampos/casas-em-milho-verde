export type Property = {
  id?: string;
  purpose: string;

  category: string;

  slug?: string;
  title: string;
  description: string;

  state: string;
  city: string;
  neighborhood?: string | null;

  emphasis1?: string | null;
  emphasis2?: string | null;
  emphasis3?: string | null;
  emphasis4?: string | null;

  bedrooms?: number | null;
  bathrooms?: number | null;
  guests?: number | null;
  beds?: number | null;
  area?: number | null;
  garage?: number | null;
  balcony?: number | null;

  code?: string | null;
  price?: number | null;

  airbnb_link?: string | null;
  status?: string;

  coordinate?: string | null;

  order: number;

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

export type ShortImagesType = {
  id: string;
  property_id: string;
  cover_image: boolean;
  image_url: string;
};

export type PropertyCardType = {
  id: string;
  purpose: string;
  title: string;
  description: string;
  city: string;
  state: string;
  neighborhood?: string;
  code?: string;
  price?: number;
  slug?: string;
  beds?: number;
  bedrooms?: number;
  guests?: number;
  bathrooms?: number;
  emphasis1?: string;
  emphasis2?: string;
  emphasis3?: string;
  emphasis4?: string;
  is_featured: boolean;
};

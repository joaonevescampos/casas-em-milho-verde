-- =====================================================
-- EXTENSÕES
-- =====================================================

create extension if not exists pgcrypto;

-- =====================================================
-- FUNÇÃO PARA UPDATED_AT
-- =====================================================

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================
-- TABELA PROPERTIES
-- =====================================================

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),

  purpose text not null
    check (purpose in ('sale', 'rent')),

  category text not null,

  title text not null,

  slug text not null unique,

  description text,

  price numeric(12,2) not null,

  state text not null,

  city text not null,

  neighborhood text not null,

  bedrooms integer default 0,

  bathrooms integer default 0,

  garage integer default 0,

  balcony integer default 0,

  guests integer,

  beds integer,

  area numeric(10,2),

  rate numeric(2,1),

  airbnb_link text,

  cover text,

  is_featured boolean default false,

  status text not null default 'available'
    check (
      status in (
        'available',
        'reserved',
        'sold',
        'rented',
        'inactive'
      )
    ),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

-- =====================================================
-- TABELA PROPERTY_IMAGES
-- =====================================================

create table if not exists property_images (
  id uuid primary key default gen_random_uuid(),

  property_id uuid not null
    references properties(id)
    on delete cascade,

  image_url text not null,

  position integer default 0,

  created_at timestamptz not null default now()
);

-- =====================================================
-- ÍNDICES
-- =====================================================

create index if not exists idx_properties_purpose
on properties(purpose);

create index if not exists idx_properties_city
on properties(city);

create index if not exists idx_properties_neighborhood
on properties(neighborhood);

create index if not exists idx_properties_price
on properties(price);

create index if not exists idx_property_images_property_id
on property_images(property_id);

-- =====================================================
-- TRIGGER UPDATED_AT
-- =====================================================

drop trigger if exists set_updated_at_on_properties
on properties;

create trigger set_updated_at_on_properties
before update on properties
for each row
execute function update_updated_at_column();

-- =====================================================
-- RLS
-- =====================================================

alter table properties enable row level security;

alter table property_images enable row level security;


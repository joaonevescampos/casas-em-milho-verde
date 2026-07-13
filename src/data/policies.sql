-- =====================================================
-- POLÍTICAS PROPERTIES
-- =====================================================


-- BUCKET
create policy "Allow anonymous uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'property-images'
);

create policy "Allow read"
on storage.objects
for select
to public
using (
  bucket_id = 'property-images'
);

create policy "Allow update"
on storage.objects
for update
to anon
using (
  bucket_id = 'property-images'
);

create policy "Allow delete"
on storage.objects
for delete
to anon
using (
  bucket_id = 'property-images'
);

-- ===============
create policy "authenticated upload"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'property_images'
);

-- ==========================

create policy "Public read properties"
on properties
for select
using (true);

create policy "Authenticated insert properties"
on properties
for insert
to authenticated
with check (true);

create policy "Authenticated update properties"
on properties
for update
to authenticated
using (true);

create policy "Authenticated delete properties"
on properties
for delete
to authenticated
using (true);

-- =====================================================
-- POLÍTICAS PROPERTY_IMAGES
-- =====================================================

create policy "Public read property images"
on property_images
for select
using (true);

create policy "Authenticated insert property images"
on property_images
for insert
to authenticated
with check (true);

create policy "Authenticated update property images"
on property_images
for update
to authenticated
using (true);

create policy "Authenticated delete property images"
on property_images
for delete
to authenticated
using (true);



show app.settings.jwt_exp;
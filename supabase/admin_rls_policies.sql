-- RLS policies: public read access, admin-only write access.
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).
--
-- Prerequisite: mark your admin account by setting app_metadata.role = 'admin'.
-- app_metadata can only be changed via the Admin API / service role (never by the
-- client SDK), so it's safe to trust inside RLS policies. Run this once,
-- replacing the email with your actual admin login:
--
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
--   where email = 'admin@gaatikundan.com';

alter table products enable row level security;
alter table categories enable row level security;
alter table product_images enable row level security;
alter table product_videos enable row level security;

-- Public (anon + authenticated) can read everything — needed for the storefront.
create policy "public read products" on products
  for select using (true);

create policy "public read categories" on categories
  for select using (true);

create policy "public read product_images" on product_images
  for select using (true);

create policy "public read product_videos" on product_videos
  for select using (true);

-- Only accounts with app_metadata.role = 'admin' may write.
create policy "admin write products" on products
  for insert with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin update products" on products
  for update using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin delete products" on products
  for delete using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin write categories" on categories
  for insert with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin update categories" on categories
  for update using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin delete categories" on categories
  for delete using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin write product_images" on product_images
  for insert with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin update product_images" on product_images
  for update using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin delete product_images" on product_images
  for delete using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin write product_videos" on product_videos
  for insert with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin update product_videos" on product_videos
  for update using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "admin delete product_videos" on product_videos
  for delete using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

import { supabase } from '@/lib/supabase';

const PRODUCT_SELECT = `
  *,
  categories(id, name, slug),
  product_images(id, image_url, sort_order),
  product_videos(id, video_url)
`;

export async function getAllProducts({ limit = 50, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
}

export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getTrendingProducts(limit = 8) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('trending', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getNewArrivals(limit = 8) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('new_arrival', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getProductsByCategory(categorySlug, { limit = 20, offset = 0, sortBy = 'created_at', sortOrder = 'desc', search = '' } = {}) {
  let query = supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('categories.slug', categorySlug);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  if (sortBy === 'price') {
    query = query.order('price', { ascending: sortOrder === 'asc' });
  } else {
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  }

  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  // Filter by category slug since Supabase doesn't filter on joined tables easily
  return (data || []).filter((p) => p.categories?.slug === categorySlug);
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getRelatedProducts(categoryId, excludeId, limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function searchProducts(query, limit = 20) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .ilike('name', `%${query}%`)
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getProductsCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count || 0;
}

export async function createProduct({ name, slug, description, price, category_id, featured, trending, new_arrival }) {
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, slug, description, price, category_id, featured, trending, new_arrival }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  // Delete images and videos first
  await supabase.from('product_images').delete().eq('product_id', id);
  await supabase.from('product_videos').delete().eq('product_id', id);

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function addProductImage(productId, imageUrl, sortOrder = 0) {
  const { data, error } = await supabase
    .from('product_images')
    .insert([{ product_id: productId, image_url: imageUrl, sort_order: sortOrder }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProductImage(imageId) {
  const { error } = await supabase.from('product_images').delete().eq('id', imageId);
  if (error) throw error;
}

export async function addProductVideo(productId, videoUrl) {
  const { data, error } = await supabase
    .from('product_videos')
    .insert([{ product_id: productId, video_url: videoUrl }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentUploads(limit = 5) {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, created_at, product_images(image_url)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

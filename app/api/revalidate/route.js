import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/', 'page');
  revalidatePath('/category/[slug]', 'layout');
  revalidatePath('/product/[slug]', 'layout');
  return Response.json({ revalidated: true });
}

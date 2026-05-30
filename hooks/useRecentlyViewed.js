'use client';

import { useState, useEffect, useCallback } from 'react';
import { RECENTLY_VIEWED_KEY, MAX_RECENTLY_VIEWED } from '@/lib/constants';
import { safeStorage } from '@/lib/storage';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = safeStorage.getItem(RECENTLY_VIEWED_KEY);
    if (stored) {
      try { setRecentlyViewed(JSON.parse(stored)); } catch {}
    }
  }, []);

  const addToRecentlyViewed = useCallback((product) => {
    const stored = safeStorage.getItem(RECENTLY_VIEWED_KEY);
    const current = stored ? (() => { try { return JSON.parse(stored); } catch { return []; } })() : [];

    const updated = [
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.product_images?.[0]?.image_url || null,
      },
      ...current.filter((item) => item.id !== product.id),
    ].slice(0, MAX_RECENTLY_VIEWED);

    safeStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    setRecentlyViewed(updated);
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    safeStorage.removeItem(RECENTLY_VIEWED_KEY);
    setRecentlyViewed([]);
  }, []);

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}

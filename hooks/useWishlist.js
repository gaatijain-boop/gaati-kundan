'use client';

import { useState, useEffect, useCallback } from 'react';
import { WISHLIST_KEY } from '@/lib/constants';
import { safeStorage } from '@/lib/storage';
import toast from 'react-hot-toast';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = safeStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try { setWishlist(JSON.parse(stored)); } catch {}
    }
    setIsLoaded(true);
  }, []);

  const saveWishlist = useCallback((newWishlist) => {
    safeStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  }, []);

  const addToWishlist = useCallback(
    (product) => {
      if (wishlist.some((item) => item.id === product.id)) {
        toast('Already in wishlist', { icon: '💛' });
        return;
      }
      saveWishlist([
        ...wishlist,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.product_images?.[0]?.image_url || null,
        },
      ]);
      toast.success('Added to wishlist!');
    },
    [wishlist, saveWishlist]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      saveWishlist(wishlist.filter((item) => item.id !== productId));
      toast.success('Removed from wishlist');
    },
    [wishlist, saveWishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      wishlist.some((item) => item.id === product.id)
        ? removeFromWishlist(product.id)
        : addToWishlist(product);
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  return {
    wishlist,
    isLoaded,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
  };
}

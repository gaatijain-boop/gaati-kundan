'use client';

import { useState, useEffect, useCallback } from 'react';
import { CART_KEY } from '@/lib/constants';
import { safeStorage } from '@/lib/storage';
import toast from 'react-hot-toast';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = safeStorage.getItem(CART_KEY);
    if (stored) {
      try { setCart(JSON.parse(stored)); } catch {}
    }
    setIsLoaded(true);
  }, []);

  const saveCart = useCallback((newCart) => {
    safeStorage.setItem(CART_KEY, JSON.stringify(newCart));
    setCart(newCart);
  }, []);

  const addToCart = useCallback(
    (product) => {
      const existing = cart.find((item) => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.success('Quantity updated in cart');
      } else {
        newCart = [
          ...cart,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.product_images?.[0]?.image_url || null,
            quantity: 1,
          },
        ];
        toast.success('Added to cart!');
      }
      saveCart(newCart);
    },
    [cart, saveCart]
  );

  const removeFromCart = useCallback(
    (productId) => {
      saveCart(cart.filter((item) => item.id !== productId));
      toast.success('Removed from cart');
    },
    [cart, saveCart]
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity < 1) { removeFromCart(productId); return; }
      saveCart(cart.map((item) => item.id === productId ? { ...item, quantity } : item));
    },
    [cart, saveCart, removeFromCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
    toast.success('Cart cleared');
  }, [saveCart]);

  const isInCart = useCallback((productId) => cart.some((item) => item.id === productId), [cart]);

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

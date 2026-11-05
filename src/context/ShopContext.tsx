import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartItem, Product, ProductVariation } from '../types/product';
import { PRODUCTS } from '../data/products';

const CART_STORAGE_KEY = 'cedep_lubrificantes_cart_v1';
const FAVORITES_STORAGE_KEY = 'cedep_lubrificantes_favorites_v1';

export interface ToastMessage {
  id: number;
  title: string;
  subtitle?: string;
  type?: 'cart' | 'favorite' | 'info';
}

interface ShopContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, variation: ProductVariation, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  updateCartVariation: (cartItemId: string, newVariation: ProductVariation) => void;
  clearCart: () => void;
  totalUnits: number;
  uniqueProductsCount: number;

  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  favoriteProducts: Product[];

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;
  isMobileCategoriesOpen: boolean;
  setIsMobileCategoriesOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  toast: ToastMessage | null;
  dismissToast: () => void;
  showToast: (title: string, subtitle?: string, type?: 'cart' | 'favorite' | 'info') => void;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  const showToast = useCallback(
    (title: string, subtitle?: string, type: 'cart' | 'favorite' | 'info' = 'cart') => {
      setToast({
        id: Date.now(),
        title,
        subtitle,
        type,
      });
    },
    []
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  const dismissToast = useCallback(() => setToast(null), []);

  const addToCart = useCallback(
    (product: Product, variation: ProductVariation, quantity: number = 1) => {
      const safeQty = Math.max(1, quantity);
      const cartItemId = `${product.id}::${variation.id}`;

      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + safeQty,
          };
          return updated;
        }
        return [
          ...prev,
          {
            cartItemId,
            product,
            selectedVariation: variation,
            quantity: safeQty,
          },
        ];
      });

      showToast(
        `${product.brand} ${product.name}`,
        `Adicionado à solicitação (${variation.label} · ${safeQty} un.)`,
        'cart'
      );
    },
    [showToast]
  );

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const updateCartQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const updateCartVariation = useCallback(
    (cartItemId: string, newVariation: ProductVariation) => {
      setCartItems((prev) => {
        const currentItem = prev.find((i) => i.cartItemId === cartItemId);
        if (!currentItem) return prev;

        const newCartItemId = `${currentItem.product.id}::${newVariation.id}`;
        if (newCartItemId === cartItemId) return prev;

        const targetExists = prev.find((i) => i.cartItemId === newCartItemId);
        if (targetExists) {
          return prev
            .filter((i) => i.cartItemId !== cartItemId)
            .map((i) =>
              i.cartItemId === newCartItemId
                ? { ...i, quantity: i.quantity + currentItem.quantity }
                : i
            );
        }

        return prev.map((i) =>
          i.cartItemId === cartItemId
            ? {
                ...i,
                cartItemId: newCartItemId,
                selectedVariation: newVariation,
              }
            : i
        );
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleFavorite = useCallback(
    (productId: string) => {
      const prod = PRODUCTS.find((p) => p.id === productId);
      setFavoriteIds((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          return prev.filter((id) => id !== productId);
        } else {
          if (prod) {
            showToast(
              `${prod.brand} ${prod.name}`,
              'Salvo nos seus Favoritos',
              'favorite'
            );
          }
          return [...prev, productId];
        }
      });
    },
    [showToast]
  );

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  const favoriteProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id));

  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueProductsCount = cartItems.length;

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartVariation,
        clearCart,
        totalUnits,
        uniqueProductsCount,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        favoriteProducts,
        isCartOpen,
        setIsCartOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isMobileCategoriesOpen,
        setIsMobileCategoriesOpen,
        selectedProduct,
        setSelectedProduct,
        toast,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return ctx;
}


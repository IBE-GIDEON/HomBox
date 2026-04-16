import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item only if it's not already in the wishlist
      addItem: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);
          if (!exists) {
            return { items: [...state.items, product] };
          }
          return state;
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'hombox-wishlist-storage',
    }
  )
);
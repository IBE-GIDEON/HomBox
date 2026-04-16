import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './cartStore';

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'To Review';
  storeName: string;
  total: string;
  trackingStep: number;
  items: OrderItem[];
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [], // Starting empty, previously had dummy orders
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'hombox-order-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.productId === item.productId);
        
        if (existingItem) {
          const updatedItems = items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, item] });
        }
        
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
        
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
        
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
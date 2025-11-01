import { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "@/data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE"; productId: string; quantity: number }
  | { type: "CLEAR" };

type CartContextValue = {
  items: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
    case "UPDATE":
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: Math.max(1, Math.min(action.quantity, 10)) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo<CartContextValue>(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      items: state.items,
      total,
      itemCount,
      addToCart: (product: Product) =>
        dispatch({ type: "ADD", product: product }),
      removeFromCart: (productId: string) =>
        dispatch({ type: "REMOVE", productId }),
      updateQuantity: (productId: string, quantity: number) =>
        dispatch({ type: "UPDATE", productId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

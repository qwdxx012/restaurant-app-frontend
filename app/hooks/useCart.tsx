import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, MenuItem } from "~/types";

// Интерфейс значений, доступных через контекст корзины
interface CartContextValue {
  items: CartItem[];
  totalAmount: number;
  totalCount: number;
  addItem: (item: MenuItem) => void;
  updateQuantity: (id: number, newQty: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

// Создаём контекст корзины
const CartContext = createContext<CartContextValue | null>(null);

// Провайдер — оборачивает всё приложение и предоставляет данные корзины
export function CartProvider({ children }: { children: ReactNode }) {
  // Состояние: массив товаров в корзине
  const [items, setItems] = useState<CartItem[]>([]);

  // Вычисляем общую сумму через useMemo — пересчёт только при изменении items
  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
    [items]
  );

  // Вычисляем общее количество позиций в корзине
  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Добавление товара: если уже есть — увеличиваем количество, иначе добавляем новый
  const addItem = (menuItem: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  // Изменение количества товара; удаляем позицию, если количество стало 0
  const updateQuantity = (id: number, newQty: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.menuItem.id === id ? { ...item, quantity: newQty } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Удаление конкретной позиции из корзины
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.menuItem.id !== id));
  };

  // Очистка всей корзины
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, totalAmount, totalCount, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Кастомный хук для удобного доступа к корзине из любого компонента
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

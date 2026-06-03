// Интерфейс элемента меню
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "Закуски" | "Основные блюда" | "Десерты" | "Напитки";
  image: string;
}

// Интерфейс элемента корзины
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

// Интерфейс информации о ресторане
export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  workHours: string;
}

// Интерфейс данных заказа
export interface OrderData {
  items: CartItem[];
  total: number;
  customerName: string;
}

// Поля формы оформления заказа, управляемые react-hook-form
export interface CheckoutFormData {
  name: string;
  phone: string;
  comment: string;
  paymentMethod: "card" | "cash";
}

// Отдельная позиция заказа в том виде, в котором она сохраняется на сервере
export interface ServerOrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Заказ из Firestore, полученный через Flask API для страницы истории
export interface ServerOrder {
  id: string;
  customer: CheckoutFormData;
  items: ServerOrderItem[];
  total: number;
  userId: string;
  status: string;
  created_at?: string;
}

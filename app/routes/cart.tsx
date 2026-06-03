import { Link } from "react-router";
import { useCart } from "~/hooks/useCart";

// Метаданные страницы корзины
export function meta() {
  return [{ title: "Корзина | НАТК" }];
}

// Страница корзины с управлением количеством товаров
export default function CartPage() {
  const { items, totalAmount, updateQuantity } = useCart();

  // Условный рендеринг: если корзина пуста — показываем сообщение
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
        <Link
          to="/menu"
          className="text-tom-thumb-600 hover:underline text-lg"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-tom-thumb-900 mb-8">Корзина</h1>

      {/* Список товаров в корзине */}
      {items.map((item) => (
        <div
          key={item.menuItem.id}
          className="bg-white rounded-xl p-4 mb-4 shadow-sm flex items-center gap-4"
        >
          {/* Миниатюра блюда */}
          <img
            src={item.menuItem.image}
            alt={item.menuItem.name}
            className="w-20 h-20 object-cover rounded-lg"
          />

          {/* Название и цена */}
          <div className="flex-grow">
            <h3 className="font-bold">{item.menuItem.name}</h3>
            <p className="text-tom-thumb-700">{item.menuItem.price} ₽</p>
          </div>

          {/* Управление количеством */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
              className="w-8 h-8 bg-stone-200 rounded-full"
            >
              −
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
              className="w-8 h-8 bg-stone-200 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Итоговая сумма и кнопка оформления заказа */}
      <div className="bg-stone-100 rounded-xl p-6 mt-6">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Итого:</span>
          <span>{totalAmount} ₽</span>
        </div>
        <Link
          to="/checkout"
          className="block text-center w-full bg-tom-thumb-600 text-white py-3 rounded-xl text-lg hover:bg-tom-thumb-700 transition-colors"
        >
          Оформить заказ
        </Link>
      </div>
    </div>
  );
}

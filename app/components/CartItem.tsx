// Переименовываем тип, чтобы избежать конфликта имён с компонентом
import type { CartItem as CartItemType } from "~/types";

// Интерфейс пропсов элемента корзины
interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

// Компонент отдельной позиции в корзине
export default function CartItem({ item, onUpdateQuantity }: CartItemProps) {
  // Деструктурируем для удобного доступа к данным
  const { menuItem, quantity } = item;

  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
      {/* Миниатюра блюда */}
      <img
        src={menuItem.image}
        alt={menuItem.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Информация о блюде */}
      <div className="flex-grow">
        <h3 className="font-bold text-stone-800">{menuItem.name}</h3>
        <p className="text-tom-thumb-700 font-medium">
          {menuItem.price} ₽ × {quantity} = {menuItem.price * quantity} ₽
        </p>
      </div>

      {/* Управление количеством */}
      <div className="flex items-center gap-2">
        {/* Кнопка уменьшить */}
        <button
          onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)}
          className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center"
        >
          −
        </button>

        {/* Текущее количество */}
        <span className="w-8 text-center font-medium">{quantity}</span>

        {/* Кнопка увеличить */}
        <button
          onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)}
          className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

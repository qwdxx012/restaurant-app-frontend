import type { MenuItem } from "~/types";

// Интерфейс пропсов карточки блюда
interface Props {
  item: MenuItem;                             // Объект блюда
  onAddToCart: (item: MenuItem) => void;      // Обработчик добавления в корзину
}

// Компонент карточки блюда в меню
export default function MenuCard({ item, onAddToCart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Изображение блюда */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />

      {/* Содержимое карточки */}
      <div className="p-5">
        {/* Название и цена */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <span className="text-tom-thumb-700 font-bold">{item.price} ₽</span>
        </div>

        {/* Описание блюда */}
        <p className="text-sm text-stone-500 mb-4">{item.description}</p>

        {/* Кнопка добавления в корзину */}
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-tom-thumb-600 text-white py-2 rounded-xl hover:bg-tom-thumb-700 transition-colors"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}

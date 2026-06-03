import { useEffect, useState } from "react";
import { apiClient } from "~/config/api";
import MenuCard from "~/components/MenuCard";
import { useCart } from "~/hooks/useCart";
import type { MenuItem } from "~/types";

// Метаданные страницы меню
export function meta() {
  return [{ title: "Меню | НАТК" }];
}

// Страница меню с загрузкой блюд из Flask API и фильтрацией по категориям
export default function MenuPage() {
  const categories = ["Все", "Закуски", "Основные блюда", "Десерты", "Напитки"];
  const [activeCategory, setActiveCategory] = useState("Все");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { totalCount, addItem } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // GET /menu получает блюда с бэкенда и при первом запуске заполняет Firestore.
        const response = await apiClient.get<MenuItem[]>("/menu");
        setMenuItems(response.data);
      } catch (requestError) {
        setError("Не удалось загрузить меню. Проверьте подключение к серверу.");
        console.error(requestError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredMenu =
    activeCategory === "Все"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    addItem(item);
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg">Загрузка меню...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-700">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-tom-thumb-900">Меню</h1>
        <span className="bg-tom-thumb-100 text-tom-thumb-800 px-4 py-2 rounded-full">
          {totalCount} блюд
        </span>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-tom-thumb-600 text-white border-tom-thumb-600"
                : "bg-white text-tom-thumb-800 border-tom-thumb-200 hover:bg-tom-thumb-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

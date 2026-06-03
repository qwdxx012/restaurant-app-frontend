import { Link } from "react-router";
import { restaurantInfo } from "~/data/restaurant";

// Метаданные страницы — заголовок вкладки браузера
export function meta() {
  return [{ title: restaurantInfo.name }];
}

// Главная страница приложения
export default function HomePage() {
  return (
    <div className="text-center space-y-8">
      {/* Большой заголовок с названием ресторана */}
      <h1 className="text-5xl font-bold text-tom-thumb-900 mt-12">
        {restaurantInfo.name}
      </h1>

      {/* Краткое описание */}
      <p className="text-xl text-tom-thumb-700 max-w-2xl mx-auto">
        Изысканная кухня в центре города.
      </p>

      {/* Кнопка-ссылка для перехода в меню */}
      <Link
        to="/menu"
        className="inline-block bg-tom-thumb-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-tom-thumb-700 transition-colors"
      >
        Смотреть меню
      </Link>
    </div>
  );
}

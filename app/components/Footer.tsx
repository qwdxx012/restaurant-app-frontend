import { restaurantInfo } from "~/data/restaurant";

// Компонент подвала — отображается на всех страницах приложения
export default function Footer() {
  return (
    <footer className="bg-tom-thumb-950 text-tom-thumb-100 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Название ресторана */}
        <p className="text-lg font-bold text-white mb-2">{restaurantInfo.name}</p>
        {/* Адрес */}
        <p>{restaurantInfo.address}</p>
        {/* Телефон */}
        <p>{restaurantInfo.phone}</p>
        {/* Режим работы */}
        <p>{restaurantInfo.workHours}</p>
      </div>
    </footer>
  );
}

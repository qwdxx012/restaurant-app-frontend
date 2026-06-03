import { restaurantInfo } from "~/data/restaurant";

// Метаданные страницы «О нас»
export function meta() {
  return [{ title: "О нас | НАТК" }];
}

// Страница с информацией о ресторане
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Заголовок и описание */}
      <section className="bg-tom-thumb-50 rounded-3xl p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-tom-thumb-900 mb-4">О нас</h1>
        <p className="text-lg text-tom-thumb-700 leading-relaxed">
          {restaurantInfo.name} — ресторан с уютной атмосферой и современной
          европейской кухней. Мы готовим блюда из свежих продуктов, уделяем
          внимание качеству и создаём тёплую обстановку для гостей.
        </p>
      </section>

      {/* Преимущества и фото */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Список преимуществ */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-tom-thumb-900 mb-3">
            Наши преимущества
          </h2>
          <ul className="space-y-3 text-tom-thumb-700">
            <li>✓ Свежие ингредиенты и авторские рецепты</li>
            <li>✓ Быстрое обслуживание и внимательный персонал</li>
            <li>✓ Удобное расположение в центре города</li>
            <li>✓ Уютный интерьер и вечерняя атмосфера</li>
          </ul>
        </div>

        {/* Фото ресторана */}
        <div className="rounded-3xl bg-white p-8 shadow-sm flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
            alt="Ресторан НАТК"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Контактная информация */}
      <section className="bg-tom-thumb-800 text-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Контакты</h2>
        <div className="space-y-2 text-tom-thumb-100">
          <p>📍 {restaurantInfo.address}</p>
          <p>📞 {restaurantInfo.phone}</p>
          <p>🕐 {restaurantInfo.workHours}</p>
        </div>
      </section>
    </div>
  );
}

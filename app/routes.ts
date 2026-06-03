import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Конфигурация маршрутов: связываем URL-адреса с компонентами страниц
export default [
  index("routes/home.tsx"),                          // / — главная страница
  route("menu", "routes/menu.tsx"),                  // /menu — меню ресторана
  route("cart", "routes/cart.tsx"),                  // /cart — корзина
  route("checkout", "routes/checkout.tsx"),          // /checkout — оформление заказа
  route("login", "routes/login.tsx"),                // /login — вход и регистрация
  route("orders", "routes/orders.tsx"),              // /orders — история заказов пользователя
  route("about", "routes/about.tsx"),                // /about — о ресторане
] satisfies RouteConfig;

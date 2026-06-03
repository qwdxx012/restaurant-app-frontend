import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { AuthProvider } from "~/hooks/useAuth";
import { CartProvider } from "~/hooks/useCart";
import "./app.css";

// Корневой layout — общая оболочка для всех страниц приложения
export default function RootLayout() {
  return (
    <html lang="ru">
      <head>
        {/* Кодировка и масштаб — обязательны для корректного отображения кириллицы */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* AuthProvider хранит Firebase-сессию, CartProvider — состояние корзины */}
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {/* Шапка — всегда сверху */}
              <Header />

              {/* Основной контент — меняется при переходе между маршрутами */}
              <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
                <Outlet />
              </main>

              {/* Подвал — всегда снизу */}
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>

        {/* Восстановление позиции прокрутки при переходах */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

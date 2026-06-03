import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiLogIn, FiLogOut, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "~/hooks/useAuth";
import { useCart } from "~/hooks/useCart";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-tom-thumb-100" : "text-white hover:text-tom-thumb-200";

// Компонент шапки с навигацией, корзиной и меню профиля пользователя.
export default function Header() {
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-tom-thumb-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-6">
        {/* Логотип — ссылка на главную страницу */}
        <Link to="/" className="text-2xl font-bold">
          НАТК
        </Link>

        {/* Навигационные ссылки */}
        <div className="flex gap-6 text-lg items-center">
          <NavLink to="/" className={navLinkClass}>
            Главная
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Меню
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            О нас
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              <FiShoppingCart aria-hidden="true" />
              Корзина
              {totalCount > 0 && (
                <span className="bg-white text-tom-thumb-800 rounded-full px-2 text-sm">
                  {totalCount}
                </span>
              )}
            </span>
          </NavLink>
        </div>

        <div className="relative" ref={menuRef}>
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setIsProfileOpen((value) => !value)}
                className="inline-flex items-center gap-2 bg-tom-thumb-700 px-4 py-2 rounded-xl hover:bg-tom-thumb-600"
              >
                <FiUser aria-hidden="true" />
                {user.displayName || user.email}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-stone-700 rounded-xl shadow-lg overflow-hidden z-20">
                  <Link
                    to="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 hover:bg-tom-thumb-50"
                  >
                    История заказов
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-tom-thumb-50 inline-flex items-center gap-2"
                  >
                    <FiLogOut aria-hidden="true" />
                    Выйти
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white text-tom-thumb-800 px-4 py-2 rounded-xl hover:bg-tom-thumb-100"
            >
              <FiLogIn aria-hidden="true" />
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

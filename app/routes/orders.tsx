import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiClient } from "~/config/api";
import { useAuth } from "~/hooks/useAuth";
import type { ServerOrder } from "~/types";

export function meta() {
  return [{ title: "История заказов | НАТК" }];
}

function formatDate(value?: string) {
  if (!value) {
    return "Дата не указана";
  }

  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [orders, setOrders] = useState<ServerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        // Backend фильтрует историю по uid текущего пользователя.
        const response = await apiClient.get<ServerOrder[]>("/orders", {
          params: { userId: user.uid },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Не удалось загрузить историю заказов", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthLoading, user]);

  if (isAuthLoading || isLoading) {
    return <div className="text-center py-20 text-lg">Загрузка истории заказов...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-tom-thumb-900 mb-4">
          История заказов недоступна
        </h1>
        <p className="text-stone-600 mb-6">
          Войдите в аккаунт, чтобы увидеть свои заказы.
        </p>
        <Link
          to="/login"
          className="inline-block bg-tom-thumb-600 text-white px-6 py-3 rounded-xl hover:bg-tom-thumb-700"
        >
          Войти
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-tom-thumb-900 mb-4">
          Заказов пока нет
        </h1>
        <Link to="/menu" className="text-tom-thumb-700 hover:underline text-lg">
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-tom-thumb-900 mb-8">
        История заказов
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <article key={order.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-wrap justify-between gap-3 mb-4">
              <div>
                <h2 className="font-bold text-lg text-tom-thumb-900">
                  Заказ #{order.id}
                </h2>
                <p className="text-stone-500 text-sm">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <span className="self-start bg-tom-thumb-100 text-tom-thumb-800 px-4 py-2 rounded-full">
                {order.status}
              </span>
            </div>

            <div className="border-y border-stone-200 py-3 space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-stone-700">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-xl mt-4">
              <span>Итого:</span>
              <span className="text-tom-thumb-700">{order.total} ₽</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

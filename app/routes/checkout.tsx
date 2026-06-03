import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { apiClient } from "~/config/api";
import { useAuth } from "~/hooks/useAuth";
import { useCart } from "~/hooks/useCart";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import type { CheckoutFormData } from "~/types";

// Метаданные страницы оформления заказа
export function meta() {
  return [{ title: "Оформление заказа | НАТК" }];
}

// Страница оформления заказа с react-hook-form и отправкой данных на Flask API
export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
      paymentMethod: "card",
    },
  });

  const formValues = watch();

  useEffect(() => {
    // Если у пользователя есть имя в Firebase, подставляем его в форму.
    if (user?.displayName) {
      setValue("name", user.displayName);
    }
  }, [setValue, user]);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Нечего оформлять
        </h2>
        <Link to="/menu" className="text-tom-thumb-600 hover:underline text-lg">
          Перейти в меню
        </Link>
      </div>
    );
  }

  if (isAuthLoading) {
    return <div className="text-center py-20 text-lg">Проверка авторизации...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-tom-thumb-900 mb-4">
          Войдите, чтобы оформить заказ
        </h1>
        <p className="text-stone-600 mb-6">
          Заказ будет сохранен в истории вашего аккаунта.
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

  const onSubmit = async (data: CheckoutFormData) => {
    setServerError("");

    try {
      // Формируем заказ в формате, который ожидает Flask endpoint POST /orders.
      await apiClient.post("/orders", {
        customer: data,
        items: items.map((item) => ({
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          quantity: item.quantity,
        })),
        total: totalAmount,
        userId: user.uid,
      });

      setIsModalOpen(true);
    } catch (error) {
      setServerError("Не удалось отправить заказ. Проверьте подключение к серверу.");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-tom-thumb-900 mb-8 text-center">
        Оформление заказа
      </h1>

      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Введите имя",
              minLength: { value: 2, message: "Минимум 2 символа" },
            })}
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            placeholder="Иван Иванов"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Введите телефон",
              minLength: { value: 6, message: "Введите корректный телефон" },
            })}
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Комментарий к заказу
          </label>
          <textarea
            {...register("comment")}
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            rows={3}
            placeholder="Пожелания, аллергии..."
          />
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Способ оплаты
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="card"
                {...register("paymentMethod")}
                className="accent-tom-thumb-600"
              />
              Картой онлайн
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="cash"
                {...register("paymentMethod")}
                className="accent-tom-thumb-600"
              />
              Наличными
            </label>
          </div>
        </div>

        <div className="bg-stone-100 rounded-2xl p-5">
          <h3 className="font-bold text-stone-800 mb-3">Ваш заказ:</h3>
          {items.map((item) => (
            <div
              key={item.menuItem.id}
              className="flex justify-between text-sm text-stone-600 py-1"
            >
              <span>
                {item.menuItem.name} x {item.quantity}
              </span>
              <span>{item.menuItem.price * item.quantity} ₽</span>
            </div>
          ))}
          <div className="border-t border-stone-300 mt-3 pt-3 flex justify-between font-bold text-lg">
            <span>Итого:</span>
            <span className="text-tom-thumb-700">{totalAmount} ₽</span>
          </div>
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-700 rounded-xl px-4 py-3">
            {serverError}
          </div>
        )}

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full py-4 text-lg"
        >
          {isSubmitting ? "Отправка заказа..." : "Оформить заказ"}
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Заказ оформлен!"
      >
        <div className="text-center py-4">
          <p className="text-lg text-stone-700 mb-2">
            Спасибо, {formValues.name}!
          </p>
          <p className="text-stone-500 mb-6">
            Ваш заказ на сумму {totalAmount} ₽ принят. Мы свяжемся с вами по
            телефону {formValues.phone}.
          </p>
          <Button onClick={handleCloseModal} className="w-full">
            Перейти к истории заказов
          </Button>
        </div>
      </Modal>
    </div>
  );
}

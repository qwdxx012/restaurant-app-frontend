import { useState } from "react";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Button from "~/components/ui/Button";
import { useAuth } from "~/hooks/useAuth";

interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

export function meta() {
  return [{ title: "Вход | НАТК" }];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    setServerError("");

    try {
      if (isRegisterMode) {
        await registerUser(data.name, data.email, data.password);
      } else {
        await login(data.email, data.password);
      }
      reset();
      navigate("/menu");
    } catch (error) {
      // Ошибки Firebase показываем пользователю русским сообщением.
      setServerError("Не удалось выполнить вход. Проверьте email и пароль.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-3xl font-bold text-tom-thumb-900 mb-6 text-center">
        {isRegisterMode ? "Регистрация" : "Вход"}
      </h1>

      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        className="space-y-5"
      >
        {isRegisterMode && (
          <div>
            <label className="block text-stone-700 font-medium mb-2">
              Имя *
            </label>
            <input
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
        )}

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Введите корректный email",
              },
            })}
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            placeholder="user@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-stone-700 font-medium mb-2">
            Пароль *
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tom-thumb-400"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
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
          className="w-full"
        >
          {isSubmitting ? "Отправка..." : isRegisterMode ? "Создать аккаунт" : "Войти"}
        </Button>
      </form>

      <button
        type="button"
        onClick={() => {
          setIsRegisterMode((value) => !value);
          setServerError("");
        }}
        className="block mx-auto text-tom-thumb-700 hover:underline mt-5"
      >
        {isRegisterMode ? "Уже есть аккаунт" : "Создать аккаунт"}
      </button>

      <Link to="/menu" className="block text-center text-stone-500 hover:underline mt-3">
        Вернуться в меню
      </Link>
    </div>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";

// Интерфейс пропсов компонента Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

// Переиспользуемый компонент кнопки с двумя вариантами оформления
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  // Базовые стили, общие для всех кнопок
  const baseClass =
    "px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50";

  // Варианты оформления кнопки
  const variants = {
    primary: "bg-tom-thumb-600 text-white hover:bg-tom-thumb-700",
    secondary: "bg-stone-200 text-stone-700 hover:bg-stone-300",
  };

  return (
    <button
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

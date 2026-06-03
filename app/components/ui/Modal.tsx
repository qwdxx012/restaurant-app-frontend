import type { ReactNode } from "react";

// Интерфейс пропсов модального окна
interface ModalProps {
  isOpen: boolean;           // Состояние видимости окна
  onClose: () => void;       // Функция закрытия окна
  children: ReactNode;       // Содержимое окна
  title: string;             // Заголовок окна
}

// Компонент модального окна с затемнённым фоном
export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // Условный рендеринг: если isOpen=false — ничего не отображаем
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Затемнённый фон — закрывает окно при клике */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Само модальное окно */}
      <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Шапка окна: заголовок и кнопка закрытия */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Содержимое, переданное внутрь модального окна */}
        {children}
      </div>
    </div>
  );
}

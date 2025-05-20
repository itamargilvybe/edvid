// Toast: Global notification system for success and error messages.
"use client";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export type ToastType = {
  id: number;
  message: string;
  type: "success" | "error";
};
export const toastsAtom = atom<ToastType[]>([]);

export function useToast() {
  const [, setToasts] = useAtom(toastsAtom);
  return (message: string, type: "success" | "error" = "success") => {
    setToasts((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), message, type },
    ]);
  };
}

export default function Toast() {
  const [toasts, setToasts] = useAtom(toastsAtom);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts, setToasts]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white animate-fade-in-fast ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

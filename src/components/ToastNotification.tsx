import React from 'react';
import { CheckCircle2, Heart, X, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast, setIsCartOpen } = useShop();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] bg-[#17191D] text-white rounded-xl border border-white/15 shadow-2xl p-3.5 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-start gap-2.5 min-w-0">
        {toast.type === 'favorite' ? (
          <Heart className="w-5 h-5 fill-[#D9252A] text-[#D9252A] shrink-0 mt-0.5" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <p className="text-xs font-extrabold text-white truncate">{toast.title}</p>
          {toast.subtitle && (
            <p className="text-[11px] text-slate-300 truncate mt-0.5">{toast.subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {toast.type === 'cart' && (
          <button
            type="button"
            onClick={() => {
              dismissToast();
              setIsCartOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#D9252A] hover:bg-[#B81D22] text-white text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ver</span>
          </button>
        )}
        <button
          type="button"
          onClick={dismissToast}
          className="p-1 text-slate-400 hover:text-white cursor-pointer"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};


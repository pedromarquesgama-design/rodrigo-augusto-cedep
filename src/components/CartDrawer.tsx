import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  ArrowRight,
  Info,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import {
  buildWhatsAppQuotationMessage,
  buildWhatsAppUrl,
  CustomerQuotationNotes,
} from '../config/business';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    updateCartVariation,
    clearCart,
    totalUnits,
    uniqueProductsCount,
    setSelectedProduct,
  } = useShop();

  const [customerNotes, setCustomerNotes] = useState<CustomerQuotationNotes>({
    customerName: '',
    companyOrWorkshop: '',
    additionalNotes: '',
  });
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [copied, setCopied] = useState(false);
  const [whatsappOpenedNotice, setWhatsappOpenedNotice] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const generatedMessage = buildWhatsAppQuotationMessage(cartItems, customerNotes);
  const whatsappUrl = buildWhatsAppUrl(generatedMessage);

  const handleOpenWhatsApp = () => {
    if (cartItems.length === 0) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    // Cart is intentionally NOT cleared so the customer keeps their list if they return
    setWhatsappOpenedNotice(true);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl border-l border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#17191D] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D9252A] flex items-center justify-center shrink-0">
              <ShoppingCart className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 id="cart-drawer-title" className="text-base font-extrabold tracking-tight">
                Carrinho de Orçamento
              </h2>
              <p className="text-xs text-slate-300">
                {uniqueProductsCount === 0
                  ? 'Nenhum item selecionado'
                  : `${uniqueProductsCount} ${
                      uniqueProductsCount === 1 ? 'produto' : 'produtos'
                    } · ${totalUnits} ${totalUnits === 1 ? 'unidade' : 'unidades'}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar carrinho de orçamento"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF1FA] text-[#202C70] flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-extrabold text-[#17191D]">
              Sua lista de solicitação está vazia
            </h3>
            <p className="text-xs sm:text-sm text-[#737780] max-w-xs mt-1.5 leading-relaxed">
              Navegue pelo catálogo CEDEP Lubrificantes, selecione as variações desejadas e adicione
              os produtos aqui para consultar disponibilidade e valores via WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-6 py-3 rounded-lg bg-[#202C70] hover:bg-[#182157] text-white font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explorar Catálogo de Produtos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Cart Items & Summary */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-5">
              {/* Top Action Row: Continue Shopping & Clear Cart */}
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="font-bold text-[#202C70] hover:underline cursor-pointer"
                >
                  ← Continuar adicionando produtos
                </button>

                {!confirmClear ? (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="inline-flex items-center gap-1 font-bold text-[#737780] hover:text-[#D9252A] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Limpar carrinho</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#D9252A] font-bold">Confirmar limpeza?</span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setConfirmClear(false);
                        setWhatsappOpenedNotice(false);
                      }}
                      className="px-2 py-0.5 rounded bg-[#D9252A] text-white font-bold cursor-pointer"
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-0.5 rounded bg-slate-200 text-[#17191D] font-bold cursor-pointer"
                    >
                      Não
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex gap-3.5 items-start"
                  >
                    {/* Thumbnail */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(item.product);
                      }}
                      className="rounded-lg border border-[#E5E7EB] overflow-hidden shrink-0 cursor-pointer"
                      aria-label={`Ver detalhes de ${item.product.brand} ${item.product.name}`}
                    >
                      <ProductVisual
                        product={item.product}
                        selectedVariation={item.selectedVariation}
                        selectedVariationLabel={item.selectedVariation.label}
                        size="sm"
                      />
                    </button>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded bg-[#EEF1FA] text-[#202C70] text-[10px] font-extrabold uppercase">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-[#17191D] mt-0.5 leading-snug">
                            {item.product.name}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1.5 rounded-md text-[#737780] hover:text-[#D9252A] hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          aria-label={`Remover ${item.product.brand} ${item.product.name} do carrinho`}
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Variation Switcher or Badge */}
                      <div className="mt-2">
                        {item.product.variations.length > 1 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-[#737780]">
                              Variação:
                            </span>
                            <select
                              value={item.selectedVariation.id}
                              onChange={(e) => {
                                const nextVar = item.product.variations.find(
                                  (v) => v.id === e.target.value
                                );
                                if (nextVar) {
                                  updateCartVariation(item.cartItemId, nextVar);
                                }
                              }}
                              aria-label={`Alterar variação de ${item.product.name}`}
                              className="h-7 px-2 rounded border border-[#E5E7EB] bg-[#F4F5F7] text-[11px] font-bold text-[#17191D] focus:border-[#202C70] focus:outline-none cursor-pointer max-w-[200px]"
                            >
                              {item.product.variations.map((v) => (
                                <option key={v.id} value={v.id}>
                                  {v.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <span className="inline-block text-[11px] font-semibold text-[#737780]">
                            Especificação:{' '}
                            <strong className="text-[#17191D]">
                              {item.selectedVariation.label}
                            </strong>
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-[#E5E7EB] bg-[#F4F5F7] p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-md hover:bg-white text-[#17191D] flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-9 text-center font-mono text-xs font-extrabold text-[#17191D]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-md hover:bg-white text-[#17191D] flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-[11px] font-mono font-bold text-[#202C70]">
                          {item.quantity} {item.quantity === 1 ? 'unidade' : 'unidades'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* ===============================================================
                  RESUMO DA SOLICITAÇÃO (Section 11 Requirement)
                 =============================================================== */}
              <div className="p-4 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB] space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#202C70] border-b border-[#E5E7EB] pb-2">
                  RESUMO DA SOLICITAÇÃO
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="block text-[11px] text-[#737780]">Produtos diferentes</span>
                    <span className="font-mono text-base font-extrabold text-[#17191D]">
                      {uniqueProductsCount} {uniqueProductsCount === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="block text-[11px] text-[#737780]">Total de unidades</span>
                    <span className="font-mono text-base font-extrabold text-[#202C70]">
                      {totalUnits} {totalUnits === 1 ? 'un.' : 'un.'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#737780] space-y-1">
                  <span className="font-bold text-[#17191D] block">Itens selecionados:</span>
                  <ul className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar pr-1">
                    {cartItems.map((item) => (
                      <li key={`sum-${item.cartItemId}`} className="flex justify-between gap-2">
                        <span className="truncate">
                          • {item.product.brand} {item.product.name} ({item.selectedVariation.label})
                        </span>
                        <strong className="font-mono text-[#17191D] shrink-0">
                          {item.quantity}x
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional Customer Context Accordion */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#17191D] hover:bg-[#F4F5F7] transition-colors cursor-pointer"
                >
                  <span>Identificação ou Observações (Opcional)</span>
                  {showOptionalFields ? (
                    <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
                  )}
                </button>

                {showOptionalFields && (
                  <div className="p-4 pt-2 border-t border-[#E5E7EB] space-y-2.5 bg-[#F4F5F7]/50">
                    <div>
                      <label className="block text-[11px] font-bold text-[#17191D] mb-1">
                        Seu Nome (Opcional)
                      </label>
                      <input
                        type="text"
                        value={customerNotes.customerName}
                        onChange={(e) =>
                          setCustomerNotes((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                        placeholder="Ex: João Silva"
                        className="w-full h-9 px-3 rounded-lg border border-[#E5E7EB] bg-white text-xs text-[#17191D] focus:border-[#202C70] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#17191D] mb-1">
                        Oficina / Empresa (Opcional)
                      </label>
                      <input
                        type="text"
                        value={customerNotes.companyOrWorkshop}
                        onChange={(e) =>
                          setCustomerNotes((prev) => ({
                            ...prev,
                            companyOrWorkshop: e.target.value,
                          }))
                        }
                        placeholder="Ex: Auto Center / Frota"
                        className="w-full h-9 px-3 rounded-lg border border-[#E5E7EB] bg-white text-xs text-[#17191D] focus:border-[#202C70] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#17191D] mb-1">
                        Modelo do Veículo ou Observação (Opcional)
                      </label>
                      <input
                        type="text"
                        value={customerNotes.additionalNotes}
                        onChange={(e) =>
                          setCustomerNotes((prev) => ({
                            ...prev,
                            additionalNotes: e.target.value,
                          }))
                        }
                        placeholder="Ex: Informar veículo para filtro ou kit revisão"
                        className="w-full h-9 px-3 rounded-lg border border-[#E5E7EB] bg-white text-xs text-[#17191D] focus:border-[#202C70] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic WhatsApp Message Preview Accordion */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                <div className="px-4 py-2.5 flex items-center justify-between bg-[#F4F5F7]/70">
                  <button
                    type="button"
                    onClick={() => setShowMessagePreview(!showMessagePreview)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#202C70] hover:underline cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>
                      {showMessagePreview
                        ? 'Ocultar mensagem automática'
                        : 'Ver mensagem que será enviada no WhatsApp'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#E5E7EB] hover:border-[#202C70] text-[11px] font-bold text-[#17191D] cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                        <span className="text-emerald-700">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>

                {showMessagePreview && (
                  <pre className="p-3.5 text-[11px] font-mono text-[#17191D] bg-slate-50 whitespace-pre-wrap leading-relaxed border-t border-[#E5E7EB] max-h-48 overflow-y-auto custom-scrollbar">
                    {generatedMessage}
                  </pre>
                )}
              </div>

              {/* Honest Post-Click Notice */}
              {whatsappOpenedNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <p className="font-extrabold text-emerald-900">
                    WhatsApp aberto com sua lista de cotação!
                  </p>
                  <p className="leading-relaxed">
                    Lembre-se: abrir o WhatsApp não envia a mensagem automaticamente nem confirma o
                    pedido. Clique em <strong>Enviar</strong> dentro da conversa do WhatsApp para
                    que a equipe CEDEP receba sua solicitação. Seus itens continuam salvos aqui no
                    carrinho.
                  </p>
                </div>
              )}
            </div>

            {/* Sticky Bottom Quotation CTA Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E5E7EB] space-y-2.5 shrink-0">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg shadow-emerald-600/20 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase tracking-wider">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>VERIFICAR DISPONIBILIDADE</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider mt-0.5">
                  SOLICITAR ORÇAMENTO PELO WHATSAPP
                </span>
              </button>

              <div className="flex items-start gap-2 text-[11px] text-[#737780] leading-snug px-1">
                <Info className="w-3.5 h-3.5 text-[#202C70] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Sem pagamento online: você será direcionado ao WhatsApp com os produtos e
                  quantidades preenchidos para atendimento personalizado.
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


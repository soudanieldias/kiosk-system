"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SIDEBAR_DATA, PRODUCTS } from "../../../../data/data";
import { getKioskBySlug } from "../../../../data/kiosks";
import ProductModal from "@/components/ProductModal";
import FilteredSidebar from "@/components/FilteredSidebar";

type CartItem = { id: string; title: string; qty: number; excludedIngredients?: string[] };
type Product = (typeof PRODUCTS)[string][number];

export default function KioskPage() {
  const params = useParams();
  const kioskSlug = params.id as string;
  const kiosk = getKioskBySlug(kioskSlug);

  const [step, setStep] = useState<'form' | 'shopping'>('form');
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<typeof SIDEBAR_DATA>([]);

  useEffect(() => {
    if (!kiosk) return;

    // Filtra categorias disponíveis para este quiosque
    const filtered = SIDEBAR_DATA.filter(
      (cat) => !cat.id || kiosk.menuCategories?.includes(cat.id)
    );
    setFilteredCategories(filtered);

    // Define a primeira categoria como padrão
    if (filtered.length > 1) {
      setSelectedCategory(filtered[1]?.id || null);
    }

    function onCategory(e: Event) {
      const ev = e as CustomEvent<{ id: string; title: string }>;
      if (ev?.detail?.id) setSelectedCategory(ev.detail.id);
    }

    window.addEventListener("categorySelected", onCategory as EventListener);
    return () => window.removeEventListener("categorySelected", onCategory as EventListener);
  }, [kiosk]);

  if (!kiosk) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Quiosque não encontrado</h1>
          <p>URL: {kioskSlug}</p>
        </div>
      </div>
    );
  }

  function startOrder() {
    localStorage.setItem("orderStarted", "true");
    localStorage.setItem("orderName", name);
    if (cpf) localStorage.setItem("orderCPF", cpf);
    localStorage.setItem("selectedKiosk", kiosk.id);
    setStep('shopping');
    window.dispatchEvent(new CustomEvent("orderStarted", { detail: true }));
  }

  function addToCart(id: string, title: string, qty = 1, excludedIngredients: string[] = []) {
    setCart((s) => {
      const found = s.find((i) => i.id === id);
      if (found) return s.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...s, { id, title, qty, excludedIngredients }];
    });
  }

  function finalize() {
    const order = {
      kiosk: kiosk.name,
      name: name || localStorage.getItem("orderName"),
      cpf: cpf || localStorage.getItem("orderCPF"),
      cart,
    };
    console.log("Finalizando pedido", order);
    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("orderStarted");
    setStep('form');
    setCart([]);
    setName("");
    setCpf("");
    window.dispatchEvent(new CustomEvent("orderStarted", { detail: false }));
    alert("Pedido finalizado — prossiga com o pagamento (simulado)");
  }

  // Tela de preenchimento de dados (nome e CPF)
  if (step === 'form') {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: kiosk.color }}>
            {kiosk.name}
          </h1>
          {kiosk.location && <p className="text-sm text-gray-600 mb-4">{kiosk.location}</p>}
          <h2 className="text-lg font-semibold mb-4">Iniciar seu pedido</h2>
          <label className="block mb-2 font-semibold">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Seu nome"
          />
          <label className="block mb-2 font-semibold">CPF (opcional)</label>
          <input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full mb-6 p-2 border rounded"
            placeholder="000.000.000-00"
          />
          <button
            onClick={startOrder}
            className="w-full py-3 rounded text-white font-bold"
            style={{ backgroundColor: kiosk.color || '#DA291C' }}
          >
            Iniciar pedido
          </button>
        </div>
      </div>
    );
  }

  // Tela de compras (produtos e carrinho)
  return (
    <div className="flex min-h-screen bg-white">
      <FilteredSidebar
        categories={filteredCategories}
        onCategorySelect={(id) => setSelectedCategory(id)}
        color={kiosk.color}
      />
      <main className="flex-1 p-6 text-black">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedCategory
            ? `Categoria: ${filteredCategories.find((c) => c.id === selectedCategory)?.title}`
            : 'Escolha uma categoria'}
        </h2>
        <div className="grid grid-cols-5 gap-6">
          {(selectedCategory ? PRODUCTS[selectedCategory] ?? [] : []).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all aspect-square"
            >
              {item.image && (
                <img
                  src={`/images/products/${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(productId, qty, excludedIngredients) => {
            const product = (selectedCategory ? PRODUCTS[selectedCategory] ?? [] : []).find(
              (p) => p.id === productId
            );
            if (product) {
              addToCart(productId, product.title, qty, excludedIngredients);
            }
          }}
        />

        <div className="fixed right-6 bottom-6">
          <button
            onClick={finalize}
            className="py-3 px-5 rounded-lg font-bold shadow-lg text-yellow-400"
            style={{ backgroundColor: '#000' }}
          >
            Finalizar Pedido ({cart.reduce((s, i) => s + i.qty, 0)})
          </button>
        </div>
      </main>
    </div>
  );
}

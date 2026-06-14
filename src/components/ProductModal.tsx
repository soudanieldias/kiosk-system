"use client";

import { useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  ingredients?: string[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (productId: string, qty: number, excludedIngredients: string[]) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [excluded, setExcluded] = useState<Set<string>>(new Set());

  if (!product) return null;

  function toggleIngredient(ing: string) {
    const newExcluded = new Set(excluded);
    if (newExcluded.has(ing)) {
      newExcluded.delete(ing);
    } else {
      newExcluded.add(ing);
    }
    setExcluded(newExcluded);
  }

  function handleAdd() {
    onAddToCart(product.id, qty, Array.from(excluded));
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-96 p-6 max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">{product.title}</h2>

        {product.image && (
          <img
            src={`/images/products/${product.image}`}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div className="mb-4">
          <p className="text-lg font-semibold text-black">R$ {product.price.toFixed(2)}</p>
        </div>

        {product.ingredients && product.ingredients.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-black mb-2">Ingredientes (desmarque os que não quer)</p>
            <div className="space-y-2">
              {product.ingredients.map((ing) => (
                <label key={ing} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!excluded.has(ing)}
                    onChange={() => toggleIngredient(ing)}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-black">{ing}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-black font-semibold mb-2">Quantidade</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              -
            </button>
            <span className="text-black text-lg w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded bg-gray-300 text-black font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-2 rounded bg-[#DA291C] text-white font-semibold"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Category {
  id: string;
  title: string;
  image?: string;
}

interface FilteredSidebarProps {
  categories: Category[];
  onCategorySelect: (id: string, title: string) => void;
  color?: string;
}

export default function FilteredSidebar({ categories, onCategorySelect, color = "#DA291C" }: FilteredSidebarProps) {
  const [active, setActive] = useState<string>(categories[0]?.id || "");

  return (
    <aside className="w-72 h-screen text-white flex flex-col items-center py-6" style={{ backgroundColor: color }}>
      <nav className="w-full px-4">
        <ul className="space-y-4">
          {categories.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActive(item.id);
                  onCategorySelect(item.id, item.title);
                  window.dispatchEvent(
                    new CustomEvent("categorySelected", { detail: { id: item.id, title: item.title } })
                  );
                }}
                className={`w-full text-left flex items-center gap-4 py-3 px-4 rounded-lg shadow-inner transition-transform transform active:scale-95 ${active === item.id ? "bg-yellow-400 text-black font-bold" : "bg-transparent text-white/95 hover:bg-yellow-300/30"
                  }`}
              >
                {item.image ? (
                  <img
                    src={`/images/sidebar/${item.image}`}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-2xl">🔘</span>
                )}
                <span className="text-lg">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

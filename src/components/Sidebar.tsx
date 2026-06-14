"use client";

import { useState } from "react";
import { SIDEBAR_DATA } from "../../data/data";

export default function Sidebar() {
  const [active, setActive] = useState<string>("1");

  return (
    <aside className="w-72 h-screen bg-[#DA291C] text-white flex flex-col items-center py-6">
      <nav className="w-full px-4">
        <ul className="space-y-4">
          {SIDEBAR_DATA.slice(1).map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActive(item.id);
                  window.dispatchEvent(new CustomEvent("categorySelected", { detail: { id: item.id, title: item.title } }));
                }}
                className={`w-full text-left flex items-center gap-4 py-3 px-4 rounded-lg shadow-inner transition-transform transform active:scale-95 ${active === item.id ? "bg-yellow-400 text-[#DA291C] font-bold" : "bg-transparent text-white/95 hover:bg-yellow-300/30"
                  }`}
              >
                {item.image ? (
                  <img src={`/images/sidebar/${item.image}`} alt={item.title} className="w-12 h-12 object-cover rounded" />
                ) : (
                  <span className="text-2xl">{item.image ?? "🔘"}</span>
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

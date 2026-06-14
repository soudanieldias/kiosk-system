"use client";

import { KIOSKS } from "../../data/kiosks";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-2 text-center">McKiosk</h1>
        <p className="text-center text-gray-600 mb-8">Escolha o quiosque para fazer seu pedido</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KIOSKS.map((kiosk) => (
            <Link
              key={kiosk.id}
              href={`/kiosk/${kiosk.slug}`}
              className="rounded-lg shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all text-white text-center font-semibold"
              style={{ backgroundColor: kiosk.color || '#DA291C' }}
            >
              <div className="text-3xl mb-2">{kiosk.id.includes('churrasquinho') ? '🍖' : kiosk.id.includes('porcoes') ? '🍽️' : '🥘'}</div>
              <div className="text-2xl mb-2">{kiosk.name}</div>
              {kiosk.location && <div className="text-sm opacity-80">{kiosk.location}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

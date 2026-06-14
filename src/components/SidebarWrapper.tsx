"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const v = localStorage.getItem("orderStarted");
    setShow(v === "true");

    function onStorage(e: StorageEvent) {
      if (e.key === "orderStarted") setShow(e.newValue === "true");
    }

    function onCustom(e: Event) {
      const ev = e as CustomEvent<boolean>;
      if (typeof ev.detail === "boolean") setShow(Boolean(ev.detail));
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("orderStarted", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("orderStarted", onCustom as EventListener);
    };
  }, []);

  if (!show) return null;
  return <Sidebar />;
}

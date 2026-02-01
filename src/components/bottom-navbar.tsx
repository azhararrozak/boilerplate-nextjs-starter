"use client";

import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "mempelai", label: "Mempelai", icon: <Users size={20} /> },
  { id: "acara", label: "Acara", icon: <Calendar size={20} /> },
  { id: "rsvp", label: "RSVP", icon: <MessageSquare size={20} /> },
  { id: "lainnya", label: "Lainnya", icon: <MoreHorizontal size={20} /> },
];

export default function BottomNavbar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavClick = (id: string) => {
    setActiveItem(id);
    // Scroll to section if it exists
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2">
      <div className="backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 rounded-full shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 px-4 py-3">
        <ul className="flex items-center justify-between">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                  activeItem === item.id
                    ? "bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/30"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:scale-105"
                }`}
              >
                <span className="transition-transform">{item.icon}</span>
                <span className="text-[10px] font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

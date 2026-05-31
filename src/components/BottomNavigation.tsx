/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../context/AppContext";
import { Home, BookOpen, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, cart } = useApp();

  const totalCartItems = cart.reduce((sum, c) => sum + c.quantity, 0);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "menu", label: "Menu", icon: BookOpen },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: totalCartItems },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-6 max-w-md mx-auto">
      <div 
        id="app-bottom-nav"
        className="bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] rounded-2xl flex items-center justify-around py-3 px-2 relative"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 relative text-xs font-medium cursor-pointer transition-colors outline-none focus:outline-none focus-visible:scale-110"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBottomTabIndicator"
                  className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-all duration-300 ${
                    isActive ? "text-orange-500 scale-110" : "text-gray-400"
                  }`}
                />
                
                {item.badge !== undefined && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-3 bg-red-500 text-white font-mono text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-black"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </div>

              <span
                className={`mt-1 text-[10px] sm:text-xs transition-all duration-300 ${
                  isActive ? "text-orange-400 font-bold tracking-normal" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

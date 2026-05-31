/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  User, 
  MapPin, 
  Phone, 
  Heart, 
  Settings, 
  Calendar, 
  ExternalLink,
  MessageCircle,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

export const ProfileView: React.FC = () => {
  const { 
    menuItems, 
    favorites, 
    orders, 
    bookings, 
    setAdminMode,
    addToCart,
    setActiveTab
  } = useApp();

  // Filter favorite food items
  const favoredItems = menuItems.filter((item) => favorites.includes(item.id));

  const handeDialCall = () => {
    window.open("tel:07643097915", "_blank");
  };

  const handleSupportChat = () => {
    const message = encodeURIComponent("Hello Spicy Bawarchi, I need help regarding my table order or reservation status.");
    window.open(`https://wa.me/917643097915?text=${message}`, "_blank");
  };

  return (
    <div className="pb-28 px-4 pt-4">
      {/* View Header */}
      <h1 className="text-xl font-black text-white uppercase tracking-wider flex items-center mb-5">
        <User className="text-orange-500 mr-2" size={20} />
        <span>About Restaurant</span>
      </h1>

      {/* Premium Restaurant Identification Card */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-3xl border border-white/5 p-5 text-left relative shadow-xl overflow-hidden mb-5">
        <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
        
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center border border-orange-500 shadow-md shrink-0">
            <span className="text-xl font-black text-black">
              SB
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black text-white flex items-center leading-tight">
              Spicy Bawarchi
              <span className="text-[8px] bg-amber-500/15 text-amber-400 font-extrabold px-1.5 py-0.5 rounded ml-2 font-mono uppercase tracking-wider">ESTD 2024</span>
            </h3>
            
            <p className="text-xs text-stone-300 mt-2 font-medium leading-relaxed flex items-start">
              <MapPin size={13} className="mr-1.5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                Near Forbesganj College Flyover, In Front of Sant Nirankari Satsang Bhawan, Forbesganj, Bihar 854318
              </span>
            </p>
          </div>
        </div>

        {/* Dynamic Eater Statistics Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-3.5 border-t border-white/5 text-center">
          <div className="bg-stone-900/60 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-stone-500 font-mono uppercase block">Orders</span>
            <span className="text-sm font-black font-mono text-white mt-0.5 block">{orders.length}</span>
          </div>
          <div className="bg-stone-900/60 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-stone-500 font-mono uppercase block">Reserved</span>
            <span className="text-sm font-black font-mono text-white mt-0.5 block">{bookings.length}</span>
          </div>
          <div className="bg-stone-900/60 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-stone-400 font-mono uppercase block">Favorites</span>
            <span className="text-sm font-black font-mono text-orange-400 mt-0.5 block">{favorites.length}</span>
          </div>
        </div>
      </div>

      {/* Hidden / Admin Dashboard Trigger Option (Owner WOW effect!) */}
      <div className="mb-5">
        <button
          onClick={() => setAdminMode(true)}
          id="profile-btn-open-admin"
          className="w-full py-4 px-4 bg-stone-950 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-between hover:border-amber-400/50 transition-all cursor-pointer shadow-lg active:scale-98"
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 font-bold">
              👑
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 font-display">SPICY BAWARCHI HUB</h4>
              <p className="text-[10px] text-stone-400">Open Restaurant Management System &amp; Dashboard</p>
            </div>
          </div>
          <Settings size={15} className="animate-spin-slow text-amber-500" />
        </button>
      </div>

      {/* Saved / Favorite Foods Selection */}
      <div className="mb-5 text-left">
        <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest mb-3.5 flex items-center">
          <Heart size={12} className="text-red-500 mr-1.5" />
          <span>Favored Delicacies ({favoredItems.length})</span>
        </h2>

        {favoredItems.length === 0 ? (
          <div className="bg-stone-950 border border-white/5 rounded-2xl p-6 text-center space-y-2">
            <p className="text-xs text-stone-400">No favorite dishes flagged yet.</p>
            <p className="text-[10.5px] text-zinc-550 leading-relaxed max-w-[200px] mx-auto">
              Tap the heart button on menu items to keep catalog shortcuts here for quick re-orders.
            </p>
            <button
              onClick={() => setActiveTab("menu")}
              className="mt-1 text-xs text-orange-500 font-bold hover:underline"
            >
              Browse Menu Card
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {favoredItems.map((food) => (
              <div
                key={food.id}
                className="bg-stone-950 border border-white/5 p-3 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-10 w-10 rounded-lg object-cover bg-stone-900 border border-white/5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{food.name}</h4>
                    <span className="text-[10.5px] font-mono text-amber-400 font-bold block mt-0.5">₹{food.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(food, 1);
                    alert(`Added 1x ${food.name} to your Cart!`);
                  }}
                  className="bg-orange-600 text-black font-extrabold text-[9.5px] uppercase px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                >
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Support options */}
      <div className="bg-stone-950 rounded-2xl border border-white/5 p-4 text-left space-y-3">
        <h3 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-2">
          Restaurant Helplines
        </h3>

        <div className="space-y-3">
          <button
            onClick={handeDialCall}
            className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-850 rounded-xl flex items-center justify-between text-xs text-stone-300 font-bold border border-white/5"
          >
            <span className="flex items-center">
              <Phone size={13} className="text-amber-500 mr-2" />
              Direct Dial Call Team
            </span>
            <ExternalLink size={12} className="text-zinc-500" />
          </button>

          <button
            onClick={handleSupportChat}
            className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-850 rounded-xl flex items-center justify-between text-xs text-stone-300 font-bold border border-white/5"
          >
            <span className="flex items-center">
              <MessageCircle size={13} className="text-[#00e676] mr-2" />
              Live WhatsApp Helpdesk
            </span>
            <ExternalLink size={12} className="text-zinc-500" />
          </button>
          
          <div className="text-[10px] text-zinc-650 text-center pt-2 italic">
            Spicy Bawarchi, Forbesganj, Bihar 854318, India
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Utensils, 
  MessageSquare, 
  Star, 
  ChevronRight, 
  Clock, 
  Heart,
  TrendingUp,
  Award,
  ChefHat
} from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  onOpenBooking: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenBooking }) => {
  const { menuItems, offers, reviews, favorites, toggleFavorite, addToCart, setActiveTab } = useApp();
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  // Quick category buttons mapping to specific categories
  const categoriesList = [
    { name: "Vegetables", icon: "🥦" },
    { name: "Special Thali", icon: "🍱" },
    { name: "Momos", icon: "🥟" },
    { name: "Noodles", icon: "🍜" },
    { name: "Rice", icon: "🍚" },
    { name: "Dal", icon: "🍲" },
    { name: "Roti & Naan", icon: "🫓" },
    { name: "Beverages", icon: "🥤" },
  ];

  // Filters for featured, popular and today's specials
  const popularDishes = menuItems.filter(item => item.isPopular);
  const trendingDishes = menuItems.filter(item => item.isTrending);
  const todaySpecials = menuItems.filter(item => item.isTodaySpecial);

  const handleCategoryClick = (categoryName: string) => {
    // Save category filter inside local storage or query state, then toggle menu tab
    localStorage.setItem("selected_category", categoryName);
    setActiveTab("menu");
  };

  // WhatsApp Order
  const handleWhatsAppChat = () => {
    const phoneNumber = "917643097915"; // Clean Indian country code + 076430 97915
    const message = encodeURIComponent(
      "Hello SPICY BAWARCHI, I am browsing your premium food ordering web platform and would like to ask a couple of questions about table booking or ordering today! Please guide me."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Maps Link
  const handleGoogleMaps = () => {
    window.open(
      "https://maps.google.com/?q=Spicy+Bawarchi+Forbesganj+Bihar",
      "_blank"
    );
  };

  return (
    <div className="pb-24">
      {/* Premium Luxury Logo Header */}
      <div className="relative pt-6 px-4 pb-2 mb-4 bg-gradient-to-b from-orange-600/10 to-transparent rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-stone-900 via-stone-950 to-black flex items-center justify-center border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.45)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-transparent to-amber-500/20" />
              <ChefHat size={22} className="text-orange-500 drop-shadow-[0_2px_8px_rgba(249,115,22,0.6)] relative z-10 animate-bounce duration-1000" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(239,68,68,0.25)] flex items-center font-display">
                SPICY BAWARCHI
              </h1>
              <p className="text-[10px] font-medium text-amber-400 italic tracking-wide">
                &ldquo;Every Bite Tells A Story&rdquo;
              </p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab("profile")}
            className="h-9 w-9 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center hover:border-orange-500 transition-all cursor-pointer"
          >
            <span className="text-xs">👤</span>
          </button>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={onOpenBooking}
            id="home-btn-part-booking"
            className="flex items-center justify-center space-x-2 py-3 px-2 bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/20 rounded-xl hover:border-amber-400/50 transition-all text-xs font-semibold text-amber-400 group shadow-lg"
          >
            <Calendar size={14} className="group-hover:scale-110 transition-transform" />
            <span>Party Booking</span>
          </button>
          
          <button
            onClick={handleWhatsAppChat}
            id="home-btn-whatsapp"
            className="flex items-center justify-center space-x-2 py-3 px-2 bg-gradient-to-r from-[#01c853]/15 to-[#01c853]/5 border border-[#01c853]/30 rounded-xl hover:bg-[#00e676]/20 transition-all text-xs font-semibold text-[#00e676] shadow-lg"
          >
            <span className="text-sm">💬</span>
            <span>WhatsApp Order</span>
          </button>
        </div>
      </div>

      {/* Special Offers Carousel Banner - Flipkart Style */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center justify-between">
          <span>Exclusive Special Offers</span>
          <span className="text-xs text-orange-500 font-mono">Grab them now</span>
        </h2>
        
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-stone-950 shadow-2xl">
          <div className="absolute top-2 right-2 z-10 bg-black/75 backdrop-blur border border-amber-500/30 text-[9px] text-amber-400 font-bold px-2 py-0.5 rounded-full font-mono shadow">
            CODE: {offers[activeOfferIndex].code}
          </div>
          
          <div className="relative h-32 flex items-center overflow-hidden">
            {/* Banner Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-[1] pointer-events-none" />
            <img 
              src={offers[activeOfferIndex].image} 
              alt={offers[activeOfferIndex].title} 
              className="absolute inset-x-0 inset-y-0 h-full w-full object-cover opacity-60 scale-105"
            />
            
            {/* Contents */}
            <div className="relative z-[2] pl-4 pr-12 text-left">
              <span className="inline-block bg-orange-600 text-black font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded mb-1">
                LIMITED OFFER ({offers[activeOfferIndex].discountPercent}% OFF)
              </span>
              <h3 className="text-base font-black text-white tracking-wide">{offers[activeOfferIndex].title}</h3>
              <p className="text-xs text-stone-300 mt-1 max-w-[210px] leading-tight">
                {offers[activeOfferIndex].description}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 right-2 flex space-x-1.5 z-10">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveOfferIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeOfferIndex === idx ? "w-4 bg-orange-500" : "w-1.5 bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flipkart Styled Quick Categories Chips */}
      <div className="mb-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase flex items-center">
            <Utensils size={14} className="text-orange-500 mr-1.5 animate-pulse" />
            <span>Quick Food categories</span>
          </h2>
        </div>
        <div className="flex space-x-2.5 overflow-x-auto px-4 pb-2 scrollbar-none snap-x">
          {categoriesList.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="snap-center shrink-0 flex flex-col items-center py-2.5 px-4 bg-stone-900 border border-white/5 rounded-2xl hover:border-orange-500/40 transition-all text-xs font-semibold group cursor-pointer focus:scale-95"
            >
              <div className="text-xl mb-1 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] group-hover:scale-125 duration-300 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[10px] text-stone-300 group-hover:text-amber-400 tracking-wider whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Special Section - Highlight */}
      {todaySpecials.length > 0 && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase flex items-center">
              <Sparkles size={14} className="text-amber-400 mr-1.5" />
              <span>Today&rsquo;s Royal Specials</span>
            </h2>
            <button 
              onClick={() => setActiveTab("menu")}
              className="text-orange-400 text-xs font-bold font-mono tracking-wide flex items-center hover:underline"
            >
              See All <ChevronRight size={12} className="ml-0.5" />
            </button>
          </div>

          <div className="relative bg-gradient-to-r from-amber-950/20 via-stone-900 to-black/60 border border-amber-500/20 p-4 rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow">
              HOT GOURMET
            </div>
            
            <div className="flex space-x-4 items-center">
              <img 
                src={todaySpecials[0].image} 
                alt={todaySpecials[0].name}
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-orange-500 border border-black"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-left">
                <span className={`text-[10.5px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                  todaySpecials[0].isVeg ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" : "bg-red-950/40 text-red-400 border border-red-500/20"
                }`}>
                  {todaySpecials[0].isVeg ? "🟢 Pure Veg" : "🔴 Non-Veg"}
                </span>
                <h3 className="text-base font-black text-white mt-1 leading-tight">{todaySpecials[0].name}</h3>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 leading-snug">
                  {todaySpecials[0].description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-400 font-extrabold font-mono text-base">₹{todaySpecials[0].price}</span>
                  <button
                    onClick={() => addToCart(todaySpecials[0])}
                    className="bg-orange-600 text-black font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg active:scale-95 transition-transform cursor-pointer hover:bg-orange-500"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Food Slider - Swiggy Style */}
      <div className="mb-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase flex items-center">
            <TrendingUp size={14} className="text-orange-500 mr-1.5" />
            <span>Featured Food Creations</span>
          </h2>
        </div>
        <div className="flex space-x-4 overflow-x-auto px-4 pb-2 scrollbar-none snap-x">
          {trendingDishes.slice(0, 5).map((food) => {
            const isFav = favorites.includes(food.id);
            return (
              <div
                key={food.id}
                className="snap-center shrink-0 w-44 bg-gradient-to-b from-stone-900 to-stone-950 border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-orange-500/30 transition-all flex flex-col justify-between"
              >
                <div className="relative h-28 w-full group overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover group-hover:scale-110 duration-300 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur rounded-md p-0.5 text-xs">
                    {food.isVeg ? "🟢" : "🔴"}
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(food.id)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105"
                  >
                    <Heart size={14} className={isFav ? "fill-red-500 text-red-500" : "text-white"} />
                  </button>
                  
                  <div className="absolute bottom-2 left-2 bg-amber-500 text-black font-black font-mono text-[9px] px-1.5 py-0.5 rounded-md flex items-center">
                    <Star size={8} className="fill-black mr-0.5" /> {food.rating}
                  </div>
                </div>

                <div className="p-3 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black text-white line-clamp-1 truncate tracking-wide">{food.name}</h3>
                    <p className="text-[10px] text-stone-400 mt-1 line-clamp-1 leading-none">{food.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-bold text-amber-400 font-mono">₹{food.price}</span>
                    <button
                      onClick={() => addToCart(food)}
                      className="bg-stone-850 hover:bg-orange-600 hover:text-black border border-white/10 hover:border-transparent text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Dishes Section - Grid */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase flex items-center">
            <Award size={14} className="text-amber-500 mr-1.5" />
            <span>Popular Delicacies</span>
          </h2>
          <button 
            onClick={() => setActiveTab("menu")}
            className="text-orange-400 text-xs font-bold font-mono tracking-wide flex items-center hover:underline"
          >
            See Menu <ChevronRight size={12} className="ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularDishes.slice(0, 4).map((food) => {
            const isFav = favorites.includes(food.id);
            return (
              <div 
                key={food.id}
                className="bg-stone-900/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden p-2.5 text-left relative flex flex-col justify-between h-48"
              >
                <div className="relative h-24 w-full rounded-xl overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => toggleFavorite(food.id)}
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center border border-white/10"
                  >
                    <Heart size={10} className={isFav ? "fill-red-500 text-red-500" : "text-white"} />
                  </button>
                </div>
                
                <h3 className="text-xs font-bold text-white line-clamp-1 mt-2 tracking-wide leading-tight">{food.name}</h3>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold font-mono text-amber-400">₹{food.price}</span>
                  <button
                    onClick={() => addToCart(food)}
                    className="text-[10px] font-bold bg-orange-600 text-black px-2 py-1 rounded"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ambiance, Location & Contact Details */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center">
          <MapPin size={14} className="text-orange-500 mr-1.5" />
          <span>Find Us on the Map</span>
        </h2>
        
        <div className="bg-stone-900 border border-white/5 rounded-2xl p-4 text-left relative overflow-hidden shadow-xl">
          <div className="flex items-start space-x-3">
            <div className="h-9 w-9 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-orange-500 animate-bounce" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xs font-extrabold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 font-display">SPICY BAWARCHI</h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Near Forbesganj College Flyover,<br />
                In Front of Sant Nirankari Satsang Bhawan,<br />
                Forbesganj, Bihar 854318
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <a 
                  href="tel:07643097915"
                  className="flex items-center space-x-1.5 py-1.5 px-3 bg-stone-950 border border-amber-500/10 hover:border-amber-400/30 rounded-lg text-xs font-bold text-amber-400"
                >
                  <Phone size={12} />
                  <span>Call 076430 97915</span>
                </a>
                
                <button
                  onClick={handleGoogleMaps}
                  className="flex items-center space-x-1.5 py-1.5 px-3 bg-stone-950 border border-blue-500/20 rounded-lg text-xs font-semibold text-blue-400"
                >
                  <span>🗺️</span>
                  <span>Google Map Directions</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Custom Stylized Minimal Google Map Canvas Mockup */}
          <div className="mt-4 h-24 rounded-xl relative overflow-hidden border border-white/5 bg-zinc-950 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#2c2c2c_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Map Roads & Rivers Mockup visual element */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[2px] bg-zinc-800 rotate-12 -translate-y-2"></div>
              <div className="w-full h-[2px] bg-zinc-800 -rotate-45 translate-x-4"></div>
              <div className="w-[2px] h-full bg-zinc-800 translate-x-8"></div>
              {/* Bihar Flyover road mockup */}
              <div className="absolute h-4 w-44 bg-zinc-805 rounded-full border-t border-b border-orange-500/20 translate-y-2 -translate-x-4 flex items-center justify-center">
                <span className="text-[7px] text-stone-500 uppercase tracking-widest font-mono">College Flyover</span>
              </div>
              
              {/* Target Indicator */}
              <div className="relative z-10 p-2 rounded-full bg-orange-600/10 border-2 border-orange-500 flex items-center justify-center animate-pulse">
                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
              </div>
            </div>
            
            <div className="absolute bottom-2 left-2 z-10 bg-black/80 px-2 py-0.5 rounded text-[8.5px] text-amber-400 tracking-wider font-mono">
              Spicy Bawarchi G-Maps Verified
            </div>
          </div>
        </div>
      </div>

      {/* Customer Ratings Summary & Testimonials */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center">
          <MessageSquare size={14} className="text-orange-500 mr-1.5 animate-bounce" />
          <span>Ratings & Live Feedbacks</span>
        </h2>
        
        {/* Average ratings header badge card */}
        <div className="bg-stone-900 border border-amber-500/10 rounded-2xl p-4 mb-4 flex items-center justify-between text-left shadow-lg">
          <div>
            <div className="text-2xl font-black text-white font-mono flex items-center">
              4.9
              <span className="text-sm text-amber-400 ml-1.5">★</span>
            </div>
            <p className="text-[10px] text-stone-400 tracking-wider font-bold uppercase mt-1">Google Reviews rating</p>
          </div>
          
          <div className="text-right">
            <span className="text-[9.5px] font-bold text-[#00e676] bg-emerald-900/20 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase">
              100% Recommended
            </span>
          </div>
        </div>

        {/* Sliding Customer Reviews List */}
        <div className="flex space-x-3.5 overflow-x-auto pb-2 scrollbar-none snap-x">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="snap-center shrink-0 w-72 bg-gradient-to-tr from-stone-950 to-stone-900 border border-white/5 p-4 rounded-2xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-2.5">
                  <img 
                    src={rev.avatar} 
                    alt={rev.name}
                    className="h-8 w-8 rounded-full border border-orange-500/40 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{rev.name}</h4>
                    <span className="text-[9px] text-[#00e676] font-mono">Verified Eater 🥇</span>
                  </div>
                </div>
                
                {rev.dishName && (
                  <span className="inline-block bg-orange-600/10 border border-orange-500/20 text-orange-400 font-extrabold text-[8.5px] px-2 py-0.5 rounded mb-2.5">
                    ordered: {rev.dishName}
                  </span>
                )}
                
                <p className="text-xs text-stone-300 font-medium italic leading-relaxed line-clamp-3">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                     <Star key={i} size={10} className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-stone-700"} />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-stone-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { MenuItem } from "../types";
import { CATEGORIES } from "../data";
import { 
  Search, 
  Heart, 
  Star, 
  Flame, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const MenuView: React.FC = () => {
  const { 
    menuItems, 
    cart, 
    favorites, 
    toggleFavorite, 
    addToCart, 
    decreaseCartQty, 
    setActiveTab 
  } = useApp();

  // Search, Category and Veg toggles
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  
  // High-fidelity selected details modal
  const [selectedItemDetails, setSelectedItemDetails] = useState<MenuItem | null>(null);

  // Load category quick shortcut from home page if stored
  useEffect(() => {
    const quickCategory = localStorage.getItem("selected_category");
    if (quickCategory) {
      setSelectedCategory(quickCategory);
      localStorage.removeItem("selected_category"); // clear it
    }
  }, []);

  const menuCategoryScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected category into view
  useEffect(() => {
    if (menuCategoryScrollRef.current) {
      const activeBtn = menuCategoryScrollRef.current.querySelector('[data-selected="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedCategory]);

  // Live filter logic
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    
    return matchesSearch && matchesCategory && matchesVeg;
  });

  // Calculate cart state
  const totalCartQty = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalCartAmount = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  // Buy Now immediate workflow
  const handleBuyNow = (item: MenuItem) => {
    // Add item to cart with quantity=1 (or increment if already added)
    addToCart(item, 1);
    // Directly shift user to Orders/Checkout view
    setActiveTab("orders");
  };

  return (
    <div className="pb-36 pt-1">
      {/* Live Search & Filter Panel */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md px-4 py-3.5 border-b border-white/5 space-y-3">
        <div id="menu-search-container" className="relative">
          <input
            type="text"
            id="menu-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Butter Naan, Paneer, Momos..."
            className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium text-white focus:outline-none focus:border-orange-500 placeholder-zinc-500 transition-colors"
          />
          <Search size={16} className="absolute left-4 top-3.5 text-zinc-500" />
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3 text-[10.5px] font-bold text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Sliders & Toggle Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 bg-stone-900/60 p-1.5 rounded-lg border border-white/5">
            <button
              id="menu-filter-all"
              onClick={() => setVegOnly(false)}
              className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-md transition-all cursor-pointer ${
                !vegOnly ? "bg-orange-600 text-black" : "text-gray-400"
              }`}
            >
              All Items
            </button>
            <button
              id="menu-filter-veg"
              onClick={() => setVegOnly(true)}
              className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-md transition-all flex items-center space-x-1 cursor-pointer ${
                vegOnly ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20" : "text-gray-400"
              }`}
            >
              <span className="text-[8px] animate-pulse">🟢</span>
              <span>Veg Only</span>
            </button>
          </div>

          <div className="text-[10.5px] text-stone-500 font-bold font-mono uppercase">
            {filteredItems.length} Dishes Found
          </div>
        </div>

        {/* Horizontal Sticky Category List - Swiggy Mode */}
        <div 
          ref={menuCategoryScrollRef}
          className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none snap-x"
        >
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              data-selected={selectedCategory === cat}
              id={`menu-category-btn-${cat.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`snap-center shrink-0 py-1.5 px-4 rounded-full text-[11px] font-extrabold tracking-wide uppercase transition-all duration-200 border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-tr from-orange-600 to-orange-500 border-transparent text-black font-black scale-105 shadow-md shadow-orange-600/20"
                  : "bg-stone-900/60 border-white/5 text-stone-300 hover:border-orange-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gourmet Food Items Grid Layout */}
      <div className="px-4 mt-4">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="text-3xl text-zinc-600">🥘</div>
            <h3 className="text-sm font-bold text-white">No Dishes Match Your Search</h3>
            <p className="text-xs text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
              Try searching simple keyword terms or reset the active filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setVegOnly(false);
              }}
              className="mt-2 text-xs font-bold text-orange-500 border border-orange-500/30 px-4 py-1.5 rounded-xl hover:bg-orange-500/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((food) => {
              const isFav = favorites.includes(food.id);
              const cartUnit = cart.find((c) => c.item.id === food.id);
              const qty = cartUnit ? cartUnit.quantity : 0;

              return (
                <div
                  key={food.id}
                  id={`menu-item-card-${food.id}`}
                  className="bg-stone-950 rounded-2xl border border-white/5 p-3 flex text-left relative hover:border-orange-500/20 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.6)] group"
                >
                  {/* Left Column: Image & Badges */}
                  <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden self-center shadow">
                    <img
                      src={food.image}
                      alt={food.name}
                      onClick={() => setSelectedItemDetails(food)}
                      className="h-full w-full object-cover group-hover:scale-105 duration-300 transition-transform cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Favorite Icon */}
                    <button
                      onClick={() => toggleFavorite(food.id)}
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center cursor-pointer active:scale-90"
                    >
                      <Heart size={12} className={isFav ? "fill-red-500 text-red-500" : "text-stone-300"} />
                    </button>

                    {/* Ratings Badge */}
                    <div className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur px-1 rounded text-[9.5px] text-amber-400 font-extrabold flex items-center shadow-md font-mono">
                      <Star size={9} className="fill-amber-400 mr-0.5" />
                      <span>{food.rating}</span>
                    </div>
                  </div>

                  {/* Right Column: Culinary Specs & Price & Buy Flows */}
                  <div className="flex-1 pl-3.5 flex flex-col justify-between">
                    <div>
                      {/* Veg indicator & Chilli count */}
                      <div className="flex items-center space-x-2">
                        <span className={`text-[9px] font-black tracking-wider uppercase bg-stone-900 border px-1.5 py-0.5 rounded ${
                          food.isVeg ? "border-emerald-500/20 text-emerald-400" : "border-red-500/20 text-red-400"
                        }`}>
                          {food.isVeg ? "🟢 VEG" : "🔴 CHICKEN/EGG"}
                        </span>
                        
                        {food.spicyLevel !== undefined && food.spicyLevel > 0 && (
                          <div className="flex space-x-0.5" title={`Spiciness level: ${food.spicyLevel}/3`}>
                            {[...Array(food.spicyLevel)].map((_, i) => (
                              <Flame key={i} size={10} className="fill-red-500 text-red-500" />
                            ))}
                          </div>
                        )}
                      </div>

                      <h3 
                        onClick={() => setSelectedItemDetails(food)}
                        className="text-sm font-black text-white mt-1 cursor-pointer hover:text-orange-400 leading-tight tracking-wide"
                      >
                        {food.name}
                      </h3>
                      
                      <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {food.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Price tag */}
                      <span className="text-base font-black text-amber-400 font-mono">
                        ₹{food.price}
                      </span>

                      {/* Interactive Adding button layout */}
                      <div className="flex items-center space-x-1.5">
                        {qty > 0 ? (
                          <div className="flex items-center bg-orange-600 rounded-lg p-0.5 shadow-md">
                            <button
                              onClick={() => decreaseCartQty(food.id)}
                              className="h-7 w-7 rounded-md font-extrabold text-xs text-black border-transparent active:scale-90 hover:bg-orange-500 transition-colors flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-xs text-black px-2.5">
                              {qty}
                            </span>
                            <button
                              onClick={() => addToCart(food, 1)}
                              className="h-7 w-7 rounded-md font-extrabold text-xs text-black border-transparent active:scale-90 hover:bg-orange-500 transition-colors flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => addToCart(food, 1)}
                              className="bg-stone-900 border border-white/10 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 text-[10.5px] text-zinc-100 font-black px-3 py-1.5 rounded-xl cursor-pointer active:scale-95 transition-all text-center tracking-wider"
                            >
                              + ADD
                            </button>
                            
                            <button
                              onClick={() => handleBuyNow(food)}
                              className="bg-orange-600 hover:bg-orange-500 text-black text-[10.5px] font-black px-3 py-1.5 rounded-xl cursor-pointer active:scale-95 transition-all tracking-wider"
                            >
                              BUY NOW
                            </button>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setSelectedItemDetails(food)}
                          className="h-7 w-7 rounded-lg bg-stone-900 font-semibold border border-white/5 active:scale-95 flex items-center justify-center text-zinc-500 hover:text-white"
                          title="View items info"
                        >
                          <Info size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Royal Details Backdrop Modal - AnimatePresence */}
      <AnimatePresence>
        {selectedItemDetails && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-stone-950 border border-white/10 w-full max-w-sm rounded-t-3xl overflow-hidden shadow-2xl p-4 text-left max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="text-[10.5px] font-bold text-amber-400 font-mono uppercase">Culinary Details card</span>
                <button
                  onClick={() => setSelectedItemDetails(null)}
                  className="text-stone-400 font-extrabold text-xs bg-zinc-900 h-6 w-6 rounded-full flex items-center justify-center border border-white/5 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                <img
                  src={selectedItemDetails.image}
                  alt={selectedItemDetails.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur px-2.5 py-1 rounded-md text-[10px] uppercase font-extrabold text-white">
                  {selectedItemDetails.category}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                    selectedItemDetails.isVeg 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                      : "bg-red-950/20 border-red-500/20 text-red-100"
                  }`}>
                    {selectedItemDetails.isVeg ? "🟢 Pure Vegetarian" : "🔴 contains Chicken/Egg"}
                  </span>
                  
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9.5px] font-extrabold px-2 py-0.5 rounded">
                    ★ {selectedItemDetails.rating} Google Score
                  </span>
                </div>

                <h3 className="text-xl font-black text-white tracking-wide">{selectedItemDetails.name}</h3>
                
                <p className="text-xs text-stone-300 leading-relaxed font-medium">
                  {selectedItemDetails.description}
                </p>

                {selectedItemDetails.ingredients && selectedItemDetails.ingredients.length > 0 && (
                  <div className="bg-stone-900/60 p-3 rounded-xl border border-white/5">
                    <h4 className="text-[10.5px] text-zinc-400 font-mono uppercase font-bold tracking-wider mb-2">Primary Ingredients used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItemDetails.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-amber-200 bg-black/40 border border-white/5 py-1 px-2.5 rounded-lg font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono font-bold">Standard Portion Price</span>
                    <span className="text-xl font-black text-amber-400 font-mono">₹{selectedItemDetails.price}</span>
                  </div>

                  <div className="flex space-x-2.5">
                    <button
                      onClick={() => {
                        addToCart(selectedItemDetails, 1);
                        setSelectedItemDetails(null);
                      }}
                      className="bg-stone-900 border border-amber-500/25 text-amber-400 font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer"
                    >
                      Add To Cart
                    </button>
                    
                    <button
                      onClick={() => {
                        handleBuyNow(selectedItemDetails);
                        setSelectedItemDetails(null);
                      }}
                      className="bg-orange-600 hover:bg-orange-500 text-black font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Cart Summary Row at the bottom - Flipkart Standard */}
      <AnimatePresence>
        {totalCartQty > 0 && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-20 left-0 right-0 z-40 px-4 max-w-sm mx-auto"
          >
            <button
              onClick={() => setActiveTab("orders")}
              id="sticky-cart-summary-bar"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-black shadow-2xl p-3.5 rounded-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-3 skew-y-12 pointer-events-none scale-105"></div>
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="h-8 w-8 rounded-lg bg-black/25 flex items-center justify-center font-black">
                  <ShoppingBag size={15} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black font-mono tracking-wider">
                    {totalCartQty} ITEM{totalCartQty > 1 ? "S" : ""} ADDED
                  </div>
                  <div className="text-xs text-stone-900 font-extrabold flex items-center font-mono">
                    ₹{totalCartAmount} <span className="text-[10px] ml-1 opacity-70">(Excl. taxes)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 relative z-10 text-xs font-black uppercase tracking-wider bg-black text-orange-400 py-1.5 px-3 rounded-xl border border-orange-500/25">
                <span>View Cart</span>
                <ArrowRight size={12} className="animate-pulse" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

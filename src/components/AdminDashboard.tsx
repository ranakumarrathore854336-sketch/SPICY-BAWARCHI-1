/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MenuItem, OrderStatus } from "../types";
import { CATEGORIES } from "../data";
import { 
  TrendingUp, 
  Settings, 
  Plus, 
  Trash2, 
  Wrench, 
  TrendingDown, 
  Calendar, 
  Clock, 
  FileDown, 
  Activity,
  UserCheck,
  ChevronLeft,
  Search,
  DollarSign
} from "lucide-react";
import { motion } from "motion/react";

export const AdminDashboard: React.FC = () => {
  const { 
    menuItems, 
    orders, 
    bookings, 
    addMenuItem, 
    editMenuItem, 
    deleteMenuItem, 
    resetMenu,
    updateOrderStatus,
    deleteOrder,
    updateBookingStatus,
    setAdminMode
  } = useApp();

  // Active admin tab: "analytics" | "orders" | "catalog" | "bookings"
  const [adminTab, setAdminTab] = useState("orders");
  
  // Searching/Editing inside catalog
  const [catSearch, setCatSearch] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // Form state for creating a new food item
  const [newItem, setNewItem] = useState({
    name: "",
    price: 180,
    category: "Vegetables",
    isVeg: true,
    description: "",
    ingredients: ""
  });

  // Calculate high-fidelity stats
  const totalSales = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeOrdersCount = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const pendingBookingsCount = bookings.filter(b => b.status === "Pending").length;

  // Format Helper for Dates
  const formatDateStr = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return isoStr;
    }
  };

  const handleAddNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || newItem.price <= 0) {
      alert("Please enter a valid Name and Price.");
      return;
    }

    const createdItem: MenuItem = {
      id: `add-${Date.now()}`,
      name: newItem.name,
      price: newItem.price,
      rating: 4.8,
      category: newItem.category,
      isVeg: newItem.isVeg,
      description: newItem.description || "A special culinary preparation by Spicy Bawarchi.",
      image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60", // default premium placeholder
      ingredients: newItem.ingredients ? newItem.ingredients.split(",").map(i => i.trim()) : []
    };

    addMenuItem(createdItem);
    alert(`Added "${newItem.name}" to the menu index!`);
    
    // Reset Form
    setNewItem({
      name: "",
      price: 180,
      category: "Vegetables",
      isVeg: true,
      description: "",
      ingredients: ""
    });
  };

  const handleEditPriceSave = (food: MenuItem) => {
    if (editPrice <= 0) return;
    editMenuItem({ ...food, price: editPrice });
    setEditingItemId(null);
    alert(`Price of "${food.name}" modified to ₹${editPrice}.`);
  };

  // CSV Report Generator (High WOW factor)
  const handleDownloadCSVReport = () => {
    if (orders.length === 0) {
      alert("No active orders found to export.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Customer Name,Table Number,Total Amount,Status,Timestamp,Ordered Items\n";

    orders.forEach(ord => {
      const itemNames = ord.items.map(it => `${it.name} (x${it.quantity})`).join(" | ");
      csvContent += `${ord.id},"${ord.customerName}",${ord.tableNumber},${ord.totalAmount},${ord.status},${ord.timestamp},"${itemNames}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Spicy_Bawarchi_Orders_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic Progress Charts mapping for categories
  const categoryStats = CATEGORIES.slice(1).map(cat => {
    const count = menuItems.filter(item => item.category === cat).length;
    return { name: cat, count };
  }).sort((a, b) => b.count - a.count);

  const filteredCatalogItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(catSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(catSearch.toLowerCase())
  );

  return (
    <div className="pb-32 px-4 pt-4 text-left">
      {/* Admin Panel Header with Back Toggle Button */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setAdminMode(false)}
          className="flex items-center space-x-1.5 py-1.5 px-3 bg-stone-900 border border-white/5 rounded-xl text-xs font-bold text-stone-300 hover:text-white"
        >
          <ChevronLeft size={14} />
          <span>Exit Hub</span>
        </button>
        
        <h1 className="text-sm font-black text-amber-400 uppercase tracking-widest flex items-center">
          📊 MANAGEMENT HUB
        </h1>
      </div>

      {/* Top Aggregated Analytics summary metrics widgets */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 bg-stone-950 border border-emerald-500/10 rounded-2xl relative overflow-hidden">
          <DollarSign size={32} className="absolute -right-3 -top-3 text-emerald-500/10 scale-125" />
          <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">Net Sales (Excl. Can)</span>
          <div className="text-xl font-black text-white font-mono mt-1">₹{totalSales}</div>
        </div>

        <div className="p-4 bg-stone-950 border border-orange-500/10 rounded-2xl relative overflow-hidden">
          <Activity size={32} className="absolute -right-3 -top-3 text-orange-500/10 scale-125 hover:rotate-12 duration-300 transition-transform" />
          <span className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">Active Kitchen queues</span>
          <div className="text-xl font-black text-[#FF6B00] font-mono mt-1">{activeOrdersCount} Tables</div>
        </div>
      </div>

      {/* Admin Tab Selector */}
      <div className="flex bg-stone-950 p-1 rounded-xl border border-white/5 mb-6 text-xs font-bold">
        <button
          onClick={() => setAdminTab("orders")}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            adminTab === "orders" ? "bg-orange-600 text-black font-black" : "text-stone-400 hover:text-white"
          }`}
        >
          Live Orders
        </button>
        <button
          onClick={() => setAdminTab("bookings")}
          className={`flex-1 py-2 text-center rounded-lg transition-all relative ${
            adminTab === "bookings" ? "bg-orange-600 text-black font-black" : "text-stone-400 hover:text-white"
          }`}
        >
          Bookings
          {pendingBookingsCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </button>
        <button
          onClick={() => setAdminTab("catalog")}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            adminTab === "catalog" ? "bg-orange-600 text-black font-black" : "text-stone-400 hover:text-white"
          }`}
        >
          Menu catalog
        </button>
        <button
          onClick={() => setAdminTab("analytics")}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            adminTab === "analytics" ? "bg-orange-600 text-black font-black" : "text-stone-400 hover:text-white"
          }`}
        >
          Insights
        </button>
      </div>

      {/* TAB CONTENT: 1. LIVE ORDERS SCREEN */}
      {adminTab === "orders" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest">
              Table Order Channels
            </h2>
            
            <button
              onClick={handleDownloadCSVReport}
              className="flex items-center space-x-1 py-1.5 px-3 bg-stone-900 border border-white/5 rounded-xl text-xs font-bold text-[#00e676] hover:bg-emerald-900/10 transition-colors cursor-pointer"
            >
              <FileDown size={12} />
              <span>Export CSV</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="bg-stone-950 border border-white/5 rounded-2xl p-8 text-center text-stone-500">
              <span className="text-3xl block mb-2">🍽️</span>
              No table orders have been places in the local cycle yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="bg-stone-950 border border-white/5 p-4 rounded-2xl space-y-3.5 shadow-xl"
                >
                  {/* Title Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div>
                      <h3 className="text-xs font-black text-white font-mono">ID: #{ord.id}</h3>
                      <span className="text-[10px] text-zinc-550">{formatDateStr(ord.timestamp)}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-stone-400 block font-bold">Table: {ord.tableNumber}</span>
                      <span className="text-xs text-amber-400 font-mono font-bold font-black block">₹{ord.totalAmount}</span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="flex items-center space-x-2">
                    <UserCheck size={12} className="text-orange-500" />
                    <span className="text-xs text-stone-300 font-semibold">{ord.customerName}</span>
                  </div>

                  {/* Food Items List */}
                  <div className="bg-stone-900/50 p-3 rounded-xl space-y-1 border border-white/5">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs font-semibold text-stone-400">
                        <span>
                          {it.name} <span className="text-[10.5px] text-zinc-550">x {it.quantity}</span>
                        </span>
                        <span className="font-mono text-zinc-500">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/5">
                    <div className="flex items-center space-x-1 bg-stone-900 px-2 py-1 rounded-md">
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase mr-1">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-transparent text-xs font-bold text-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm("Permanently delete order record?")) {
                          deleteOrder(ord.id);
                        }
                      }}
                      className="text-[10px] font-bold text-red-400 bg-red-950/10 hover:bg-red-900/25 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 size={11} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. BOOKINGS TRACKER */}
      {adminTab === "bookings" && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest mb-2">
            Banquet &amp; Party reservations
          </h2>

          {bookings.length === 0 ? (
            <div className="bg-stone-950 border border-white/5 rounded-2xl p-8 text-center text-stone-500">
              <span className="text-3xl block mb-2">🎈</span>
              No active party bookings have been processed recently.
            </div>
          ) : (
            <div className="space-y-3.5">
              {bookings.map((bkg) => (
                <div 
                  key={bkg.id}
                  className="bg-stone-950 border border-white/5 p-4 rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div>
                      <span className="text-xs font-black text-white font-mono">{bkg.id}</span>
                      <span className="text-[9px] text-zinc-550 block">{formatDateStr(bkg.timestamp)}</span>
                    </div>

                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                      bkg.status === "Pending" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                      bkg.status === "Confirmed" ? "bg-emerald-500/15 text-[#00e676] border border-[#00e676]/20" :
                      "bg-stone-800 text-stone-400"
                    }`}>
                      {bkg.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase block font-mono">Eater Name</span>
                      <span className="text-stone-300 font-bold">{bkg.name}</span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase block font-mono">Phone</span>
                      <a href={`tel:${bkg.phone}`} className="text-blue-400 hover:underline">{bkg.phone}</a>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase block font-mono">Event type</span>
                      <span className="text-amber-300 font-bold">{bkg.eventType}</span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase block font-mono">Date</span>
                      <span className="text-stone-300 font-bold font-mono">{bkg.date}</span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-zinc-550 font-bold uppercase block font-mono">Guest Count</span>
                      <span className="text-stone-300 font-extrabold font-mono">{bkg.guestCount} People</span>
                    </div>
                  </div>

                  {bkg.requirements && (
                    <div className="text-[11px] text-zinc-400 italic bg-stone-900/40 p-2.5 rounded-lg border border-white/5">
                      &rdquo;{bkg.requirements}&rdquo;
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="flex justify-end space-x-2 pt-2 border-t border-white/5">
                    {bkg.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(bkg.id, "Cancelled")}
                          className="text-[10px] font-bold text-red-400 border border-red-500/10 bg-red-950/10 px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => updateBookingStatus(bkg.id, "Confirmed")}
                          className="text-[10px] font-bold text-black bg-[#00e676] px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Confirm
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 3. MENU CATALOG MANAGER */}
      {adminTab === "catalog" && (
        <div className="space-y-5">
          {/* Add New Food item Form */}
          <div className="bg-stone-950 border border-white/5 p-4 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xs font-black uppercase text-amber-400 font-mono flex items-center">
              <Plus size={14} className="mr-1" />
              <span>Add Cooking Dish</span>
            </h3>

            <form onSubmit={handleAddNewItemSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Special Paneer Roll, Bihar Litti Chokha"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-stone-900 border border-white/10 rounded-xl py-2 px-3 text-xs font-medium text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-stone-900 border border-white/10 rounded-xl py-2 px-2 text-xs font-bold text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">Culinary Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full bg-stone-900 border border-white/10 rounded-xl py-2 px-1 text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.slice(1).map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 py-1 select-none">
                <input
                  type="checkbox"
                  id="addItemVegCheckbox"
                  checked={newItem.isVeg}
                  onChange={(e) => setNewItem({ ...newItem, isVeg: e.target.checked })}
                  className="rounded bg-stone-900 border-white/10"
                />
                <label htmlFor="addItemVegCheckbox" className="text-xs text-stone-300 font-semibold cursor-pointer">
                  Is Vegetarian Dish (🟢)
                </label>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-1">Culinary Description</label>
                <input
                  type="text"
                  placeholder="Creamy details, tandoori flavors..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full bg-stone-900 border border-white/10 rounded-xl py-2 px-3 text-xs font-medium text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#FF6B00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Add To Catalog
              </button>
            </form>
          </div>

          {/* Quick Price updates and deletes list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest">
                Edit prices &amp; inventory
              </h3>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to revert all changes and load default menu? This will erase custom added dishes / price edits.")) {
                    resetMenu();
                    alert("Menu reset to luxury defaults completed.");
                  }
                }}
                className="text-[9.5px] font-mono text-amber-500 font-bold hover:underline"
              >
                Factory Reset Catalog
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
                placeholder="Search catalog foods..."
                className="w-full bg-stone-950 border border-white/5 rounded-xl py-2 px-3 pl-9 text-xs text-white focus:outline-none"
              />
              <Search size={14} className="absolute left-3 top-3 text-zinc-500" />
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {filteredCatalogItems.map((food) => (
                <div 
                  key={food.id}
                  className="bg-stone-950 border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="text-[11px] shrink-0">{food.isVeg ? "🟢" : "🔴"}</span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white truncate text-[11px]">{food.name}</h4>
                      <span className="text-[9px] text-stone-500">{food.category}</span>
                    </div>
                  </div>

                  {editingItemId === food.id ? (
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                        className="w-16 bg-stone-900 border border-white/15 px-1 py-1 rounded text-center text-white font-mono font-bold"
                      />
                      <button
                        onClick={() => handleEditPriceSave(food)}
                        className="bg-emerald-600 text-black font-extrabold px-2 py-1 rounded hover:opacity-80"
                      >
                        ✔
                      </button>
                      <button
                        onClick={() => setEditingItemId(null)}
                        className="bg-stone-850 text-stone-400 px-2 py-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 shrink-0 select-none">
                      <span className="font-mono font-extrabold text-amber-400 pr-1">₹{food.price}</span>
                      
                      <button
                        onClick={() => {
                          setEditingItemId(food.id);
                          setEditPrice(food.price);
                        }}
                        className="text-[9.5px] font-bold text-amber-400 border border-amber-500/25 px-2 py-1 rounded-md"
                      >
                        Price
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove "${food.name}" from catalog?`)) {
                            deleteMenuItem(food.id);
                          }
                        }}
                        className="h-7 w-7 rounded bg-red-950/15 text-red-500 flex items-center justify-center cursor-pointer border border-red-500/10"
                        title="Delete item"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. INSIGHTS CHARTS */}
      {adminTab === "analytics" && (
        <div className="space-y-5">
          <div className="bg-stone-950 border border-white/5 p-4 rounded-xl space-y-3 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white05 pb-1">
              Active system registers
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Total catalog indexes</span>
                <span className="font-mono">{menuItems.length} Dishes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Active table queue tickets</span>
                <span className="font-mono">{orders.length} tickets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Total registered guests list</span>
                <span className="font-mono">
                  {bookings.reduce((sum, b) => sum + b.guestCount, 0)} people
                </span>
              </div>
            </div>
          </div>

          <div className="bg-stone-950 border border-white/5 p-4 rounded-xl space-y-3 shadow-xl">
            <h3 className="text-xs font-black uppercase text-amber-400 font-mono tracking-widest">
              Category Distribution Indexes
            </h3>

            <div className="space-y-3">
              {categoryStats.slice(0, 5).map((stat, idx) => {
                const percentage = Math.min(100, Math.round((stat.count / menuItems.length) * 100));
                
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-stone-300">{stat.name}</span>
                      <span className="text-amber-400 font-mono">{stat.count} Dishes ({percentage}%)</span>
                    </div>

                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-[#FF6B00] h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

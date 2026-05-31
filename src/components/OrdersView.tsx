/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  MapPin, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const OrdersView: React.FC = () => {
  const { 
    cart, 
    orders, 
    userName, 
    tableNumber, 
    addToCart, 
    decreaseCartQty, 
    removeFromCart, 
    placeOrder, 
    offers,
    setActiveTab
  } = useApp();

  // Inputs for checkout
  const [custName, setCustName] = useState(userName || "");
  const [tNum, setTNum] = useState(tableNumber || "");
  
  // Coupon applied state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<any | null>(null);

  // Sync inputs with context if changed outer wise
  useEffect(() => {
    if (userName && !custName) setCustName(userName);
    if (tableNumber && !tNum) setTNum(tableNumber);
  }, [userName, tableNumber]);

  // Calculations
  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST on Restaurant bills
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  const grandTotal = subtotal + gst - discountAmount;

  // Auto apply coupon if conditions met
  const handleApplyCoupon = (code: string) => {
    const offer = offers.find(o => o.code.toUpperCase() === code.trim().toUpperCase());
    if (!offer) {
      setCouponError("Invalid coupon code code. Try BAWARCHI50!");
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < offer.minAmount) {
      setCouponError(`Minimum order amount of ₹${offer.minAmount} required.`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon({ code: offer.code, percent: offer.discountPercent });
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    if (!custName.trim()) {
      alert("Please specify your name for the kitchen ticket.");
      return;
    }

    if (!tNum.trim()) {
      alert("Please specify your current Table Number.");
      return;
    }

    setSubmitting(true);

    // Create item order string for WhatsApp
    const itemStrings = cart.map(c => `- ${c.item.name} [Qty: ${c.quantity}] (₹${c.item.price * c.quantity})`).join("\n");
    const totalWithOffer = grandTotal;

    // Call context to record order
    const completedOrder = placeOrder(custName, tNum);

    if (completedOrder) {
      setLastPlacedOrder(completedOrder);
      
      // Compose WhatsApp template as required
      const waNumber = "917643097915"; // Owner's contact number
      const orderMessage = `Hello SPICY BAWARCHI,

New Table Order

Customer Name:
${custName}

Table Number:
${tNum}

Ordered Items:
${itemStrings}

Total Amount:
₹${totalWithOffer}

Please prepare my order.`;

      const encodedMessage = encodeURIComponent(orderMessage);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
      
      // Delay slightly for stunning animations
      setTimeout(() => {
        setSubmitting(false);
        window.open(waUrl, "_blank");
      }, 1500);
    }
  };

  return (
    <div className="pb-28 px-4 pt-4">
      {/* View Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-black text-white uppercase tracking-wider flex items-center">
          <ShoppingBag className="text-orange-500 mr-2" size={20} />
          <span>Checkout &amp; Cart</span>
        </h1>
        <div className="bg-stone-900 border border-white/5 py-1 px-3 rounded-xl text-xs font-bold text-stone-400 font-mono">
          {cart.length} Item{cart.length !== 1 ? "s" : ""}
        </div>
      </div>

      {lastPlacedOrder && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-950/40 border-2 border-emerald-500/40 p-4 rounded-3xl text-left space-y-3 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#00e676] text-black font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl h-5">
            SUCCESS
          </div>
          <div className="text-xl">✅</div>
          <h2 className="text-sm font-extrabold text-[#00e676] uppercase tracking-wider">Order Sent to Spicy Bawarchi!</h2>
          <p className="text-xs text-stone-300 leading-snug">
            Your table ticket <strong>#{lastPlacedOrder.id}</strong> has been logged in the system. If your browser didn&apos;t automatically launch WhatsApp, click below to confirm:
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => {
                const itemStrings = lastPlacedOrder.items.map((c: any) => `- ${c.name} [Qty: ${c.quantity}]`).join("\n");
                const waUrl = `https://wa.me/917643097915?text=${encodeURIComponent(
                  `Hello SPICY BAWARCHI,\n\nNew Table Order\n\nCustomer Name:\n${lastPlacedOrder.customerName}\n\nTable Number:\n${lastPlacedOrder.tableNumber}\n\nOrdered Items:\n${itemStrings}\n\nTotal Amount:\n₹${lastPlacedOrder.totalAmount}\n\nPlease prepare my order.`
                )}`;
                window.open(waUrl, "_blank");
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#00e676] text-black font-black text-[10.5px] rounded-lg tracking-wide shadow"
            >
              <span>Verify WhatsApp</span>
              <ExternalLink size={11} />
            </button>
            <button
              onClick={() => setLastPlacedOrder(null)}
              className="text-stone-400 text-xs font-bold hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {cart.length === 0 ? (
        <div className="space-y-6">
          {/* Empty Cart Layout */}
          <div className="py-12 bg-stone-950 rounded-3xl border border-white/5 p-6 shadow-xl text-center space-y-4">
            <div className="h-16 w-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto text-stone-600 border border-white/5 shadow-inner">
              🛒
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your cart is currently empty</h3>
              <p className="text-xs text-stone-400 max-w-[210px] mx-auto leading-relaxed">
                Add premium Indian delicacies, appetizers, or refreshing beverages from the menu list.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("menu")}
              className="bg-orange-600 hover:bg-orange-500 font-bold text-black text-xs py-2 px-6 rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              BROWSE MENU CARD
            </button>
          </div>

          {/* Past Orders History Section */}
          {orders.length > 0 && (
            <div className="text-left space-y-3">
              <h2 className="text-sm font-bold text-stone-400 tracking-wider uppercase flex items-center">
                <Timer size={14} className="text-orange-500 mr-1.5" />
                <span>Your Order Log ({orders.length})</span>
              </h2>

              <div className="space-y-3.5">
                {orders.map((ord) => (
                  <div 
                    key={ord.id}
                    className="bg-stone-900/60 backdrop-blur border border-white/5 p-4 rounded-2xl relative shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                      <div>
                        <span className="text-[10px] text-zinc-500 block font-mono font-bold">Ticket number</span>
                        <span className="text-xs font-bold text-white font-mono">#{ord.id}</span>
                      </div>
                      
                      {/* Active Status indicator tag */}
                      <span className={`text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono ${
                        ord.status === "Pending" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                        ord.status === "Preparing" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        ord.status === "Ready" ? "bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/20 animate-pulse" :
                        ord.status === "Delivered" ? "bg-stone-800 text-stone-400" : "bg-red-500/15 text-red-400"
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-stone-300 font-medium">
                          <span>{it.name} <span className="text-[10px] text-zinc-500">x{it.quantity}</span></span>
                          <span className="font-mono text-stone-400">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-400 flex items-center">
                        <Clock size={11} className="mr-1" /> Table {ord.tableNumber}
                      </span>
                      <span className="text-amber-400 font-mono text-sm font-black">₹{ord.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div id="checkout-form-container" className="space-y-5 text-left">
          {/* Cart itemized items card */}
          <div className="bg-stone-950 rounded-2xl border border-white/5 p-4 shadow-xl space-y-3.5">
            <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-2">
              Itemized culinary items
            </h2>
            
            <div className="divide-y divide-white/5 space-y-3">
              {cart.map((c) => (
                <div key={c.item.id} className="flex items-center space-x-3 pt-3 first:pt-0">
                  <img
                    src={c.item.image}
                    alt={c.item.name}
                    className="h-12 w-12 rounded-lg object-cover bg-stone-900 border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">{c.item.name}</h3>
                    <span className="text-[10.5px] font-mono text-amber-500 font-semibold block">₹{c.item.price} each</span>
                  </div>

                  {/* Qty increment controls */}
                  <div className="flex items-center bg-stone-900 p-1 rounded-lg border border-white/5 shrink-0 select-none">
                    <button
                      onClick={() => decreaseCartQty(c.item.id)}
                      className="h-5 w-5 rounded bg-black flex items-center justify-center text-[10px] text-zinc-300 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold px-2.5 text-zinc-100">{c.quantity}</span>
                    <button
                      onClick={() => addToCart(c.item, 1)}
                      className="h-5 w-5 rounded bg-black flex items-center justify-center text-[10px] text-green-400 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(c.item.id)}
                    className="h-7 w-7 rounded-lg bg-red-650/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 cursor-pointer border border-red-500/10"
                    title="Remove item"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Form card - (No Address asked, purely Name & Table as requested!) */}
          <form onSubmit={handleSubmitOrder} className="bg-stone-950 rounded-2xl border border-white/5 p-4 shadow-xl space-y-4">
            <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-2 flex items-center">
              <MapPin size={12} className="text-orange-500 mr-1" />
              <span>Table Placement Details</span>
            </h2>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10.5px] font-extrabold uppercase text-stone-400 tracking-wider block mb-1">
                  Customer ticket name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="E.g., Aman, Rahul Kumar"
                  className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 px-3 text-xs font-medium text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[10.5px] font-extrabold uppercase text-stone-400 tracking-wider block mb-1">
                  Table Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tNum}
                  onChange={(e) => setTNum(e.target.value)}
                  placeholder="E.g., Table 4, Suite B"
                  className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 px-3 text-xs font-medium text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>
          </form>

          {/* Flipkart promo code card */}
          <div className="bg-stone-950 rounded-2xl border border-white/5 p-4 shadow-xl space-y-3">
            <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-2 flex items-center">
              <Tag size={12} className="text-amber-400 mr-1" />
              <span>Redeem Discount Coupon</span>
            </h2>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-900/10 border border-emerald-500/20 p-2.5 rounded-xl">
                <div className="text-left">
                  <span className="text-xs text-emerald-400 font-black font-mono tracking-wider">{appliedCoupon.code} APP-COUPON ACTIVATED</span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{appliedCoupon.percent}% discount successfully applied.</p>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-[10px] font-bold text-red-400 bg-red-900/20 hover:bg-red-900/30 px-2.5 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon (e.g. BAWARCHI50)"
                    className="flex-1 bg-stone-900 border border-white/10 rounded-xl py-2 px-3 text-xs font-semibold uppercase tracking-wider text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(couponCode)}
                    className="bg-stone-900 hover:bg-stone-800 border border-white/10 text-xs font-bold text-amber-400 py-2 px-4 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                
                {couponError && (
                  <p className="text-[10px] text-red-400 font-medium">{couponError}</p>
                )}

                <div className="flex gap-2.5 pt-1.5 overflow-x-auto scrollbar-none">
                  {offers.map((off) => (
                    <button
                      key={off.id}
                      type="button"
                      onClick={() => {
                        setCouponCode(off.code);
                        handleApplyCoupon(off.code);
                      }}
                      className="shrink-0 bg-stone-900/40 hover:bg-stone-900/80 border border-white/5 rounded-lg py-1 px-2.5 text-left transition-all"
                    >
                      <span className="text-[9.5px] font-mono font-bold text-amber-400 block tracking-wide">{off.code}</span>
                      <span className="text-[8.5px] text-stone-400 font-medium block mt-0.5">{off.discountPercent}% OFF above ₹{off.minAmount}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary & Billing card */}
          <div className="bg-stone-950 rounded-2xl border border-white/5 p-4 shadow-xl space-y-3 font-medium text-xs text-stone-300">
            <h2 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-2 flex items-center justify-between">
              <span>Gourmet Billing summary</span>
              <span className="text-[9px] font-normal text-zinc-500 font-mono">INC-GST TICKETS</span>
            </h2>

            <div className="space-y-2 border-b border-white/5 pb-2.5">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-mono text-zinc-400">₹{subtotal}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-[#00e676]">
                  <span>Coupon Offer Saving ({appliedCoupon.percent}%)</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between" title="Restaurant GST setup standard">
                <span>Bihar SGST/CGST (5%)</span>
                <span className="font-mono text-zinc-400">₹{gst}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-black text-amber-400 pt-1">
              <span className="uppercase font-mono tracking-wider">Grand Total Amount</span>
              <span className="font-mono text-lg">₹{grandTotal}</span>
            </div>
          </div>

          {/* Large Checkout Button */}
          <button
            onClick={handleSubmitOrder}
            disabled={submitting}
            id="order-confirm-submit-btn"
            className="w-full py-4 px-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 cursor-pointer shadow-xl disabled:opacity-50"
          >
            {submitting ? (
              <div className="flex items-center space-x-2 animate-pulse">
                <span>CONNECTING KITCHEN...</span>
              </div>
            ) : (
              <>
                <span>CONFIRM &amp; DISPATCH</span>
                <span className="text-sm font-light">🔥</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

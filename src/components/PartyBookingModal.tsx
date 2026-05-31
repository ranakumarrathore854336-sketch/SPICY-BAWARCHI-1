/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, Users, FileText, Phone, User, X, Gift } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PartyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartyBookingModal: React.FC<PartyBookingModalProps> = ({ isOpen, onClose }) => {
  const { addBooking } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Birthday Party 🎂",
    date: "",
    guestCount: 15,
    requirements: ""
  });

  const [success, setSuccess] = useState(false);

  const eventTypes = [
    { label: "Birthday Party 🎂", value: "Birthday Party" },
    { label: "Anniversary Party 💍", value: "Anniversary Party" },
    { label: "Wedding Function 👰", value: "Wedding Function" },
    { label: "Engagement Party 🎉", value: "Engagement Party" },
    { label: "Corporate Event 🏢", value: "Corporate Event" },
    { label: "Family Gathering 👨👩👧", value: "Family Gathering" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "guestCount" ? parseInt(value) || 0 : value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      alert("Please complete the required booking parameters.");
      return;
    }

    // Save locally
    const bookingResult = addBooking(formData);

    // Prepare WhatsApp Message
    const waNumber = "917643097915";
    const waMessage = `Hello SPICY BAWARCHI,

I would like to book a Party Reservation!

Booking ID:
${bookingResult.id}

Customer Name:
${formData.name}

Phone Number:
${formData.phone}

Event Type:
${formData.eventType}

Event Date:
${formData.date}

Expected Guest Count:
${formData.guestCount} People

Special Requirements:
${formData.requirements || "None specified."}

Please confirm my reservation details.`;

    const encoded = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    setSuccess(true);
    
    // Redirect after slight animation delayed frame
    setTimeout(() => {
      window.open(waUrl, "_blank");
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-stone-950 border border-white/10 w-full max-w-sm rounded-3xl p-5 shadow-2xl text-left max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2.5">
              <div className="flex items-center space-x-2">
                <Gift className="text-orange-500" size={18} />
                <h2 className="text-sm font-black uppercase tracking-wider text-white">Party Booking Hub</h2>
              </div>
              
              <button
                onClick={onClose}
                className="text-stone-400 font-bold bg-stone-900 border border-white/5 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3.5">
                <div className="text-3xl animate-bounce">📱</div>
                <h3 className="text-sm font-extrabold text-[#00e676] uppercase tracking-wider">REGISTERING RESERVATION...</h3>
                <p className="text-xs text-stone-300 max-w-[200px] mx-auto leading-relaxed">
                  We are recording your booking ticket and routing you directly to WhatsApp for manual kitchen verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="bg-orange-850/10 border border-orange-500/20 p-3 rounded-2xl text-[10.5px] text-orange-400 font-medium leading-relaxed mb-1">
                  💡 <strong>Bawarchi Guarantee</strong>: Custom banquet spaces are pre-configured based on guest count guidelines. Direct WhatsApp verification guarantees instant table reserves.
                </div>

                {/* Name */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                    Reserve contact name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Aman Roy"
                      className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white focus:outline-none focus:border-orange-500"
                    />
                    <User size={13} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                    Contact phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="E.g., 076430 97915"
                      className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white focus:outline-none focus:border-orange-500"
                    />
                    <Phone size={13} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  </div>
                </div>

                {/* Event Type selection */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                    Select Event Theme <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 px-3 text-xs font-semibold text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {eventTypes.map((ev, idx) => (
                      <option key={idx} value={ev.label}>
                        {ev.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Guest Count Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 px-2 text-xs font-semibold text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                      Guest Count <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="guestCount"
                        required
                        min="5"
                        max="350"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-2 text-xs font-bold text-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                      <Users size={13} className="absolute left-3.5 top-3.5 text-zinc-500" />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
                    Special banquet requirements
                  </label>
                  <div className="relative">
                    <textarea
                      name="requirements"
                      rows={2}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="E.g., Butter Naan heavy buffet menu style, pure veg split cutlery, stage decorations..."
                      className="w-full bg-stone-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white focus:outline-none focus:border-orange-500"
                    />
                    <FileText size={13} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="booking-submit-btn"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-600 to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:scale-98 transition-transform cursor-pointer shadow-lg"
                >
                  Reserve Banquet space
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

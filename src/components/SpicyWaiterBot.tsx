/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { MessageSquare, Send, X, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

export const SpicyWaiterBot: React.FC = () => {
  const { menuItems, addToCart } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Push greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "msg-greet",
          role: "model",
          text: `Namaste! 🙏 I am your **AI Bawarchi Companion**. Welcome to SPICY BAWARCHI of Forbesganj!

I can help you explore our gourmet delicacies, suggest combinations based on your budget, or **automatically add items to your cart**! 

Try asking me:
* "What is in the Special Thali?"
* "Recommend something spicy under ₹200."
* "Add Butter Naan and Dal Makhani to my cart."`
        }
      ]);
    }
  }, [isOpen]);

  const handleQuickPromptClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    if (!textToSend) {
      setInputText("");
    }

    // Add user message
    const userMsgId = `usr-${Date.now()}`;
    const newMsgList: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", text }
    ];
    setMessages(newMsgList);
    setLoading(true);

    try {
      // Proxy request to Express server is secure
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { 
            id: `err-${Date.now()}`, 
            role: "model", 
            text: `⚠️ **AI Waiter Status**: ${data.error}` 
          }
        ]);
        setLoading(false);
        return;
      }

      let reply: string = data.reply;

      // Extract and execute client-side cart actions if attached inside <cart_action>...</cart_action>
      const cartActionRegex = /<cart_action>([\s\S]*?)<\/cart_action>/i;
      const match = reply.match(cartActionRegex);
      
      if (match && match[1]) {
        try {
          const actionArray = JSON.parse(match[1].trim());
          if (Array.isArray(actionArray)) {
            actionArray.forEach((act: any) => {
              if (act.action === "add" && act.itemId) {
                const targetItem = menuItems.find(item => item.id === act.itemId);
                if (targetItem) {
                  const qty = parseInt(act.quantity) || 1;
                  addToCart(targetItem, qty);
                  
                  // Flash magnificent toast feedback
                  setShowToast(`AI Waiter added ${qty}x ${targetItem.name} to your checkout cart! 🛒`);
                  setTimeout(() => setShowToast(null), 3500);
                }
              }
            });
          }
        } catch (err) {
          console.error("Failed to parse cart_action payload:", err);
        }

        // Clean action XML block from displayed response message
        reply = reply.replace(cartActionRegex, "").trim();
      }

      setMessages(prev => [
        ...prev,
        { id: `model-${Date.now()}`, role: "model", text: reply }
      ]);
    } catch (e: any) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { id: `err-${Date.now()}`, role: "model", text: "⚠️ Server connectivity error. Please ensure the dev server is active and the API key is configured with the correct access rights." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const starterChips = [
    { label: "Suggest Veg under ₹200 🥬", prompt: "Recommend me vegetarian dishes on your menu that cost less than ₹200." },
    { label: "Add Thali to cart 🍱", prompt: "Add one Special Thali to my cart, please." },
    { label: "How to find you? 🗺️", prompt: "What is your physical address and phone number in Forbesganj?" },
    { label: "Party booking guidelines 💍", prompt: "How can I book an anniversary or birthday function table reservation here?" }
  ];

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-24 right-5 z-40 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="chat-floating-button"
          className="h-14 w-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-black flex items-center justify-center shadow-[0_8px_32px_rgba(255,107,0,0.5)] border-2 border-orange-500 animate-pulse active:scale-95 transition-all duration-300 cursor-pointer"
          title="Talk to AI Bawarchi Assistant"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={22} className="fill-black" />}
        </button>
      </div>

      {/* Floating Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="fixed bottom-40 right-5 left-5 md:left-auto md:w-96 h-[500px] bg-stone-950 border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 px-4 py-3.5 border-b border-white/5 flex items-center justify-between text-left">
              <div className="flex items-center space-x-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#00e676] animate-ping" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#00e676] absolute" />
                
                <div>
                  <h3 className="text-xs font-black text-white tracking-wider flex items-center">
                    AI BAWARCHI BOT
                    <Sparkles size={11} className="text-amber-400 ml-1" />
                  </h3>
                  <span className="text-[9.5px] text-[#00e676] font-mono">Secure Google Gemini 3.5 Active</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (confirm("Reset active conversation history?")) {
                      setMessages([]);
                    }
                  }}
                  className="text-[9.5px] font-bold text-zinc-500 hover:text-white"
                >
                  Clear chat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 font-bold bg-stone-900 border border-white/5 h-6 w-6 rounded-full flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat message space */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} text-left`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        isUser
                          ? "bg-orange-600 text-black font-semibold rounded-tr-none shadow"
                          : "bg-stone-900 text-zinc-100 border border-white/5 rounded-tl-none pr-4 shadow"
                      }`}
                    >
                      {/* Highlighted text styling */}
                      <span className="whitespace-pre-wrap select-text">{m.text}</span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start text-left">
                  <div className="bg-stone-900 border border-white/5 text-zinc-400 rounded-2xl rounded-tl-none p-3.5 text-xs text-center flex items-center space-x-2 shadow">
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                    </div>
                    <span>Cooking up reply...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Quick Chips */}
            {messages.length <= 1 && (
              <div className="p-3 bg-stone-900/40 border-t border-white/5">
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                  {starterChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPromptClick(chip.prompt)}
                      className="shrink-0 bg-stone-950 hover:bg-stone-900 border border-white/5 rounded-xl py-1.5 px-3 text-[10.5px] text-amber-400 font-semibold transition-all select-none whitespace-nowrap cursor-pointer hover:border-amber-400/25"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Footer */}
            <div className="p-3 bg-stone-950 border-t border-white/5 flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask AI: e.g. Add 2 Butter Naan"
                className="flex-1 bg-stone-900 border border-white/10 rounded-xl py-2 px-3.5 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-zinc-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="h-8 w-8 rounded-xl bg-orange-600 text-black flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer shrink-0"
              >
                <Send size={13} className="fill-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Global Toast confirmation and warning banner */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-6 right-6 z-50 text-center max-w-sm mx-auto select-none"
          >
            <div className="bg-[#00e676] text-black font-extrabold text-xs py-3 px-4 rounded-xl shadow-2xl flex items-center space-x-2 border border-black/10">
              <Sparkles size={14} className="animate-spin-slow rotate-12" />
              <span>{showToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

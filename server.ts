/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Setup Gemini Client Securely on Server Side as outlined in instructions
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': "aistudio-build",
        },
      },
    });
  } else {
    console.warn("Warning: GEMINI_API_KEY is not defined in process.env");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI client:", err);
}

// ----------------- SERVER SIDE API ROUTES -----------------

// Health status check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// Secure AI Waiter Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!ai) {
      return res.status(500).json({ 
        error: "GoogleGenAI Client not initialized. Please ensure your GEMINI_API_KEY is configured in Settings > Secrets." 
      });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // System instruction containing Spicy Bawarchi facts and food catalog
    const systemPrompt = `You are "AI Bawarchi Companion", the highly sophisticated virtual assistant of the ultra-premium restaurant SPICY BAWARCHI located in Forbesganj, Bihar.
Your personality is warm, informative, professional, and slightly poetic, fitting the tagline "Every Bite Tells A Story".

Restaurant Details:
- Name: SPICY BAWARCHI
- Tagline: "Every Bite Tells A Story"
- Location: Near Forbesganj College Flyover, In Front of Sant Nirankari Satsang Bhawan, Forbesganj, Bihar 854318
- Phone Number: 076430 97915
- Style: Premium Dark theme, Luxury Orange + Gold layout

Food Catalog Guidelines:
Here are the highlight items:
1. Paneer Butter Masala (₹210, Vegetables) - rich, creamy, mild cashew-butter tomato gravy.
2. Paneer Tikka Masala (₹260, Vegetables, Today's Special) - smoky charcoal grilled kebab pieces in tandoori tomato gravy.
3. Special Thali (₹210, Special Thali) - Wholesome plate of 2 butter rotis/1 naan, Dal Makhani, Mix Veg, Paneer Butter Masala, Jeera Rice, Salad, Papad. Fantastic value!
4. Jhol Momo (₹150, Momos) - Dumplings floating in roasted sesame tomato peanut broth. Tangy, warm.
5. Sizzler Momo (₹170, Momos) - Sizzling hot on skillet with spicy Schezwan glaze.
6. Baby Corn Crispy (₹220) / Honey Potato (₹140) / Chilly Paneer (₹220).
7. Tawa Veg (₹250, Vegetables, Bawarchi Special) - Chef special mixed veggies in dry pan roasted secret spices.
8. Yellow Dal Tadka (₹140) / Dal Makhani (₹170) / Cheese Naan (₹80) / Butter Naan (₹45) / Lassi (₹30) / Masala Coke (₹50).

Coupons/Offers:
- Use promo code BAWARCHI50 to get 15% discount on orders above ₹300.
- Use promo code FEAST20 to get 20% discount on family orders above ₹1000.

Your Task:
1. Reply to the customer's queries about food recommendations, ingredients, spicy levels, budget-friendly items, and table orders warmly.
2. Suggest 1 or 2 specific actual dishes on the menu that correspond to what they ask. Keep output clear and well-formatted.
3. CRITICAL: If the customer asks you to order a dish or expresses a firm desire to add an item to their cart (e.g., "Add 1 Paneer Tikka Masala to my cart", "Add Dal Makhani and Butter Naan", "I want to eat Special Thali"), you must append a structured command at the very end of your final text response inside the custom XML tags <cart_action>...</cart_action>.
The action block must be a valid JSON array of objects. Each object represents an item to add to the cart:
[{"action":"add","itemId":"[ITEM_ID_MAPPING]","quantity":1}]

Item IDs Mappings:
- Paneer Butter Masala: "veg-01"
- Paneer Kadhai: "veg-02"
- Paneer Tikka Masala: "veg-06"
- Special Thali: "thali-01"
- Paneer Tikka: "tandoor-01"
- Tandoori Momo: "tandoor-03"
- Lassi: "bev-06"
- Masala Coke: "bev-07"
- Veg Momo: "momo-01"
- Chilly Momo: "momo-03"
- Jhol Momo: "momo-04"
- Sizzler Momo: "momo-05"
- Paneer Chilly: "chilly-06"
- Chowmein: "node-01"
- Paneer Chowmein: "node-02"
- Veg Sizzler: "node-04"
- Fried Rice: "rice-03"
- Road Pulao: "rice-04"
- Yellow Dal Tadka: "dal-02"
- Dal Makhani: "dal-03"
- Butter Naan: "roti-04"
- Garlic Naan: "roti-05"
- Cheese Naan: "roti-07"

Example block:
<cart_action>[{"action":"add","itemId":"thali-01","quantity":1}]</cart_action>

Ensure your main text response is pure markdown and fits perfectly. Do not include unnecessary paths or coding jargon in explanations. Keep it humble, exquisite, and helpful!`;

    // Format chat history for generateContent
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Push current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const replyText = response.text || "I was unable to process your request. Please ask me about our gourmet menu details!";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat Proxy endpoint:", error);
    res.status(500).json({ error: error.message || "An error occurred in generating AI response." });
  }
});

// ----------------- VITE ENGINE INTEGRATION -----------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server middleware in developments
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from compiled dist folder in productions
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Spicy Bawarchi back-end listening at http://0.0.0.0:${PORT}`);
  });
}

start();

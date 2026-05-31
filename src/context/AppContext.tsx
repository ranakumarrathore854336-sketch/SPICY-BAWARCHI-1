/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, CartItem, Order, PartyBooking, Review, Offer, OrderStatus } from "../types";
import { INITIAL_MENU_ITEMS, OFFERS, REVIEWS } from "../data";

interface AppContextProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  bookings: PartyBooking[];
  offers: Offer[];
  reviews: Review[];
  favorites: string[];
  userName: string;
  tableNumber: string;
  activeTab: string;
  isAdminMode: boolean;
  setActiveTab: (tab: string) => void;
  setUserName: (name: string) => void;
  setTableNumber: (num: string) => void;
  setAdminMode: (admin: boolean) => void;
  
  // Cart Actions
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  decreaseCartQty: (itemId: string) => void;
  clearCart: () => void;
  
  // Menu Item Actions (Admin)
  addMenuItem: (item: MenuItem) => void;
  editMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenu: () => void;
  
  // Favorites
  toggleFavorite: (itemId: string) => void;
  
  // Order Actions
  placeOrder: (customerName: string, tableNumber: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  
  // Booking Actions
  addBooking: (booking: Omit<PartyBooking, "id" | "status" | "timestamp">) => PartyBooking;
  updateBookingStatus: (id: string, status: "Pending" | "Confirmed" | "Cancelled") => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence Loading
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem("spicy_menu");
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("spicy_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("spicy_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<PartyBooking[]>(() => {
    const saved = localStorage.getItem("spicy_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("spicy_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [userName, setUserNameState] = useState(() => {
    return localStorage.getItem("spicy_user_name") || "";
  });

  const [tableNumber, setTableNumberState] = useState(() => {
    return localStorage.getItem("spicy_table_number") || "";
  });

  const [activeTab, setActiveTab] = useState("home");
  const [isAdminMode, setAdminMode] = useState(false);
  const [offers] = useState<Offer[]>(OFFERS);
  const [reviews] = useState<Review[]>(REVIEWS);

  // Persistence Syncing
  useEffect(() => {
    localStorage.setItem("spicy_menu", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("spicy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("spicy_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("spicy_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("spicy_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem("spicy_user_name", name);
  };

  const setTableNumber = (num: string) => {
    setTableNumberState(num);
    localStorage.setItem("spicy_table_number", num);
  };

  // --- CART ACTIONS ---
  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + quantity } : c
        );
      }
      return [...prevCart, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.item.id !== itemId));
  };

  const decreaseCartQty = (itemId: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prevCart.map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prevCart.filter((c) => c.item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- MENU ACTIONS (ADMIN) ---
  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
  };

  const editMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetMenu = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem("spicy_menu");
  };

  // --- FAVORITES ---
  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // --- ORDER ACTIONS ---
  const placeOrder = (custName: string, tNum: string) => {
    if (cart.length === 0) return null;
    
    // Save customer name and table number details
    setUserName(custName);
    setTableNumber(tNum);

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: custName,
      tableNumber: tNum,
      items: cart.map((c) => ({
        itemId: c.item.id,
        name: c.item.name,
        price: c.item.price,
        quantity: c.quantity,
        isVeg: c.item.isVeg,
      })),
      totalAmount: cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0),
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  // --- BOOKING ACTIONS ---
  const addBooking = (bookingData: Omit<PartyBooking, "id" | "status" | "timestamp">) => {
    const newBooking: PartyBooking = {
      ...bookingData,
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: "Pending" | "Confirmed" | "Cancelled") => {
    setBookings((prev) =>
      prev.map((bkg) => (bkg.id === id ? { ...bkg, status } : bkg))
    );
  };

  return (
    <AppContext.Provider
      value={{
        menuItems,
        cart,
        orders,
        bookings,
        offers,
        reviews,
        favorites,
        userName,
        tableNumber,
        activeTab,
        isAdminMode,
        setActiveTab,
        setUserName,
        setTableNumber,
        setAdminMode,
        addToCart,
        removeFromCart,
        decreaseCartQty,
        clearCart,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        resetMenu,
        toggleFavorite,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        addBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

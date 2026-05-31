/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { HomeView } from "./components/HomeView";
import { MenuView } from "./components/MenuView";
import { OrdersView } from "./components/OrdersView";
import { ProfileView } from "./components/ProfileView";
import { AdminDashboard } from "./components/AdminDashboard";
import { BottomNavigation } from "./components/BottomNavigation";
import { PartyBookingModal } from "./components/PartyBookingModal";
import { SpicyWaiterBot } from "./components/SpicyWaiterBot";

function AppContent() {
  const { activeTab, isAdminMode } = useApp();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen relative font-sans flex flex-col antialiased">
      {/* Absolute Background Ambient Glow Elements */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-orange-600/5 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-[120px]"></div>
      
      {/* Scrollable Main body content layout container */}
      <main className="flex-1 max-w-md mx-auto w-full relative">
        {isAdminMode ? (
          <AdminDashboard />
        ) : (
          <>
            {activeTab === "home" && <HomeView onOpenBooking={() => setBookingOpen(true)} />}
            {activeTab === "menu" && <MenuView />}
            {activeTab === "orders" && <OrdersView />}
            {activeTab === "profile" && <ProfileView />}
          </>
        )}
      </main>

      {/* Floating AI Helper Bot companion (Accessible across all client pages!) */}
      {!isAdminMode && <SpicyWaiterBot />}

      {/* Fixed bottom navigation tabs */}
      {!isAdminMode && <BottomNavigation />}

      {/* Party reservation form popup dialog */}
      <PartyBookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  isTodaySpecial?: boolean;
  image: string;
  description: string;
  ingredients?: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    isVeg: boolean;
  }[];
  totalAmount: number;
  status: OrderStatus;
  timestamp: string; // ISO string
}

export interface PartyBooking {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  date: string;
  guestCount: number;
  requirements: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  timestamp: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  dishName?: string;
}

export interface Offer {
  id: string;
  code: string;
  discountPercent: number;
  title: string;
  description: string;
  minAmount: number;
  image: string;
}

import { Timestamp } from "firebase/firestore";

export type UserRole = "manager" | "user";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Bike {
  id: string;
  model: string;
  color: string;
  location: string;
  rating: number;
  isAvailableForRental: boolean;
  addedBy: string;
}

export interface BikeReservation {
  id: string;
  bikeId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  rating?: number;
  reservedBy: string;
  reservedOn: Timestamp;
}

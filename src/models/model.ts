import { Timestamp } from "firebase/firestore";

export type UserRole = "manager" | "user";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  addedOn: Timestamp;
  addedBy?: string;
  updatedOn?: Timestamp;
  updatedBy?: string;
}

export interface Bike {
  id: string;
  model: string;
  color: string;
  location: string;
  ratings: Record<string, number>;
  isAvailableForRental: boolean;
  addedOn: string;
  addedBy: string;
  updatedOn?: string;
  updatedBy?: string;
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

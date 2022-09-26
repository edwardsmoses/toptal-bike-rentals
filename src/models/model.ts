import { Timestamp } from "firebase/firestore";

export type UserRole = "manager" | "user";

export interface Entity {
  addedOn: Timestamp;
  addedBy?: string;
  updatedOn?: Timestamp;
  updatedBy?: string;
}

export interface User extends Entity  {
  id: string;
  fullName: string;
  email: string;
  role?: UserRole;
}

export interface Bike extends Entity {
  id: string;
  model: string;
  color: string;
  location: string;
  ratings: Record<string, number>;
  isAvailableForRental: boolean;
  reservationDates?: Record<string, [Timestamp, Timestamp]>;
  image?: string;
}

export interface BikeReservation extends Entity {
  id: string;
  bikeId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  rating?: number;
}

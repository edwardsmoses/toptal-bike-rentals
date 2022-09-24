export interface User {
  id: string;
  fullName: string;
  email: string;
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

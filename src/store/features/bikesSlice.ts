import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filter, find, map } from "lodash";
import { User, Bike, BikeReservation } from "models/model";
import { RootState } from "store/store";

type ReserveBikeState = {
  selectedBike?: Bike;
  reservationDate?: any;
};

interface BikeSlice {
  allBikes: Array<Bike>;
  allReservations: Array<BikeReservation>;
  reserveBike: ReserveBikeState;
}

const initialState: BikeSlice = {
  allBikes: [],
  allReservations: [],
  reserveBike: {
    reservationDate: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  },
};

const bikesSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    setBikes(state: BikeSlice, action: PayloadAction<Bike[]>) {
      state.allBikes = action.payload;
    },
    setReservations(state: BikeSlice, action: PayloadAction<BikeReservation[]>) {
      state.allReservations = action.payload;
    },
    setReserveBikeState(state: BikeSlice, action: PayloadAction<Partial<ReserveBikeState>>) {
      state.reserveBike = {
        ...(state.reserveBike || {}),
        ...action.payload,
      };
    },
    resetReserveBikeState(state: BikeSlice) {
      state.reserveBike = {
        ...initialState.reserveBike,
      };
    },
  },
});

const bikesActions = bikesSlice.actions;
const bikesReducer = bikesSlice.reducer;

export type BikeReservationSelectorResponse = BikeReservation & {
  bike: Bike;
};

export type AdminBikeReservationSelectorResponse = BikeReservation & {
  bike: Bike;
  user: User;
};

export const selectCurrentUserReservations = (state: RootState): BikeReservationSelectorResponse[] => {
  const reservations = state.bikes.allReservations;

  const response: BikeReservationSelectorResponse[] = [];

  map(reservations, (reservation) => {
    const bike = find(state.bikes.allBikes, (bike) => bike.id === reservation.bikeId);
    if (bike) {
      response.push({
        ...reservation,
        bike,
      });
    }
  });

  return response;
};

export const selectAllReservations = (state: RootState): AdminBikeReservationSelectorResponse[] => {
  const reservations = state.bikes.allReservations;

  const response: AdminBikeReservationSelectorResponse[] = [];

  map(reservations, (reservation) => {
    const bike = find(state.bikes.allBikes, (bike) => bike.id === reservation.bikeId);
    const user = find(state.allUsers.allUsers, (user) => user.id === reservation.reservedBy);

    if (bike && user) {
      response.push({
        ...reservation,
        bike,
        user,
      });
    }
  });

  return response;
};

export const selectBikeReservations = (state: RootState, bikeId: string): AdminBikeReservationSelectorResponse[] => {
  const reservations = selectAllReservations(state);
  return filter(reservations, (reservation) => reservation.bikeId === bikeId);
};

export const selectUserReservations = (state: RootState, userId: string): AdminBikeReservationSelectorResponse[] => {
  const reservations = selectAllReservations(state);
  return filter(reservations, (reservation) => reservation.reservedBy === userId);
};

export { bikesActions, bikesReducer };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { find, map } from "lodash";
import { Bike, BikeReservation } from "models/model";
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
      endDate: null,
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

type BikeReservationSelectorResponse = BikeReservation & {
  bike: Bike;
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

export { bikesActions, bikesReducer };

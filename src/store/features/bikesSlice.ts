import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { Bike } from "models/model";

type ReserveBikeState = {
  selectedBike?: Bike;
  reservationDate?: any;
};

interface BikeSlice {
  allBikes: Array<Bike>;
  reserveBike: ReserveBikeState;
}

const initialState: BikeSlice = {
  allBikes: [],
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

export { bikesActions, bikesReducer };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bike } from "models/model";

type ReserveBikeState = {
  selectedBike?: Bike;
  reservationDate?: number;
};

interface BikeSlice {
  allBikes: Array<Bike>;
  reserveBike: ReserveBikeState;
}

const initialState: BikeSlice = {
  allBikes: [],
  reserveBike: {},
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

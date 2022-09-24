import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bike } from "models/model";

interface BikeSlice {
  allBikes: Array<Bike>;
  currentUserBikes: Array<Bike>;
}

const initialState: BikeSlice = {
  allBikes: [],
  currentUserBikes: [],
};

const bikesSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    setBikes(state: BikeSlice, action: PayloadAction<Bike[]>) {
      state.allBikes = action.payload;
    },
    setCurrentUserBikes(state: BikeSlice, action: PayloadAction<Bike[]>) {
      state.currentUserBikes = action.payload;
    },
  },
});

const bikesActions = bikesSlice.actions;
const bikesReducer = bikesSlice.reducer;

export { bikesActions, bikesReducer };

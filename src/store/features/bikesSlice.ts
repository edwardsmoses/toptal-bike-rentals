import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bike } from "models/model";

interface BikeSlice {
  allBikes: Array<Bike>;
}

const initialState: BikeSlice = {
  allBikes: [],
};

const bikesSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    setBikes(state: BikeSlice, action: PayloadAction<Bike[]>) {
      state.allBikes = action.payload;
    },
  },
});

const bikesActions = bikesSlice.actions;
const bikesReducer = bikesSlice.reducer;

export { bikesActions, bikesReducer };

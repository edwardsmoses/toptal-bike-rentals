import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/model";
import { RootState } from "store/store";

interface CurrentUserSlice {
  user: User;
}

const initialState: CurrentUserSlice = {
  user: {
    email: "",
    fullName: "",
    id: "",
    role: "user",
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    updateCurrentUser(state: CurrentUserSlice, action: PayloadAction<Partial<User>>) {
      return {
        ...state,
        user: {
          ...(state.user || {}),
          ...(action.payload as User),
        },
      };
    },
    resetCurrentUser(state: CurrentUserSlice) {
      return {
        ...initialState,
      };
    },
  },
});

const currentUserActions = currentUserSlice.actions;
const currentUserReducer = currentUserSlice.reducer;

export { currentUserActions, currentUserReducer };

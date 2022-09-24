import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/model";

interface AllUsersSlice {
  allUsers: Array<User>;
}

const initialState: AllUsersSlice = {
  allUsers: [],
};

const usersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setUsers(state: AllUsersSlice, action: PayloadAction<User[]>) {
      state.allUsers = action.payload;
    },
  },
});

const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export { usersActions, usersReducer };

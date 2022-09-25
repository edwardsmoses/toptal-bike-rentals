import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find } from "lodash";
import { User } from "models/model";
import { RootState } from "store/store";

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

export const selectUser = (state: RootState, userId: string) => {
  return find(state.allUsers.allUsers, (user) => user.id === userId);
};

export { usersActions, usersReducer };

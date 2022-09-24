import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { currentUserReducer } from "./features/currentUserSlice";
import { bikesReducer } from "./features/bikesSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    bikes: bikesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<R> = ThunkAction<R, RootState, unknown, Action<any>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

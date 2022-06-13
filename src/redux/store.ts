import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserDataReducer from "./reducers/UserSlice";
import ActivityReducer from "./reducers/ActivitySlice";
import MonetaryReducer from "./reducers/MonetarySlice";
import DimensionsReducer from "./reducers/DimensionsSlice";

export const store = configureStore({
    reducer: {
        user: UserDataReducer,
        activity: ActivityReducer,
        monetary: MonetaryReducer,
        dimensions: DimensionsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

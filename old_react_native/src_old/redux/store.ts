import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
    ActivitySlice,
    DimensionsSlice,
    LoadingSlice,
    MonetarySlice,
    UserSlice,
} from "./reducers";

export const store = configureStore({
    reducer: {
        Activity: ActivitySlice,
        Dimensions: DimensionsSlice,
        Loading: LoadingSlice,
        Monetary: MonetarySlice,
        User: UserSlice,
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

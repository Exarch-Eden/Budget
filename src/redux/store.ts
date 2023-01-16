import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import DimensionsSlice from "./reducers/dimensions";
import PanResponderSlice from "./reducers/pan-responder";

export const store = configureStore({
    reducer: {
        Dimensions: DimensionsSlice,
        PanResponder: PanResponderSlice,
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

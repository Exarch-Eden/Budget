import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PanResponderReducer {
    gesture: {
        panGestureX: number | undefined;
        panGestureY: number | undefined;
        isPanning: boolean;
    };
}

const initialState: PanResponderReducer = {
    gesture: {
        panGestureX: undefined,
        panGestureY: undefined,
        isPanning: false,
    },
};

export const PanResponderSlice = createSlice({
    name: "PanResponder",
    initialState,
    reducers: {
        setPanGestureX: (state, action: PayloadAction<number>) => {
            state.gesture.panGestureX = action.payload;
        },
        setPanGestureY: (state, action: PayloadAction<number>) => {
            state.gesture.panGestureY = action.payload;
        },
        setIsPanning: (state, action: PayloadAction<boolean>) => {
            state.gesture.isPanning = action.payload;
        },
    },
});

export const { setPanGestureX, setPanGestureY, setIsPanning } =
    PanResponderSlice.actions;

export const selectPanGestureX = (state: RootState) =>
    state.PanResponder.gesture.panGestureX;
export const selectPanGestureY = (state: RootState) =>
    state.PanResponder.gesture.panGestureY;
export const selectIsPanning = (state: RootState) =>
    state.PanResponder.gesture.isPanning;

export default PanResponderSlice.reducer;

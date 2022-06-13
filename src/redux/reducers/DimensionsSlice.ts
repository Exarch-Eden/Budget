import { SliceCaseReducers, PayloadAction } from "@reduxjs/toolkit";
import { Dimensions } from "../../constants/types/dimensions";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

interface DimensionsRedux {
    dimensions: Dimensions;
}

const initialState: DimensionsRedux = {
    dimensions: {
        screenWidth: 0,
        screenHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
    },
};

const reducers: SliceCaseReducers<DimensionsRedux> = {
    setDimensions: (state, action: PayloadAction<Partial<Dimensions>>) => {
        console.log("Setting dimensions redux: \n", action.payload);

        state.dimensions = {
            ...state.dimensions,
            ...action.payload,
        };
    },
    setWindowWidth: (state, action: PayloadAction<number>) => {
        console.log("Setting window width redux: ", action.payload);

        state.dimensions.windowWidth = action.payload;
    },
    setWindowHeight: (state, action: PayloadAction<number>) => {
        console.log("Setting window height redux: ", action.payload);

        state.dimensions.windowHeight = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
        console.log("Setting screen width redux: ", action.payload);

        state.dimensions.screenWidth = action.payload;
    },
    setScreenHeight: (state, action: PayloadAction<number>) => {
        console.log("Setting screen height redux: ", action.payload);

        state.dimensions.screenHeight = action.payload;
    },
};

export const DimensionsSlice = createGenericSlice<DimensionsRedux>(
    "dimensions",
    initialState,
    reducers
);

export const {
    setDimensions,
    setWindowWidth,
    setWindowHeight,
    setScreenWidth,
    setScreenHeight,
} = DimensionsSlice.actions;

export const selectDimensions = (state: RootState) =>
    state.dimensions.dimensions;
export const selectScreenWidth = (state: RootState) =>
    state.dimensions.dimensions.screenWidth;
export const selectScreenHeight = (state: RootState) =>
    state.dimensions.dimensions.screenHeight;
export const selectWindowWidth = (state: RootState) =>
    state.dimensions.dimensions.windowWidth;
export const selectWindowHeight = (state: RootState) =>
    state.dimensions.dimensions.windowHeight;

export default DimensionsSlice.reducer;

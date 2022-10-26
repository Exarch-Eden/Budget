import {
    PayloadAction,
    SliceCaseReducers,
    current,
    createSlice,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { Dimensions as DimensionsNative } from "react-native";
import { Dimensions } from "../../types/misc";
import { RootState } from "../store";

interface DimensionsReducer {
    dimensions: Dimensions;
}

const initialState: DimensionsReducer = {
    dimensions: {
        windowWidth: DimensionsNative.get("window").width,
        windowHeight: DimensionsNative.get("window").height,
        screenWidth: DimensionsNative.get("screen").width,
        screenHeight: DimensionsNative.get("screen").height,
    },
};

export const DimensionsSlice = createSlice({
    name: "Dimensions",
    initialState,
    reducers: {
        setDimensions: (state, action: PayloadAction<Partial<Dimensions>>) => {
            console.log("Setting Dimensions redux:\n", action.payload);

            state.dimensions = {
                ...state.dimensions,
                ...action.payload,
            };
        },
        setScreenWidth: (state, action: PayloadAction<number>) => {
            console.log("Setting Screen Width: ", action.payload);

            state.dimensions.screenWidth = action.payload;
        },
        setScreenHeight: (state, action: PayloadAction<number>) => {
            console.log("Setting Screen Height: ", action.payload);

            state.dimensions.screenHeight = action.payload;
        },
        setWindowWidth: (state, action: PayloadAction<number>) => {
            console.log("Setting Window Width: ", action.payload);

            state.dimensions.windowWidth = action.payload;
        },
        setWindowHeight: (state, action: PayloadAction<number>) => {
            console.log("Setting Window Height: ", action.payload);

            state.dimensions.windowHeight = action.payload;
        },
    },
});
// export const DimensionsSlice = createGenericSlice<DimensionsReducer>('Dimensions', initialState, reducers);

// export the setters
export const {
    setDimensions,
    setScreenWidth,
    setScreenHeight,
    setWindowWidth,
    setWindowHeight,
} = DimensionsSlice.actions;

// export the getters
// RootState is the store's global state
export const selectDimensions = (state: RootState) =>
    state.Dimensions.dimensions;
export const selectScreenWidth = (state: RootState) =>
    state.Dimensions.dimensions.screenWidth;
export const selectScreenHeight = (state: RootState) =>
    state.Dimensions.dimensions.screenHeight;
export const selectWindowWidth = (state: RootState) =>
    state.Dimensions.dimensions.windowWidth;
export const selectWindowHeight = (state: RootState) =>
    state.Dimensions.dimensions.windowHeight;

// for the redux store
export default DimensionsSlice.reducer;

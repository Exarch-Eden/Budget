import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from "@reduxjs/toolkit";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

interface ActivityRedux {
    initialRender: boolean;
}

const initialState: ActivityRedux = {
    initialRender: true,
};

const reducers: SliceCaseReducers<ActivityRedux> = {
    passInitialRender: (state) => {
        console.log("app no longer in initial render");
        state.initialRender = false;
    },
};

export const activitySlice = createGenericSlice<ActivityRedux>(
    "activity",
    initialState,
    reducers
);

export const { passInitialRender } = activitySlice.actions;

export const selectInitialRender = (state: RootState) =>
    state.activity.initialRender;

export default activitySlice.reducer;

import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from "@reduxjs/toolkit";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

interface ActivityState {
    initialRender: boolean;
}

const initialState: ActivityState = {
    initialRender: true,
};

const reducers: SliceCaseReducers<ActivityState> = {
    passInitialRender: (state) => {
        console.log("app no longer in initial render");
        state.initialRender = false;
    },
};

export const activitySlice = createGenericSlice<ActivityState>(
    "activity",
    initialState,
    reducers
);

export const { passInitialRender } = activitySlice.actions;

export const selectInitialRender = (state: RootState) =>
    state.activity.initialRender;

export default activitySlice.reducer;

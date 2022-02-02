import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ActivityState {
    initialRender: boolean
}

const initialState: ActivityState = {
    initialRender: true
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        passInitialRender: (state) => {
            console.log('app no longer in initial render');
            state.initialRender = false
        }
    }
})

export const { passInitialRender } = activitySlice.actions

export const selectInitialRender = (state: RootState) => state.activity.initialRender

export default activitySlice.reducer

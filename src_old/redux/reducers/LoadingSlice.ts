import { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

interface LoadingRedux {
    isLoading: boolean;
}

const initialState: LoadingRedux = {
    isLoading: false,
}

const reducers: SliceCaseReducers<LoadingRedux> = {
    setLoading: (state, action: PayloadAction<boolean>) => {
        console.log('Setting loading redux: ', action.payload);
        
        state.isLoading = action.payload
    }
}

const LoadingSlice = createGenericSlice<LoadingRedux>(
    "Loading",
    initialState,
    reducers
)

export const {
    setLoading
} = LoadingSlice.actions

export const selectLoading = (state: RootState) => state.Loading.isLoading

export default LoadingSlice.reducer
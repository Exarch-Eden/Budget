import { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

export interface MonetaryData {
    value: number;
    // TODO: add support for multiple tags
    tag?: string;
    timestamp?: number;
}

export interface UserData {
    // income: number,
    // expenses: number,
    income: MonetaryData[];
    expenses: MonetaryData[];
    net: number;
    tags?: string[];
}

interface UserRedux {
    user: UserData;
}

const initialState: UserRedux = {
    user: {
        income: [],
        expenses: [],
        net: 0,
        // income: 0,
        // expenses: 0
    },
};

const reducers: SliceCaseReducers<UserRedux> = {
    setUserData: (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
    },
};

export const userDataSlice = createGenericSlice<UserRedux>(
    "user",
    initialState,
    reducers
);

export const { setUserData } = userDataSlice.actions;

export const selectUserData = (state: RootState) => state.user.user;

export default userDataSlice.reducer;

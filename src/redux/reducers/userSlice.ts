import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface MonetaryData {
    value: number,
    // TODO: add support for multiple tags
    tag?: string,
    timestamp?: number
}

export interface UserData {
    // income: number,
    // expenses: number,
    income: MonetaryData[],
    expenses: MonetaryData[],
    net: number,
    tags?: string[]
}

interface UserDataState {
    user: UserData
}

const initialState: UserDataState = {
    user: {
        income: [],
        expenses: [],
        net: 0
        // income: 0,
        // expenses: 0
    }
}

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload
        }
    }
})

export const { setUserData } = userDataSlice.actions

export const selectUserData = (state: RootState) => state.user.user

export default userDataSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface UserData {
    income: number,
    spendings: number
}

interface UserDataState {
    user: UserData
}

const initialState: UserDataState = {
    user: {
        income: 0,
        spendings: 0
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

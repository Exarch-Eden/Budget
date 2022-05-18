import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import UserDataReducer from './reducers/UserSlice'
import ActivityReducer from './reducers/ActivitySlice'

export const store = configureStore({
    reducer: {
        user: UserDataReducer,
        activity: ActivityReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
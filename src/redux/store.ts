import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import UserDataReducer from './reducers/userSlice'
import ActivityReducer from './reducers/activitySlice'

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
import {
    createSlice,
    Slice,
    SliceCaseReducers,
    ValidateSliceCaseReducers
} from "@reduxjs/toolkit"

export const createGenericSlice = <State>(
    name: string,
    initialState: State,
    reducers: ValidateSliceCaseReducers<State, SliceCaseReducers<State>>
): Slice<State> => {
    return createSlice({
        name,
        initialState,
        reducers
    })
}

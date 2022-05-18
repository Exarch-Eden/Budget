import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/types/types-external";

export type ReducerFunc<State, T> = (state: WritableDraft<State>, action: PayloadAction<T>) => void

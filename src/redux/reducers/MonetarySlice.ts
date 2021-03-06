import { SliceCaseReducers } from "@reduxjs/toolkit";

import { MonetaryData } from "../../constants/types/monetary-types";
import { ReducerFunc } from "../../constants/types/redux";
import { createGenericSlice } from "../GenericSlice";
import { RootState } from "../store";

interface MonetaryRedux {
    income: MonetaryData[];
    expenses: MonetaryData[];
    incomeVal: number;
    expensesVal: number;
}

type MonetaryReducer<T> = ReducerFunc<MonetaryRedux, T>;
type IncomeExpenseSetter = MonetaryReducer<MonetaryData[]>;

const initialState: MonetaryRedux = {
    income: [],
    expenses: [],
    incomeVal: 0,
    expensesVal: 0,
};

/**
 * Reduces an array of monetary data objects to the sum of all their
 * values.
 *
 * Used by the income and expenses setters.
 *
 * @param dataArr Monetary data array to reduce.
 * @returns Sum of all monetary data object values within the array.
 */
const monetaryDataReducer = (dataArr: MonetaryData[]) => {
    return dataArr
        .map((monetaryItem) => monetaryItem.value)
        .reduce((prev, cur) => prev + cur, 0);
};

/**
 * Redux setter for income array.
 * Also updates the incomeVal property based on the sum of all income values.
 *
 */
const setIncomeLocal: IncomeExpenseSetter = (state, action) => {
    console.log("setting income redux");

    state.income = action.payload;
    state.incomeVal = monetaryDataReducer(action.payload);
};

/**
 * Redux setter for expenses array.
 * Also updates the expensesVal property based on the sum of all expense values.
 *
 */
const setExpensesLocal: IncomeExpenseSetter = (state, action) => {
    console.log("setting expenses redux");

    state.expenses = action.payload;
    state.expensesVal = monetaryDataReducer(action.payload);
};

const reducers: SliceCaseReducers<MonetaryRedux> = {
    setIncome: setIncomeLocal,
    setExpenses: setExpensesLocal,
};

export const monetaryDataSlice = createGenericSlice(
    "Monetary",
    initialState,
    reducers
);

export const { setIncome, setExpenses } = monetaryDataSlice.actions;

export const selectIncome = (state: RootState) => state.Monetary.income;
export const selectExpenses = (state: RootState) => state.Monetary.expenses;

export const selectIncomeVal = (state: RootState) => state.Monetary.incomeVal;
export const selectExpensesVal = (state: RootState) =>
    state.Monetary.expensesVal;

export default monetaryDataSlice.reducer;

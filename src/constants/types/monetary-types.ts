export type ChosenMonetaryType = 'income' | 'expense'

export interface MonetaryData {
    value: number,
    tags: string[],
    timestamp?: number
}

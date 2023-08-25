export type ChosenMonetaryType = "income" | "expense";

export interface MonetaryData {
    value: number;
    category?: string;
    tags: string[];
    timestamp?: number;
}

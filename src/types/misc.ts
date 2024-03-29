/**
 * This type file is where non-dependent, single types are hosted.
 */

export type Timestamp = number // moment() should always be used to determine timestamp value

export type Currency = "CAD" | "USD"

export type PaymentMethod = "Cash" | "Debit" | "Credit"

export interface Dimensions {
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
}

export type TextSize = "small" | "medium" | "large"

/**
 * Used to store dimension ratios of components
 * based on their Figma design.
 */
export interface SizeRatioConstant {
    WIDTH: number,
    HEIGHT: number
}

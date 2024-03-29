import { StyleSheet } from "react-native"

const COLORS = {
    PRIMARY: {
        Dark: "#1F1C1F",
        Light: "#C6B093",
        Red: "#EB5757",
        Green: "#6FCF97",
        Yellow: "#F2C94C",
    },
    SECONDARY: {
        Dark: "#3A343A",
        Red: "red",
        // Red: '#E62929',
        Green: "#4D8F68",
        // Green: 'green',
        // Green: '#49C27B',
        Yellow: "yellow",
        // Yellow: '#EFBB1C'
    }
}

const SPACING = {
    BORDER_RADIUS: 9.03, // for border radius
    GENERAL: 18 // for general margins and padding
}

const TEXT = StyleSheet.create({
    Small: {
        color: COLORS.PRIMARY.Light,
        fontSize: 16
    },
    Medium: {
        color: COLORS.PRIMARY.Light,
        fontSize: 20
    },
    Large: {
        color: COLORS.PRIMARY.Light,
        fontSize: 24
    },
})

export {
    COLORS,
    SPACING,
    TEXT
}
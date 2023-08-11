import { StyleSheet } from "react-native";
import THEME from "./theme";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        backgroundColor: THEME.PRIMARY.Dark,
        padding: 20,
    },
    textSmall: {
        color: THEME.PRIMARY.Light,
        fontSize: 16,
    },
    textNormal: {
        color: THEME.PRIMARY.Light,
        fontSize: 20,
    },
    textLarge: {
        color: THEME.PRIMARY.Light,
        fontSize: 24,
    },
});

export default styles;

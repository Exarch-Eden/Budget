import { View, Text, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { COLORS, SPACING } from "../../styles";

interface RoundedContainerProps extends ViewProps {
    children?: React.ReactNode
}

const RoundedContainer: React.FC<RoundedContainerProps> = ({
    children,
    style,
    ...rest
}) => {
    return (
        <View style={[styles.container, style]} {...rest}>
            {React.Children.toArray(children)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: SPACING.BORDER_RADIUS,
        padding: SPACING.GENERAL,
        backgroundColor: COLORS.SECONDARY.Dark,
        flex: 1
    }
})

export default RoundedContainer;

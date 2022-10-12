import { View, Text, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { SPACING } from "../../styles";

interface RoundedContainerProps extends ViewProps {
    children?: React.ReactNode
}

const RoundedContainer: React.FC<RoundedContainerProps> = ({
    children,
    ...rest
}) => {
    return (
        <View style={styles.container} {...rest}>
            {React.Children.toArray(children)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: SPACING.BORDER_RADIUS,
        padding: SPACING.GENERAL
    }
})

export default RoundedContainer;

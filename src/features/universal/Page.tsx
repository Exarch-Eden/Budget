import { View, Text, SafeAreaView, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { COLORS } from "../../styles";

interface PageProps extends ViewProps {
    children?: React.ReactNode[]
}

const Page: React.FC<PageProps> = ({
    children,
    style,
    ...rest
}) => {
    return (
        <SafeAreaView style={[styles.container, style]} {...rest}>
            {React.Children.toArray(children)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY.Dark
    }
})

export default Page;

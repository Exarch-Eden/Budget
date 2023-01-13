import { View, Text, SafeAreaView, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { COLORS, SPACING } from "../../styles";

interface PageProps extends ViewProps {
    noPadding?: boolean;
    children?: React.ReactNode[] | React.ReactElement[];
}

const Page: React.FC<PageProps> = ({ children, noPadding, style, ...rest }) => {
    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    padding: noPadding ? 0 : SPACING.GENERAL,
                },
                style,
            ]}
            {...rest}
        >
            {React.Children.toArray(children)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY.Dark,
    },
});

export default Page;

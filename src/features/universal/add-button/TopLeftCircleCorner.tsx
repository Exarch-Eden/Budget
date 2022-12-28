import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../../styles";

interface TopLeftCircleCornerProps {
    containerDim: number;
    children?: React.ReactNode | React.ReactElement[];
}

const TopLeftCircleCorner: React.FC<TopLeftCircleCornerProps> = ({
    containerDim,
    children,
}) => {
    return (
        <View
            // view-only attempt of corner circle background
            style={[
                styles.positionAbsolute,
                {
                    width: containerDim,
                    height: containerDim,
                    borderRadius: containerDim / 2,
                    backgroundColor: COLORS.SECONDARY.Dark,
                    // shift the circle such that the top left corner is visible only
                    right: -containerDim / 2,
                    bottom: -containerDim / 2,
                    // TODO: add shadow to separate secondary dark colour from the RoundedContainer colour
                    // NOTE: temporary solution to the above TODO
                    borderColor: COLORS.PRIMARY.Light,
                    borderWidth: 1,
                },
            ]}
        >
            {/* <SvgXml
            // TODO: use containerDim instead of hard-coded constants
            // width={65}
            // height={65}
            width={containerDim}
            height={containerDim}
            // TESTING
            // width={windowWidth * 0.8}
            // height={windowWidth * 0.8}
            xml={topleftQuarterCircle}
            style={[
                styles.positionAbsolute,
                // TESTING
                {
                    borderColor: "red",
                    borderWidth: 1,
                },
            ]}
            // TESTING
            // stroke="blue"
        /> */}
            {React.Children.toArray(children)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: COLORS.SECONDARY.Dark,
        position: "absolute",
    },
    positionAbsolute: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    plusIcon: {
        // color: COLORS.PRIMARY.Light,
    },
});

export default TopLeftCircleCorner;

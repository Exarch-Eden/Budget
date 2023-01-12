import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../../../styles";

interface PlusIconViewProps {
    containerDim: number;
}

const PlusIconView: React.FC<PlusIconViewProps> = ({ containerDim }) => {
    return (
        <View
            // view-only attempt of + icon
            style={[
                styles.positionAbsolute,
                {
                    width: 25,
                    height: 25,
                    // divide 4 to get the bottom point of the top left circle corner
                    // divide 1.5 to get the mid point of the top left circle corner
                    top: containerDim / 4 / 1.5,
                    left: containerDim / 4 / 1.5,
                    // TESTING
                    // borderColor: "green",
                    // borderWidth: 1
                },
            ]}
        >
            <View
                style={[
                    styles.positionAbsolute,
                    {
                        height: 2,
                        backgroundColor: COLORS.PRIMARY.Light,
                        top: 25 / 2,
                        left: 0,
                    },
                ]}
            ></View>
            <View
                style={[
                    styles.positionAbsolute,
                    {
                        height: 2,
                        backgroundColor: COLORS.PRIMARY.Light,
                        top: 25 / 2,
                        left: 0,
                        transform: [
                            {
                                rotate: "90deg",
                            },
                        ],
                    },
                ]}
            ></View>
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

export default PlusIconView;

import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    PanResponderInstance,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FAB } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { COLORS } from "../../../styles";
import useDimensions from "../../../hooks/useDimensions";
import {
    FLOATING_ADD_BUTTON,
    FLOATING_ADD_BUTTON_PLUS_ICON,
} from "../../../constants/sizes";
import { plusIcon, topleftQuarterCircle } from "../../../assets/svg";
import { PanResponder } from "react-native";
import PlusIconView from "./add-button/PlusIconView";
import TopLeftCircleCorner from "./add-button/TopLeftCircleCorner";
import { navigationRef } from "../../../helpers/navigation";

interface AddButtonProps {
    gestureRef?: PanResponderInstance;
}

const AddButton: React.FC<AddButtonProps> = (
    {
        // gestureRef
    }
) => {
    // used by animated api and styling
    const { windowWidth, windowHeight } = useDimensions();
    const [panGestureX, setPanGestureX] = useState<number | undefined>();
    const [panGestureY, setPanGestureY] = useState<number | undefined>();
    const [isPanning, setIsPanning] = useState(false);
    // if set to true, will navigate to the add value modal or screen
    const [isTriggered, setIsTriggered] = useState(false);

    // the X px value
    const animX = useRef(new Animated.Value(0)).current;
    // the Y px value
    const animY = useRef(new Animated.Value(0)).current;

    // width and height of the Animated.View container
    const containerDim = windowWidth * FLOATING_ADD_BUTTON;

    // ratio is relative to container dimensions
    const plusIconDim = containerDim * FLOATING_ADD_BUTTON_PLUS_ICON;

    const plusIconTranslation =
        // containerDim +
        0.707 * (containerDim / 2) + plusIconDim / 2;
    // ((containerDim / 2))  + (plusIconDim / 2)
    // (Math.cos(3 * Math.PI / 4) * (containerDim / 2))

    useEffect(() => {
        console.log("isPanning: ", isPanning);

        if (!isPanning) {
            // NOTE: 0, 0 is at the top left corner of the screen
            const xCondition = typeof panGestureX === "number" && panGestureX <= windowWidth / 2
            const yCondition = typeof panGestureY === "number" && panGestureY <= windowHeight / 2

            console.log("xCondition: ", xCondition);
            console.log("yCondition: ", yCondition);
            
            setIsTriggered(xCondition || yCondition)
        }
    }, [isPanning])

    // TESTING
    useEffect(() => {
        console.log("isTriggered: ", isTriggered);
        if (isTriggered) {
            navigationRef.current?.navigate("AddValue")
        }
        setIsTriggered(false)
    }, [isTriggered])

    // // TESTING
    // useEffect(() => {
    //     console.log(`(${panGestureX}, ${panGestureY})`);
    // }, [panGestureX, panGestureY])

    return (
        <Animated.View
            style={[
                styles.positionAbsolute,
                {
                    // TODO: increase value
                    width: containerDim,
                    height: containerDim,
                    // TESTING
                    borderColor: "red",
                    borderWidth: 1,
                    // NOTE: old code
                    // width: containerDim * 2,
                    // height: containerDim * 2,
                    // right: -containerDim,
                    // bottom: -containerDim,
                    // borderRadius: containerDim // * 2 * 0.5 for circle
                },
            ]}
            {...gestureRef?.panHandlers}
        >
            <TopLeftCircleCorner containerDim={containerDim}>
                <PlusIconView containerDim={containerDim} />
            </TopLeftCircleCorner>
        </Animated.View>
        // </View>
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

export default AddButton;

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
import { COLORS } from "../../styles";
import useDimensions from "../../hooks/useDimensions";
import {
    FLOATING_ADD_BUTTON,
    FLOATING_ADD_BUTTON_PLUS_ICON,
} from "../../constants/sizes";
import { plusIcon, topleftQuarterCircle } from "../../assets/svg";
import { PanResponder } from "react-native";

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
    const [panGestureX, setPanGestureX] = useState(0);
    const [panGestureY, setPanGestureY] = useState(0);

    // const gestureRef = useRef<TouchableOpacity>(null!);
    // NOTE: PanResponder's onPanResponderMove works almost as intended:
    // it terminates after only a few logs for some reason
    // TODO: test PanResponder with the root App component to see if it terminates almost immediately as well
    // if PanResponder works better in the App component, will have to connect it to this one
    // docs:
    // https://reactnative.dev/docs/gesture-responder-system
    // https://reactnative.dev/docs/panresponder
    // NOTE: below link details the issue with svgs and pan responder
    // https://github.com/software-mansion/react-native-svg/issues/473
    const gestureRef = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                console.log("gesture granted: ", evt.nativeEvent.identifier);
            },
            onPanResponderReject: () => {
                // TESTING
                console.log("gesture rejected");
            },
            onPanResponderMove: (evt, gestureState) => {
                const event = evt.nativeEvent;
                const rootX = event.pageX;
                const rootY = event.pageY;

                console.log(`gesture (x, y): (${rootX}, ${rootY})`);
            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                console.log("gesture released");
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled

                console.log("gesture terminated: ", evt.nativeEvent.identifier);
            },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return false;
            },
        })
    ).current;

    // width and height of the Animated.View container
    const containerDim = windowWidth * FLOATING_ADD_BUTTON;
    // TESTING
    // const containerDim = windowWidth * 0.8;
    // ratio is relative to container dimensions
    const plusIconDim = containerDim * FLOATING_ADD_BUTTON_PLUS_ICON;

    const plusIconTranslation =
        // containerDim +
        0.707 * (containerDim / 2) + plusIconDim / 2;
    // ((containerDim / 2))  + (plusIconDim / 2)
    // (Math.cos(3 * Math.PI / 4) * (containerDim / 2))

    // the X px value
    const animX = useRef(new Animated.Value(0)).current;
    // the Y px value
    const animY = useRef(new Animated.Value(0)).current;

    // // TESTING
    // useEffect(() => {
    //     console.log("containerDim: ", containerDim);
    // }, [containerDim]);

    // // TESTING
    // useEffect(() => {
    //     console.log("plusIconDim: ", plusIconDim);
    // }, [plusIconDim]);

    // // TESTING
    // useEffect(() => {
    //     console.log("plusIconTranslation: ", plusIconTranslation);
    // }, [plusIconTranslation])

    // useEffect(() => {
    //     if (!gestureRef) return;

    //     const curRef = gestureRef.current

    // }, [gestureRef])

    return (
        // NOTE: old code
        // <View style={styles.container}>
        //     <Text style={styles.plusIcon}>+</Text>
        // </View>
        // NOTE: new animated.view code
        // <View
        //     // ref={gestureRef}
        // >
        <Animated.View
            style={[
                styles.positionAbsolute,
                {
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
                    // NOTE: newer-ish code
                    // right: 0,
                    // bottom: 0
                },
            ]}
            {...gestureRef?.panHandlers}
        >
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
                        borderWidth: 1
                    }
                ]}
                // {...gestureRef.panHandlers}
            >
            <View
                // view-only attempt of + icon
                style={[
                    styles.positionAbsolute,
                    {
                        width: 25,
                        height: 25,
                        top: containerDim / 4 / 1.5,
                        left: containerDim / 4 / 1.5,
                        // TESTING
                        // borderColor: "green",
                        // borderWidth: 1
                    }
                ]}
            >
                <View 
                    style={[
                        styles.positionAbsolute,
                        {
                            height: 2,
                            backgroundColor: COLORS.PRIMARY.Light,
                            top: 25 /2,
                            left: 0
                        }
                    ]}
                >
                </View>
                <View 
                    style={[
                        styles.positionAbsolute,
                        {
                            height: 2,
                            backgroundColor: COLORS.PRIMARY.Light,
                            top: 25 /2,
                            left: 0,
                            transform: [
                                {
                                    rotate: "90deg"
                                }
                            ]
                        }
                    ]}
                >
                </View>
            </View>
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
            </View>
            {/* <SvgXml
                    // TODO: use containerDim for dynamic values
                    // width={25}
                    // height={25}
                    width={plusIconDim}
                    height={plusIconDim}
                    xml={plusIcon}
                    style={[
                        {
                            position: "absolute",
                            // top: 0,
                            // left: 0,
                            top: -plusIconTranslation,
                            left: -plusIconTranslation,
                            // transform: [
                            //     {
                            //         translateX: -plusIconDim / 2,
                            //     },
                            //     {
                            //         translateY: -plusIconDim / 2,
                            //     },
                            // ],
                            // transform: [
                            //     {
                            //         translateX: -plusIconTranslation,
                            //     },
                            //     {
                            //         translateY: -plusIconTranslation,
                            //     },
                            // ],
                            // TESTING
                            borderColor: "green",
                            borderWidth: 1
                        },
                    ]}
                    {...gestureRef.panHandlers}
                /> */}
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

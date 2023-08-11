import { useRef, useState } from "react";
import { PanResponder } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    selectIsPanning,
    selectPanGestureX,
    selectPanGestureY,
    setIsPanning,
    setPanGestureX,
    setPanGestureY,
} from "../redux/reducers/pan-responder";

const usePanResponder = () => {
    // const [panGestureX, setPanGestureX] = useState(0)
    // const [panGestureY, setPanGestureY] = useState(0)
    // const [isPanning, setIsPanning] = useState(false)

    const panGestureX = useAppSelector(selectPanGestureX);
    const panGestureY = useAppSelector(selectPanGestureY);
    const isPanning = useAppSelector(selectIsPanning);

    const dispatch = useAppDispatch()

    // NOTE: docs below
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

                dispatch(setIsPanning(true))
            },
            onPanResponderReject: () => {
                // TESTING
                console.log("gesture rejected");
            },
            onPanResponderMove: (evt, gestureState) => {
                const event = evt.nativeEvent;
                const rootX = event.pageX;
                const rootY = event.pageY;

                // console.log(`gesture (x, y): (${rootX}, ${rootY})`);
                dispatch(setPanGestureX(rootX))
                dispatch(setPanGestureY(rootY))
            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                const rootX = evt.nativeEvent.pageX;
                const rootY = evt.nativeEvent.pageY;

                console.log(`gesture released at (${rootX}, ${rootY})`);

                dispatch(setIsPanning(false))
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

    return {
        gestureRef,
        panGestureX,
        panGestureY,
        isPanning
    };
};

export default usePanResponder;

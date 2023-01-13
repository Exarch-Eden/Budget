import { useRef, useState } from "react"
import { PanResponder } from "react-native"

const usePanResponder = () => {
    const [panGestureX, setPanGestureX] = useState(0)
    const [panGestureY, setPanGestureY] = useState(0)

    const gestureRef = useRef(
        PanResponder.create({
            // onStartShouldSetPanResponder: () => true,
            // onStartShouldSetPanResponderCapture: () => true,
            // onMoveShouldSetPanResponder: () => true,
            // onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (event) => {
                // TESTING
                console.log("root gesture granted: ", event.nativeEvent.identifier);
            },
            onPanResponderMove: (event, gestureState) => {
                const rootX = event.nativeEvent.pageX;
                const rootY = event.nativeEvent.pageY;

                // TESTING
                console.log(`root gesture (x, y): (${rootX}, ${rootY})`);

                // TODO: add setter logic here for the x and y
            },
            onPanResponderTerminate: (event, gestureState) => {
                // TESTING
                console.log("root gesture terminated: ", event.nativeEvent.identifier);
            },
            onPanResponderTerminationRequest: () => true,
            onShouldBlockNativeResponder: () => false
        })
    ).current

    return {
        gestureRef
    }
}

export default usePanResponder
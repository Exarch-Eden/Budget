import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    selectDimensions,
    setDimensions,
    setScreenHeight,
    setScreenWidth,
    setWindowHeight,
    setWindowWidth,
} from "../redux/reducers/DimensionsSlice";
import { Dimensions as DimensionsType } from "../constants/types/dimensions";

const useDimensions = () => {
    const dimensions = useAppSelector(selectDimensions);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const window = Dimensions.get("window");
        const screen = Dimensions.get("screen");

        // initial values
        const initialDimensions: DimensionsType = {
            windowWidth: window.width,
            windowHeight: window.height,
            screenWidth: screen.width,
            screenHeight: screen.height,
        };

        // setting initial values
        dispatch(setDimensions(initialDimensions));

        Dimensions.addEventListener("change", ({ window, screen }) => {
            const wWidth = window.width;
            const wHeight = window.height;
            const sWidth = screen.width;
            const sHeight = screen.height;

            console.log("width change:\n", {
                width: wWidth,
                height: wHeight,
            });

            console.log("screen change:\n", {
                width: sWidth,
                height: sHeight,
            });

            // if there are changes (unequal values) with a field,
            // write to redux

            if (wWidth !== dimensions.windowWidth) {
                dispatch(setWindowWidth(wWidth));
            }
            if (wHeight !== dimensions.windowHeight) {
                dispatch(setWindowHeight(wHeight));
            }
            if (sWidth !== dimensions.screenWidth) {
                dispatch(setScreenWidth(sWidth));
            }
            if (sHeight !== dimensions.screenHeight) {
                dispatch(setScreenHeight(sHeight));
            }
        });
    }, []);

    return dimensions;
};

export { useDimensions };

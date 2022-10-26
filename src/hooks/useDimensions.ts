import { setScreenHeight, setScreenWidth, setWindowHeight, setWindowWidth } from "../../src_old/redux/reducers/DimensionsSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectDimensions, setDimensions } from "../redux/reducers/dimensions"
import { Dimensions } from "../types/misc"

const useDimensions = () => {
    const dimensions = useAppSelector(selectDimensions)

    const dispatch = useAppDispatch()

    return {
        screenWidth: dimensions.screenWidth,
        screenHeight: dimensions.screenHeight,
        windowWidth: dimensions.windowWidth,
        windowHeight: dimensions.windowHeight,
        setScreenWidth: (width: number) => dispatch(setScreenWidth(width)),
        setScreenHeight: (height: number) => dispatch(setScreenHeight(height)),
        setWindowWidth: (width: number) => dispatch(setWindowWidth(width)),
        setWindowHeight: (height: number) => dispatch(setWindowHeight(height)),
        setDimensions: (dimensions: Dimensions) => dispatch(setDimensions(dimensions))
    }
}

export default useDimensions
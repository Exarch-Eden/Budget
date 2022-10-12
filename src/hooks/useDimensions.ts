import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectDimensions } from "../redux/reducers/dimensions"

const useDimensions = () => {
    const dimensions = useAppSelector(selectDimensions)

    const dispatch = useAppDispatch()

    
}

export default useDimensions
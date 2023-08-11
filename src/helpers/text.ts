import { TEXT } from "../styles";
import { TextSize } from "../types/misc";

const getTextStyleFromSize = (size: TextSize) => {
    switch (size) {
        case "small":
            return TEXT.Small
        case "large":
            return TEXT.Large
        default:
            return TEXT.Medium
    }
}

export {
    getTextStyleFromSize
}
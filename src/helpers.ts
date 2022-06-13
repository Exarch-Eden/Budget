import {
    MessageOptions as MessageOptionsNative,
    MessageType,
    Position,
    showMessage as showMessageNative,
} from "react-native-flash-message";

// remove required "message" prop in interface (because helper functions
// already have it as a mandatory parameter)
interface MessageOptions extends Omit<MessageOptionsNative, "message"> {}

type ShowMessageFunc = (
    message: string,
    description?: string,
    type?: MessageType,
    duration?: number,
    position?: Position,
    rest?: MessageOptions
) => void;

type ShowMessageAltFunc = (
    message: string,
    description?: string,
    duration?: number,
    rest?: MessageOptions
) => void;

const showMessage: ShowMessageFunc = (
    message,
    description = "",
    type = "default",
    duration = 3000,
    position = "top",
    rest = {}
) => {
    showMessageNative({
        message,
        description,
        type,
        duration,
        position,
        ...rest,
    });
};

const showDanger: ShowMessageAltFunc = (
    message,
    description,
    duration = 5000,
    rest
) => {
    showMessage(message, description, "danger", duration, undefined, rest);
};

const showSuccess: ShowMessageAltFunc = (
    message,
    description,
    duration,
    rest
) => {
    showMessage(message, description, "success", duration, undefined, rest);
};

const getRandomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
    );

export default {
    showMessage,
    showDanger,
    showSuccess,
    getRandomColor,
};

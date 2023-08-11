import {
    View,
    Text as TextNative,
    TextProps as TextPropsNative,
    StyleSheet,
} from "react-native";
import React from "react";
import { getTextStyleFromSize } from "../../helpers/text";
import { TextSize } from "../../types/misc";
import { COLORS } from "../../styles";

interface TextProps extends TextPropsNative {
    isDark?: boolean;
    size?: TextSize;
    children?: string;
}

const ThemedText: React.FC<TextProps> = ({
    isDark,
    size = "medium",
    style,
    children,
    ...rest
}) => {
    return (
        <TextNative
            style={[
                getTextStyleFromSize(size),
                {
                    color: isDark
                        ? COLORS.SECONDARY.Dark
                        : COLORS.PRIMARY.Light,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </TextNative>
    );
};

export default ThemedText;

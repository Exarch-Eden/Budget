import React, { FC } from "react";
import { StyleProp, Text as TextNative, TextProps as TextPropsNative, TextStyle } from "react-native";
import { THEME, STYLES } from '../styles'

interface TextProps extends TextPropsNative {
    dark?: boolean,
    style?: StyleProp<TextStyle>
    rest?: TextPropsNative,
    children?: React.ReactNode
}

const Text: React.FC<TextProps> = ({ dark, style, rest, children }) => {

    return (
        <TextNative style={[
            style,
            { color: dark ? THEME.SECONDARY.Dark : THEME.PRIMARY.Light }
        ]}
            {...rest}
        >
            {React.Children.toArray(children)}
        </TextNative>
    )
}

export default Text
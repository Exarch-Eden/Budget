import React, { FC } from "react";
import { StyleProp, Text as TextNative, TextProps as TextPropsNative, TextStyle } from "react-native";
import { THEME, STYLES } from '../styles'

type TextSize = 'small' | 'medium' | 'large'

interface TextProps extends TextPropsNative {
    dark?: boolean,
    style?: StyleProp<TextStyle>,
    size?: TextSize,
    children?: React.ReactNode
}

/**
 * Custom Text wrapped under react-native's own Text component.
 * Automatically utilizes the app's theme as colour.
 * 
 * @param {boolean} dark Switch text colour to Secondary Dark.
 * @param {StyleProp<TextStyle>} style Custom style props for react-native Text component.
 * @param {TextSize} size Choose between different font size presets.
 */
const Text: React.FC<TextProps> = ({ dark, style, size, children, ...rest }) => {
    return (
        <TextNative
            style={[
                getTextStyleFromSize(size),
                { color: dark ? THEME.SECONDARY.Dark : THEME.PRIMARY.Light },
                style
            ]}
            {...rest}
        >
            {`${children}`}
            {/* {React.Children.toArray(children)} */}
        </TextNative>
    )
}

/**
 * Returns a text style preset based on given size.
 * 
 * @param size Different font size presets.
 */
const getTextStyleFromSize = (size?: TextSize) => {
    if (!size) return

    let retStyle

    switch (size) {
        case 'small':
            retStyle = STYLES.textSmall
            break
        case 'medium':
            retStyle = STYLES.textNormal
            break
        case 'large':
            retStyle = STYLES.textLarge
            break
        default:
            retStyle = STYLES.textNormal
    }

    return retStyle
}

export default Text
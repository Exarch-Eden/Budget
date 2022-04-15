import React, { FC, ReactNode } from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native'
import { THEME } from '../styles'

interface GenericButtonProps {
    onPress?: () => void,
    isSelected?: boolean,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    label?: string,
    children?: ReactNode
}

const Button: FC<GenericButtonProps> = ({
    onPress,
    isSelected,
    style,
    textStyle,
    label,
    children,
    ...rest
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chosenTypeButton,
                { backgroundColor: isSelected ? THEME.PRIMARY.Light : 'transparent' },
                style
            ]}
            {...rest}
        >
            {
                children
                    ? React.Children.toArray(children)
                    :
                    <Text
                        style={[
                            { color: isSelected ? THEME.SECONDARY.Dark : THEME.PRIMARY.Light },
                            textStyle
                        ]}
                    >
                        {`${label}`}
                    </Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chosenTypeButton: {
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: THEME.PRIMARY.Light,
        alignItems: 'center'
    },
})

export default Button
import React, { FC, ReactNode } from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native'

interface GenericButtonProps {
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    label?: string,
    children?: ReactNode
}

const GenericButton: FC<GenericButtonProps> = ({
    onPress,
    style,
    textStyle,
    label,
    children,
    ...rest
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.chosenTypeButton, style]}
            {...rest}
        >
            {
                children
                    ? React.Children.toArray(children)
                    :
                    <Text style={textStyle}>
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
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center'
    },
})

export default GenericButton
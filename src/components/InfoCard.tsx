import React, { FC } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { THEME } from '../styles'

interface InfoCardProps {
    customStyle?: ViewStyle
    children?: React.ReactNode
}

const InfoCard: FC<InfoCardProps> = ({ customStyle, children }) => {
    return (
        <View style={[styles.container, customStyle]}>
            {React.Children.toArray(children)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.SECONDARY.Dark,
        padding: 20,
        width: '100%',
        borderRadius: 9
    }
})

export default InfoCard
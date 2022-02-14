import { StyleSheet } from 'react-native'
import THEME from './theme'

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: THEME.PRIMARY.Dark
    },
    textNormal: {
        color: THEME.PRIMARY.Light,
        fontSize: 20,
    }
})

export default styles
import { View } from 'react-native'
import React from 'react'
import Page from '../../components/Page'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

/**
 * This is the landing page.
 */
const Landing = () => {
    const navigation = useNavigation()

    return (
        <Page>
            <Text style={{ marginBottom: 10 }}>Landing Page</Text>
            <Button onPress={() => navigation.navigate('Home')} label='Guest' />
            <Button label='Login' />
        </Page>
    )
}

export default Landing
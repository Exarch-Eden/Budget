import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import { THEME } from './src/styles';
import { homeSvg, addSvg, settingsSvg } from './src/assets/svgs/navigation'
import { SvgXml } from 'react-native-svg';
import GenericModal from './src/components/GenericModal';

type TAB_NAMES = 'Dashboard' | 'Add' | 'Setting'

const App = () => {
    const Stack = createStackNavigator()

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name='Home' component={MainBottomTab} />
                </Stack.Navigator>
                <FlashMessage position='top' />
            </NavigationContainer>
        </Provider>
    )
};

const AddModal = () => {
    return (
        <GenericModal visible={false} setVisible={() => false} />
    )
}

const MainBottomTab = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    let iconSvg
                    switch (route.name as TAB_NAMES) {
                        case 'Dashboard':
                            iconSvg = homeSvg
                            break
                        case 'Add':
                            iconSvg = addSvg
                            break
                        default:
                            iconSvg = settingsSvg
                            break
                    }

                    return (
                        <SvgXml xml={iconSvg} />
                    )
                }
            })}
        >
            <Tab.Screen name='Dashboard' component={Home} />
            <Tab.Screen name='Add' component={AddModal}/>
            <Tab.Screen name='Setting' component={Home} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        alignItems: 'center',
        // padding: 10,
        backgroundColor: THEME.SECONDARY.Dark
    }
})

export default App;

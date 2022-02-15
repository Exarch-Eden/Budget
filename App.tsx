import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import { THEME } from './src/styles';

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

const MainBottomTab = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen name='Dashboard' component={Home} />
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

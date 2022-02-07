import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FlashMessage from 'react-native-flash-message';

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
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Dashboard' component={Home} />
        </Tab.Navigator>
    )
}

export default App;

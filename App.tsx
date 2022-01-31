import React from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screens/Home';

const App = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Home' component={MainBottomTab} />
            </Stack.Navigator>
        </NavigationContainer>
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

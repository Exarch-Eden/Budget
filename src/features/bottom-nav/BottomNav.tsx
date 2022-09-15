import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavStackParamList } from "../../types/navigation";
import Home from "../home/Home";

const BottomNav = () => {
    const BottomTab = createBottomTabNavigator<BottomNavStackParamList>()

    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={Home} />
        </BottomTab.Navigator>
    );
};

export default BottomNav;

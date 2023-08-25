import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavStackParamList } from "../../types/navigation";
import Home from "../home/Home";
import { COLORS } from "../../styles";

const BottomNav = () => {
    const BottomTab = createBottomTabNavigator<BottomNavStackParamList>();

    return (
        <BottomTab.Navigator
            tabBarOptions={{
                style: styles.tabBar,
                showLabel: false
            }}
        >
            <BottomTab.Screen name="Home" component={Home} />
        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        // height: 70,
        alignItems: "center",
        // padding: 10,
        backgroundColor: COLORS.SECONDARY.Dark,
    },
});

export default BottomNav;

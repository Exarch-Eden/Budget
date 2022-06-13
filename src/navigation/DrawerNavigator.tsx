import { View } from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import Text from "../components/Text";
import Page from "../components/Page";
import { useAppSelector } from "../redux/hooks";
import { selectWindowWidth } from "../redux/reducers/DimensionsSlice";

const DrawerTest = () => {
    return (
        <Page>
            <Text>drawer test</Text>
        </Page>
    );
};

const DrawerTestTwo = () => {
    return (
        <View>
            <Text>drawer test two</Text>
        </View>
    );
};

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    const windowWidth = useAppSelector(selectWindowWidth);

    return (
        <Drawer.Navigator
            // minSwipeDistance={1000}
            // TODO: use Dimensions value to determine half of width
            edgeWidth={windowWidth / 2}
        >
            <Drawer.Screen name="TestTwo" component={BottomTabNavigator} />
            <Drawer.Screen name="Test" component={DrawerTest} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

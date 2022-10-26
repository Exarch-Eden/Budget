import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createRef, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src_old/screens/bottom-tabs/Home";
import { Provider } from "react-redux";
import { store } from "./src_old/redux/store";
import FlashMessage from "react-native-flash-message";
import { THEME } from "./src_old/styles";
import { homeSvg, addSvg, settingsSvg } from "./src_old/assets/svgs/navigation";
import { SvgXml } from "react-native-svg";
import GenericModal from "./src_old/components/GenericModal";
import AddValueModal from "./src_old/components/modals/AddValueModal";
import AddTagModal from "./src_old/components/modals/AddTagModal";
import Landing from "./src_old/screens/authentication/Landing";
import Settings from "./src_old/screens/bottom-tabs/Settings";
import DrawerNavigator from "./src_old/navigation/DrawerNavigator";

import { Splash } from "./src_old/screens";
import { RootStackParamList } from "./src_old/constants/types/navigation";
import BottomNav from "./src/features/bottom-nav/BottomNav";
import useDimensions from "./src/hooks/useDimensions";

type TAB_NAMES = "Dashboard" | "Add" | "Setting";

const App = () => {
    const Stack = createStackNavigator();

    const { setDimensions } = useDimensions()

    // const Stack = createStackNavigator<RootStackParamList>();
    // useDimensions();

    useEffect(() => {
        /**
         * Initializing dimension values
         */
        setDimensions({
            windowWidth: Dimensions.get("window").width,
            windowHeight: Dimensions.get("window").height,
            screenWidth: Dimensions.get("screen").width,
            screenHeight: Dimensions.get("screen").height,
        })

        /**
         * Checks to see if user is a guest and has already used the app prior.
         * If so, skip Landing page, and go straight to Home page.
         */
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottomNav" component={BottomNav} />
            </Stack.Navigator>
        </NavigationContainer>
        // <Provider store={store}>
        //     <NavigationContainer>
        //         <Stack.Navigator
        //             screenOptions={{
        //                 headerShown: false,
        //             }}
        //             initialRouteName="Splash"
        //         >
        //             <Stack.Screen name="Splash" component={Splash} />
        //             <Stack.Screen name="Landing" component={Landing} />
        //             <Stack.Screen name="Home" component={DrawerNavigator} />
        //             {/* <Stack.Screen name='Home' component={BottomTab} /> */}
        //         </Stack.Navigator>
        //         <FlashMessage position="top" />
        //     </NavigationContainer>
        // </Provider>
    );
};

// const AddModal = () => {
//     return <GenericModal visible={false} setVisible={() => false} />;
// };

// export const BottomTab = () => {
//     const Tab = createBottomTabNavigator();

//     // const userData = useAppSelector(selectUserData)
//     // const { income, expenses, tags } = userData
//     // const dispatch = useAppDispatch()

//     // ref used to manually trigger flash message inside modal
//     const modalFlashRef = useRef<FlashMessage>(null!);
//     const [modalVisible, setModalVisible] = useState(false);

//     const [tagModalVisible, setTagModalVisible] = useState(false);
//     const textInputRef = createRef<TextInput>();

//     // TODO: change process to edit categories instead of adding categories only
//     return (
//         <>
//             <AddTagModal
//                 modalVisible={tagModalVisible}
//                 setModalVisible={setTagModalVisible}
//             />
//             <AddValueModal
//                 modalVisible={modalVisible}
//                 setModalVisible={setModalVisible}
//                 setTagModalVisible={setTagModalVisible}
//                 // addButtonOnPress={modalAddButtonOnPress}
//                 contentOnPress={() => textInputRef.current?.blur()}
//                 flashMessageRef={modalFlashRef}
//             />

//             <Tab.Navigator
//                 tabBarOptions={{
//                     style: styles.tabBar,
//                     showLabel: false,
//                 }}
//                 screenOptions={({ route }) => ({
//                     headerShown: false,
//                     tabBarIcon: ({ focused }) => {
//                         let iconSvg;
//                         switch (route.name as TAB_NAMES) {
//                             case "Dashboard":
//                                 iconSvg = homeSvg;
//                                 break;
//                             case "Add":
//                                 iconSvg = addSvg;
//                                 break;
//                             default:
//                                 iconSvg = settingsSvg;
//                                 break;
//                         }

//                         return <SvgXml xml={iconSvg} />;
//                     },
//                 })}
//             >
//                 <Tab.Screen name="Dashboard" component={Home} />
//                 <Tab.Screen
//                     name="Add"
//                     component={AddModal}
//                     listeners={() => ({
//                         tabPress: (event) => {
//                             // don't do anything
//                             event.preventDefault();
//                             setModalVisible(true);
//                         },
//                     })}
//                 />
//                 <Tab.Screen name="Setting" component={Settings} />
//             </Tab.Navigator>
//         </>
//     );
// };

const styles = StyleSheet.create({
    
});

export default App;

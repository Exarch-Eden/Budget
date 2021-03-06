import "react-native-gesture-handler";
import React, { useEffect } from 'react'
import { createRef, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/bottom-tabs/Home";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import FlashMessage from "react-native-flash-message";
import { THEME } from "./src/styles";
import { homeSvg, addSvg, settingsSvg } from "./src/assets/svgs/navigation";
import { SvgXml } from "react-native-svg";
import GenericModal from "./src/components/GenericModal";
import AddValueModal from "./src/components/modals/AddValueModal";
import AddTagModal from "./src/components/modals/AddTagModal";
import Landing from "./src/screens/authentication/Landing";
import Settings from "./src/screens/bottom-tabs/Settings";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import useDimensions from "./src/hooks/useDimensions";
import { Splash } from "./src/screens";
import { RootStackParamList } from "./src/constants/types/navigation";

type TAB_NAMES = "Dashboard" | "Add" | "Setting";

const App = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const dimensions = useDimensions();

    /**
     * Checks to see if user is a guest and has already used the app prior.
     * If so, skip Landing page, and go straight to Home page.
     */
    useEffect(() => {
        
    }, [])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Splash"
                >
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="Home" component={DrawerNavigator} />
                    {/* <Stack.Screen name='Home' component={BottomTab} /> */}
                </Stack.Navigator>
                <FlashMessage position="top" />
            </NavigationContainer>
        </Provider>
    );
};

const AddModal = () => {
    return <GenericModal visible={false} setVisible={() => false} />;
};

export const BottomTab = () => {
    const Tab = createBottomTabNavigator();

    // const userData = useAppSelector(selectUserData)
    // const { income, expenses, tags } = userData
    // const dispatch = useAppDispatch()

    // ref used to manually trigger flash message inside modal
    const modalFlashRef = useRef<FlashMessage>(null!);
    const [modalVisible, setModalVisible] = useState(false);

    const [tagModalVisible, setTagModalVisible] = useState(false);
    const textInputRef = createRef<TextInput>();

    // TODO: change process to edit categories instead of adding categories only
    return (
        <>
            <AddTagModal
                modalVisible={tagModalVisible}
                setModalVisible={setTagModalVisible}
            />
            <AddValueModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setTagModalVisible={setTagModalVisible}
                // addButtonOnPress={modalAddButtonOnPress}
                contentOnPress={() => textInputRef.current?.blur()}
                flashMessageRef={modalFlashRef}
            />

            <Tab.Navigator
                tabBarOptions={{
                    style: styles.tabBar,
                    showLabel: false,
                }}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        let iconSvg;
                        switch (route.name as TAB_NAMES) {
                            case "Dashboard":
                                iconSvg = homeSvg;
                                break;
                            case "Add":
                                iconSvg = addSvg;
                                break;
                            default:
                                iconSvg = settingsSvg;
                                break;
                        }

                        return <SvgXml xml={iconSvg} />;
                    },
                })}
            >
                <Tab.Screen name="Dashboard" component={Home} />
                <Tab.Screen
                    name="Add"
                    component={AddModal}
                    listeners={() => ({
                        tabPress: (event) => {
                            // don't do anything
                            event.preventDefault();
                            setModalVisible(true);
                        },
                    })}
                />
                <Tab.Screen name="Setting" component={Settings} />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        alignItems: "center",
        // padding: 10,
        backgroundColor: THEME.SECONDARY.Dark,
    },
    modalAddButton: {
        borderColor: "orange",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    },
    modalCancelButton: {
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        // marginTop: 10,
        // marginBottom: 'auto'
    },
    typeButtonsContainer: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
    },
    dataInputContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
    // chosenTypeButton: {
    //     flex: 1,
    //     padding: 10,
    //     backgroundColor: 'white',
    //     borderRadius: 10,
    //     borderWidth: 2,
    //     alignItems: 'center'
    // },
});

export default App;

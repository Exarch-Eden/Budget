import React, { createRef, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FlashMessage from 'react-native-flash-message'
import { SvgXml } from 'react-native-svg'


import { THEME } from '../styles'
import GenericModal from '../components/GenericModal'
import { homeSvg, addSvg, settingsSvg } from '../assets/svgs/navigation'
import AddTagModal from '../components/modals/AddTagModal'
import AddValueModal from '../components/modals/AddValueModal'
import Home from '../screens/bottom-tabs/Home'
import Settings from '../screens/bottom-tabs/Settings'

type TAB_NAMES = 'Dashboard' | 'Add' | 'Setting'

const AddModal = () => {
    return (
        <GenericModal visible={false} setVisible={() => false} />
    )
}

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator()

    // const userData = useAppSelector(selectUserData)
    // const { income, expenses, tags } = userData
    // const dispatch = useAppDispatch()

    // ref used to manually trigger flash message inside modal
    const modalFlashRef = useRef<FlashMessage>(null!)
    const [modalVisible, setModalVisible] = useState(false)

    const [tagModalVisible, setTagModalVisible] = useState(false)
    const textInputRef = createRef<TextInput>()

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
                <Tab.Screen
                    name='Add'
                    component={AddModal}
                    listeners={() => ({
                        tabPress: event => {
                            // don't do anything
                            event.preventDefault()
                            setModalVisible(true)
                        }
                    })}
                />
                <Tab.Screen name='Setting' component={Settings} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        alignItems: 'center',
        // padding: 10,
        backgroundColor: THEME.SECONDARY.Dark
    },
    modalAddButton: {
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    },
    modalCancelButton: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        // marginTop: 10,
        // marginBottom: 'auto'
    },
    typeButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10
    },
    dataInputContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
    }
})

export default BottomTabNavigator
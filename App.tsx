import React, { createRef, useEffect, useRef, useState } from 'react'
import { AsyncStorage, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import { STYLES, THEME } from './src/styles';
import { homeSvg, addSvg, settingsSvg } from './src/assets/svgs/navigation'
import { SvgXml } from 'react-native-svg';
import GenericModal from './src/components/GenericModal';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { selectUserData, setUserData } from './src/redux/reducers/userSlice';
import moment from 'moment';
import Button from './src/components/Button';
import Text from './src/components/Text'

type TAB_NAMES = 'Dashboard' | 'Add' | 'Setting'
type ChosenMonetaryType = 'income' | 'expense'

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

    const userData = useAppSelector(selectUserData)
    const { income, expenses, tags } = userData
    const dispatch = useAppDispatch()

    // ref used to manually trigger flash message inside modal
    const modalFlashRef = useRef<FlashMessage>(null!)
    const [modalVisible, setModalVisible] = useState(false)
    const [chosenType, setChosenType] = useState<ChosenMonetaryType>('income')
    const [addedValue, setAddedValue] = useState(0)
    const [addValueInput, setAddValueInput] = useState<string | undefined>()
    const [addValInputIsBlurred, setAddValInputIsBlurred] = useState(true)
    const [selectedTag, setSelectedTag] = useState<string | undefined>()

    const [tagModalVisible, setTagModalVisible] = useState(false)
    const [addTagInput, setAddTagInput] = useState('')
    const textInputRef = createRef<TextInput>()

    const modalAddButtonOnPress = async () => {
        try {
            console.log('modalAddButton()');

            if (!addValueInput && !addedValue) throw new Error('Amount field cannot be left blank')

            console.log('addValInputIsBlurred: ', addValInputIsBlurred);

            const valToUse = addValInputIsBlurred ? addedValue : Number(addValueInput)

            if (isNaN(valToUse)) {
                throw new Error('Value entered is not a number')
            }

            if (!setAddValInputIsBlurred)
                textInputRef.current?.blur()

            const isIncome = chosenType === 'income'

            // setTotalIncome(isIncome ? totalIncome + valToUse : totalIncome)
            // setTotalExpenses(isIncome ? totalExpenses : totalExpenses + valToUse)

            // TODO: allow user to select date and time
            const dataToAdd = { value: valToUse, tag: selectedTag, timestamp: moment().valueOf() }

            const newUserData = {
                ...userData,
                income: isIncome ? [...income, dataToAdd] : income,
                expenses: isIncome ? expenses : [...expenses, dataToAdd],
            }

            console.log('isIncome: ', isIncome);
            console.log('new income: ', newUserData.income);
            console.log('new expenses: ', newUserData.expenses);

            dispatch(setUserData(newUserData))

            // save to local async storage
            await AsyncStorage.setItem('@userData', JSON.stringify(newUserData))
            setModalVisible(false)
        } catch (error) {
            console.log('Error occurred in modalAddButtonOnPress()');
            console.error(error);

            if (error instanceof Error) {
                console.log('error instanceof Error true');
                modalFlashRef.current?.showMessage({
                    message: error.message,
                    duration: 5000,
                    type: 'danger'
                })
            }
        }
    }

    const renderTags = () => {
        // for testing purposes
        // const tags = ['tag1', 'tag2']

        const tagsElem = tags?.map((tag, index) => {
            const marginCheck = index < (tags.length - 1)
            console.log('tag: ', tag);
            console.log('index: ', index);
            console.log('marginCheck: ', marginCheck);

            return (
                <Button
                    key={`#${tag}`}
                    onPress={() => selectedTag !== tag ? setSelectedTag(tag) : setSelectedTag(undefined)}
                    style={{ marginRight: marginCheck ? 10 : 0 }}
                    label={tag}
                    ignoreIsSelected
                />
            )
        })

        return (tagsElem || [])
            // the add button
            .concat([(
                <Button
                    key='add'
                    onPress={() => setTagModalVisible(true)}
                    label='+ Add'
                    ignoreIsSelected
                    style={{ marginLeft: tags?.length ? 10 : 0 }}
                />
            )])
    }

    const addValueModal = () => {
        return (
            <GenericModal
                visible={modalVisible}
                setVisible={setModalVisible}
                contentOnPress={() => textInputRef.current?.blur()}
                flashMessageRef={modalFlashRef}
            >
                <>
                    <Text style={[STYLES.textLarge, { marginBottom: 10 }]}>Add Data</Text>
                    {/* Monetary Type */}
                    <Text size='small' style={{ alignSelf: 'flex-start' }}>Type</Text>
                    <View
                        style={styles.typeButtonsContainer}
                    >
                        <Button
                            onPress={() => setChosenType('income')}
                            isSelected={chosenType === 'income'}
                            style={{
                                marginRight: 10
                            }}
                            label='Income'
                        />
                        <Button
                            onPress={() => setChosenType('expense')}
                            isSelected={chosenType === 'expense'}
                            style={{
                                marginLeft: 10
                            }}
                            label='Expense'
                        />
                    </View>
                    {/* Tag Selector */}
                    <View style={{
                        marginBottom: 10,
                        alignSelf: 'flex-start'
                    }}>
                        <Text size='small' style={{ marginBottom: 5 }}>
                            {/* {tags ? 'Select an existing tag:' : 'You have no existing tags: '} */}
                            Categories
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            // borderColor: 'red', 
                            // borderWidth: 1 
                        }}>
                            {renderTags()}
                        </View>
                    </View>
                    <Text size='small' style={{ alignSelf: 'flex-start' }}>Amount</Text>
                    <View style={styles.dataInputContainer}>
                        <Text size='large'>$</Text>
                        <TextInput
                            ref={textInputRef}
                            keyboardType='number-pad'
                            placeholderTextColor={THEME.PRIMARY.Light}
                            placeholder='0.00'
                            value={addValueInput}
                            onChangeText={(text) => setAddValueInput(text || undefined)}
                            onBlur={() => {
                                setAddValInputIsBlurred(true)
                                if (addValueInput) {
                                    const num = Number(addValueInput)
                                    setAddValueInput(num.toFixed(2))
                                    setAddedValue(num)
                                }
                                // if (addValueInput?.includes('.')) {
                                //     console.log('addValueInput has a dot');
                                // } else {
                                //     setAddValueInput(Number(addValueInput).toFixed(2))
                                // }
                            }}
                            onFocus={() => setAddValInputIsBlurred(false)}
                            style={{
                                width: '100%',
                                borderBottomColor: THEME.PRIMARY.Light,
                                borderBottomWidth: 2,
                                color: THEME.PRIMARY.Light
                            }}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Button
                            onPress={() => modalAddButtonOnPress()}
                            label='ADD'
                            style={{
                                marginBottom: 10
                            }}
                        />
                    </View>
                </>
            </GenericModal>
        )
    }

    const addTag = async () => {
        // TODO: account for duplicate tags

        const newTag = addTagInput.trim()

        console.log(`adding ${newTag} to tags array`);

        const newUserData = { ...userData, tags: tags ? [...tags, newTag] : [newTag] }

        dispatch(setUserData(newUserData))

        // save to local async storageF
        await AsyncStorage.setItem('@userData', JSON.stringify(newUserData))

        setTagModalVisible(false)
    }

    useEffect(() => {
        if (!modalVisible) {
            setSelectedTag(undefined)
            setAddValueInput('')
            setAddedValue(0)
        }
    }, [modalVisible])

    useEffect(() => {
        if (!tagModalVisible) {
            setAddTagInput('')
        }
    }, [tagModalVisible])

    // TODO: change process to edit categories instead of adding categories only
    return (
        <>
            <GenericModal visible={tagModalVisible} setVisible={setTagModalVisible}>
                <>
                    <Text size='large' style={{ marginBottom: 10 }}>Add Category</Text>
                    <TextInput
                        placeholder='E.g. Salary'
                        value={addTagInput}
                        onChangeText={text => setAddTagInput(text)}
                        placeholderTextColor={THEME.PRIMARY.Light}
                        style={{
                            width: '100%',
                            borderBottomColor: THEME.PRIMARY.Light,
                            borderBottomWidth: 2,
                            marginBottom: 10
                        }}
                    />
                    <View style={{ width: '100%' }}>
                        <Button
                            onPress={() => addTag()}
                            label='ADD'
                            style={{
                                marginBottom: 10
                            }}
                        />
                    </View>
                </>
            </GenericModal>
            {addValueModal()}
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
                <Tab.Screen name='Setting' component={Home} />
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
    // chosenTypeButton: {
    //     flex: 1,
    //     padding: 10,
    //     backgroundColor: 'white',
    //     borderRadius: 10,
    //     borderWidth: 2,
    //     alignItems: 'center'
    // },
})

export default App;

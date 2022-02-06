import React, { ClassAttributes, createRef, LegacyRef, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { MonetaryData, selectUserData, setUserData } from '../redux/reducers/userSlice';
// import { PieChart } from 'react-native-chart-kit'
// import { PieChartProps } from 'react-native-chart-kit/dist/PieChart'
import { PieChart, PieChartData } from 'react-native-svg-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { passInitialRender, selectInitialRender } from '../redux/reducers/activitySlice';

type ChosenMonetaryType = 'income' | 'expense'

const Home = () => {
    const { income, expenses, tags } = useAppSelector(selectUserData)
    // used to retrieve local user data when user initially boots app
    const initialRender = useAppSelector(selectInitialRender)
    const dispatch = useAppDispatch()

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [chosenType, setChosenType] = useState<ChosenMonetaryType>('income')
    const [addedValue, setAddedValue] = useState(0)
    const [addValueInput, setAddValueInput] = useState<string | undefined>()
    const [addValInputIsBlurred, setAddValInputIsBlurred] = useState(true)
    const [selectedTag, setSelectedTag] = useState<string | undefined>()
    // set to false for testing
    // return to true later
    const [loading, setLoading] = useState(false)

    const textInputRef = createRef<TextInput>()

    const retrieveLocalData = async () => {
        try {
            // for purging old data (after changing data schema)
            // console.log('purging old user data...');

            // await AsyncStorage.setItem('@userData', '')

            // throw new Error('Finished purging old data...')

            console.log('retrieving async storage data...');
            const localUserData = await AsyncStorage.getItem('@userData')
            console.log('localUserData: ', localUserData);

            if (localUserData)
                dispatch(setUserData(JSON.parse(localUserData)))

        } catch (error) {
            console.error(error);
        }
        dispatch(passInitialRender())
        setLoading(false)
    }

    useEffect(() => {
        console.log('initial useEffect()');

        // TODO: get user data from asyncstorage
        // and set redux user data
        if (initialRender) {
            console.log('app just launched');
            retrieveLocalData()
        }
    }, [])

    useEffect(() => {
        if (!modalVisible) {
            setSelectedTag(undefined)
        }
    }, [modalVisible])

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const incomeExpenseReducer = (arr: MonetaryData[]): number => {
        if (arr.length === 0) return 0

        return arr.reduce((prevIncome, curIncome) => {
            return {
                value: prevIncome.value + curIncome.value
            }
        }).value
    }

    const generatePieData = (): PieChartData[] => {
        const bothBlank = income.length === 0 && expenses.length === 0
        // const bothBlank = !income && !expenses

        // for react-native-svg-charts
        return [
            {
                value: bothBlank ? 50 : incomeExpenseReducer(income),
                svg: {
                    fill: 'green',
                    onPress: () => { }
                },
                key: `income`
            },
            {
                value: bothBlank ? 50 : incomeExpenseReducer(expenses),
                svg: {
                    fill: 'red',
                    onPress: () => { }
                },
                key: `spendings`
            },
        ]
    }

    const modalAddButtonOnPress = async () => {
        try {

            console.log('modalAddButton()');
            console.log('addValInputIsBlurred: ', addValInputIsBlurred);

            const valToUse = addValInputIsBlurred ? addedValue : Number(addValueInput)

            if (!setAddValInputIsBlurred)
                textInputRef.current?.blur()

            const isIncome = chosenType === 'income'

            setTotalIncome(isIncome ? totalIncome + valToUse : totalIncome)
            setTotalExpenses(isIncome ? totalExpenses : totalExpenses + valToUse)

            const dataToAdd = { value: valToUse, tag: selectedTag }

            const newUserData = {
                income: isIncome ? [...income, dataToAdd] : income,
                expenses: isIncome ? expenses : [...expenses, dataToAdd]
                // income: isIncome ? income + valToUse : income,
                // expenses: isIncome ? expenses : expenses + valToUse
            }

            console.log('isIncome: ', isIncome);
            console.log('new income: ', newUserData.income);
            console.log('new expenses: ', newUserData.expenses);

            dispatch(setUserData(newUserData))

            // save to local async storage
            await AsyncStorage.setItem('@userData', JSON.stringify(newUserData))
        } catch (error) {
            console.log('Error occurred in modalAddButtonOnPress()');
            console.error(error);
        }
    }

    const renderTags = () => {
        // for testing purposes
        const tags = ['tag1', 'tag2']

        return tags?.map((tag, index) => {
            return (
                <TouchableOpacity
                    key={tag}
                    onPress={() => selectedTag !== tag ? setSelectedTag(tag) : setSelectedTag(undefined)}
                >
                    <Text
                        key={tag}
                        style={{
                            backgroundColor: selectedTag === tag ? 'orange' : 'white',
                            borderWidth: 1,
                            borderColor: selectedTag === tag ? 'transparent' : 'orange',
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 50,
                            marginHorizontal: 5
                        }}
                    >
                        {tag}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container as ViewStyle}>
            {/* TODO: create a generic modal component */}
            <Modal visible={modalVisible} transparent>
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: '100%',
                            height: '100%'
                            // height: Dimensions.get('screen').height * 0.4, opacity: 0.5
                        }}
                    >
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => textInputRef.current?.blur()}>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            alignItems: 'center',
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            padding: 20,
                            paddingTop: 30,
                            backgroundColor: 'white',
                            width: '100%',
                            // height: Dimensions.get('screen').height * 0.6,
                        }}
                    >
                        <View>
                            <Text>Add monetary value to calculation</Text>
                        </View>
                        {/* Monetary Type */}
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                marginVertical: 10
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setChosenType('income')}
                                style={[styles.chosenTypeButton, {
                                    backgroundColor: chosenType === 'income' ? 'green' : 'white',
                                    borderColor: 'green',
                                    marginRight: 10
                                }]}
                            >
                                <Text style={{
                                    color: chosenType === 'income' ? 'white' : 'green'
                                }}>
                                    Income
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setChosenType('expense')}
                                style={[styles.chosenTypeButton, {
                                    backgroundColor: chosenType === 'expense' ? 'red' : 'white',
                                    borderColor: 'red',
                                    marginLeft: 10
                                }]}
                            >
                                <Text style={{
                                    color: chosenType === 'expense' ? 'white' : 'red'
                                }}>
                                    Expense
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginBottom: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            overflow: 'hidden'
                        }}>
                            <Text style={{ fontSize: 16 }}>$</Text>
                            <TextInput
                                ref={textInputRef}
                                keyboardType='number-pad'
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
                                style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                            />
                        </View>
                        {/* Tag Selector */}
                        <View style={{
                            marginBottom: 10,

                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                {renderTags()}
                            </View>
                        </View>
                        <View style={{ width: '100%', }}>
                            <TouchableOpacity onPress={() => modalAddButtonOnPress()} style={styles.modalAddButton}>
                                <Text style={{ color: 'orange' }}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancelButton}>
                                <Text style={{ color: 'red' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>My Dashboard</Text>
            </View>
            <View style={styles.mainContainer}>
                <Text>Income: ${totalIncome.toFixed(2)}</Text>
                <Text>Expenses: ${totalExpenses.toFixed(2)}</Text>
                <View style={{ marginTop: 20 }}>
                    <PieChart
                        data={generatePieData()}
                        style={{ height: 200, width: 200 }}
                        innerRadius='75%'
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={{ fontSize: 24, color: 'white' }}>+</Text>
            </TouchableOpacity>
            {
                loading && <View style={styles.loader}>
                    <ActivityIndicator size='large' color='#ccc' />
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    headerContainer: {
        marginVertical: 20
    },
    header: {
        fontSize: 24,
        fontWeight: '800'
    },
    mainContainer: {
        alignItems: 'center'
    },
    addButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 20,
        backgroundColor: '#ccc',
        borderRadius: 50,
        width: 48,
        height: 48,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
    chosenTypeButton: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center'
    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }
})

export default Home;

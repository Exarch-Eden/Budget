import React, { ClassAttributes, createRef, LegacyRef, useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectUserData, setUserData } from '../redux/reducers/userSlice';
// import { PieChart } from 'react-native-chart-kit'
// import { PieChartProps } from 'react-native-chart-kit/dist/PieChart'
import { PieChart, PieChartData } from 'react-native-svg-charts'

type ChosenMonetaryType = 'income' | 'expense'

const Home = () => {
    const { income, spendings } = useAppSelector(selectUserData)
    const dispatch = useAppDispatch()

    const [modalVisible, setModalVisible] = useState(false)
    const [chosenType, setChosenType] = useState<ChosenMonetaryType>('income')
    const [addedValue, setAddedValue] = useState(0)
    const [addValueInput, setAddValueInput] = useState<string | undefined>()

    const textInputRef = createRef<TextInput>()

    useEffect(() => {
        // TODO: get user data from asyncstorage
        // and set redux user data
    }, [])

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const generatePieData = (): PieChartData[] => {
        const bothBlank = !income && !spendings

        // for react-native-svg-charts
        return [
            {
                value: bothBlank ? 50 : income,
                svg: {
                    fill: randomColor(),
                    onPress: () => { }
                },
                key: `income`
            },
            {
                value: bothBlank ? 50 : spendings,
                svg: {
                    fill: randomColor(),
                    onPress: () => { }
                },
                key: `spendings`
            },
        ]
    }

    const modalAddButtonOnPress = () => {
        console.log('modalAddButton()');

        const isIncome = chosenType === 'income'

        console.log('isIncome: ', isIncome);
        console.log('new income: ', isIncome ? income + addedValue : income);
        console.log('new spendings: ', isIncome ? spendings : spendings + addedValue);
        

        dispatch(setUserData({
            income: isIncome ? income + addedValue : income,
            spendings: isIncome ? spendings : spendings + addedValue
        }))
    }

    return (
        <View style={styles.container as ViewStyle}>
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
                            <Text>This is a modal</Text>
                        </View>
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
                                style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                            />
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
                <Text>Income: ${income}</Text>
                <Text>Spendings: ${spendings}</Text>
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
})

export default Home;

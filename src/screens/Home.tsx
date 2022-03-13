import React, { ClassAttributes, createRef, LegacyRef, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Keyboard, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { PieChart, PieChartData } from 'react-native-svg-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FlashMessage from 'react-native-flash-message';
import moment from 'moment'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Circle, Slice, VictoryChart, VictoryPie } from 'victory-native';

import Text from '../components/Text';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { MonetaryData, selectUserData, setUserData, UserData } from '../redux/reducers/userSlice';
import { passInitialRender, selectInitialRender } from '../redux/reducers/activitySlice';
import GenericModal from '../components/GenericModal';
import HELPERS from '../helpers'
import { STYLES, THEME } from '../styles'
import InfoCard from '../components/InfoCard';
import Svg from 'react-native-svg';

type ChosenMonetaryType = 'income' | 'expense'

type InfoSlideType = 'spend' | 'all'
interface InfoSlideData {
    type: InfoSlideType
}

const deviceWidth = Dimensions.get('window').width
const INFO_HEADER_HEIGHT = STYLES.textLarge.fontSize + 2

const Home = () => {
    const userData = useAppSelector(selectUserData)
    const { income, expenses, tags } = userData
    // used to retrieve local user data when user initially boots app
    const initialRender = useAppSelector(selectInitialRender)
    const dispatch = useAppDispatch()

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

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

    // used to gauge monthly spending on Recent Spendings tab
    // MUST be greater than -90
    const [spendEndAngle, setSpendEndAngle] = useState(-89)

    // set to false for testing
    // return to true later
    const [loading, setLoading] = useState(false)

    const textInputRef = createRef<TextInput>()

    const [curInfoIndex, setCurInfoIndex] = useState(0)

    const INFO_SLIDES: InfoSlideData[] = [
        {
            type: 'spend'
        },
        {
            type: 'all'
        }
    ]


    const AVERAGE_SPENDING = 200

    const DUMMY_DATA = [
        {
            y: 1,
            // color: THEME.SECONDARY.Green
            color: THEME.PRIMARY.Green
        },
        {
            y: 1,
            // color: THEME.SECONDARY.Yellow
            color: THEME.PRIMARY.Yellow
        },
        {
            y: 1,
            // color: THEME.SECONDARY.Red
            color: THEME.PRIMARY.Red
        }
    ]

    const retrieveLocalData = async () => {
        try {
            // for purging old data (after changing data schema)
            // console.log('purging old user data...');

            // await AsyncStorage.setItem('@userData', '')

            // throw new Error('Finished purging old data...')

            console.log('retrieving async storage data...');
            const localUserData = await AsyncStorage.getItem('@userData')
            console.log('localUserData: ', localUserData);

            if (localUserData) {
                const parsedLocalData: UserData = JSON.parse(localUserData)
                dispatch(setUserData(parsedLocalData))
                setTotalIncome(incomeExpenseReducer(parsedLocalData.income))
                setTotalExpenses(incomeExpenseReducer(parsedLocalData.expenses))
            }

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
        } else {
            setTotalIncome(incomeExpenseReducer(income))
            setTotalExpenses(incomeExpenseReducer(expenses))
        }
    }, [])

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

            if (!addValueInput && !addedValue) throw new Error('Amount field cannot be left blank')

            console.log('addValInputIsBlurred: ', addValInputIsBlurred);

            const valToUse = addValInputIsBlurred ? addedValue : Number(addValueInput)

            if (!setAddValInputIsBlurred)
                textInputRef.current?.blur()

            const isIncome = chosenType === 'income'

            setTotalIncome(isIncome ? totalIncome + valToUse : totalIncome)
            setTotalExpenses(isIncome ? totalExpenses : totalExpenses + valToUse)

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

    const renderTags = () => {
        // for testing purposes
        // const tags = ['tag1', 'tag2']

        const tagsElem = tags?.map((tag, index) => {
            return (
                <TouchableOpacity
                    key={`#${tag}`}
                    onPress={() => selectedTag !== tag ? setSelectedTag(tag) : setSelectedTag(undefined)}
                >
                    <Text
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


        return (tagsElem || [])
            // the add button
            .concat([(<TouchableOpacity
                key='add'
                onPress={() => setTagModalVisible(true)}
            >
                <Text
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'blue',
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 50,
                        marginHorizontal: 5
                    }}
                >
                    + Add
                </Text>
            </TouchableOpacity>)])
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
                        alignSelf: 'flex-start'
                    }}>
                        <Text style={{ marginBottom: 5 }}>{tags ? 'Select an existing tag:' : 'You have no existing tags: '}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {renderTags()}
                        </View>
                    </View>
                    <View style={{ width: '100%', }}>
                        <TouchableOpacity onPress={() => modalAddButtonOnPress()} style={styles.modalAddButton}>
                            <Text style={{ color: 'orange' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </>
            </GenericModal>
        )
    }

    const renderInfoSlides = ({ item }: { item: InfoSlideData }) => {
        let slideContent
        const PIE_HEIGHT = 300
        const PIE_WIDTH = 300
        const PIE_RADIUS = 150
        const PIE_INNER_RAD = PIE_RADIUS - 10


        switch (item.type) {
            case 'spend':
                slideContent = (
                    <View>
                        <Text style={STYLES.textLarge} numberOfLines={1}>Recent Spendings</Text>
                        <Svg style={{ height: PIE_HEIGHT, width: '100%', marginVertical: 20 }}>
                            <VictoryPie
                                animate={{ duration: 500 }}
                                data={DUMMY_DATA}
                                height={PIE_HEIGHT}
                                width={PIE_WIDTH}
                                radius={PIE_RADIUS}
                                // radius={PIE_RADIUS}
                                padAngle={2}
                                standalone={false}
                                innerRadius={PIE_INNER_RAD}
                                // innerRadius={PIE_HEIGHT / 2 - 20}
                                startAngle={-90}
                                endAngle={90}
                                labels={() => null}
                                style={{
                                    data: {
                                        fill: ({ datum }) => datum.color,
                                        opacity: 0.6
                                    }
                                }}
                            />
                            {/* TODO: add circle at the head of the slice (bar) */}
                            <VictoryPie
                                animate={{ duration: 500 }}
                                data={[{ y: 1 }]}
                                height={PIE_HEIGHT}
                                width={PIE_WIDTH}
                                radius={PIE_RADIUS}
                                padAngle={0}
                                standalone={false}
                                innerRadius={PIE_INNER_RAD}
                                startAngle={-90}
                                // modify endAngle value based on 
                                endAngle={spendEndAngle}
                                labels={() => null}
                                style={{
                                    data: {
                                        fill: THEME.PRIMARY.Green,

                                    }
                                }}
                                // dataComponent={
                                //     <>
                                //         <Slice

                                //             // style={{ fill: 'green' }}
                                //         />
                                //         {/* <Circle style={{ fill: 'green' }} /> */}
                                //     </>
                                // }
                            />
                        </Svg>
                        <Text>Hi</Text>
                    </View>
                )
                break
            case 'all':
                slideContent = (
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
                )
                break
        }

        return (
            <InfoCard>
                {slideContent}
            </InfoCard>
        )
    }

    return (
        <View style={[STYLES.page, { paddingBottom: 10 }]}>
            {/* <View style={styles.container as ViewStyle}> */}
            <GenericModal visible={tagModalVisible} setVisible={setTagModalVisible}>
                <>
                    <Text style={{ marginBottom: 10 }}>Add a tag</Text>
                    <TextInput placeholder='E.g. Salary' value={addTagInput} onChangeText={text => setAddTagInput(text)} />
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={() => addTag()} style={styles.modalAddButton}>
                            <Text style={{ color: 'orange' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </>
            </GenericModal>
            {addValueModal()}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>My Dashboard</Text>
            </View>
            <Carousel
                sliderWidth={deviceWidth}
                itemWidth={deviceWidth - 40}
                data={INFO_SLIDES}
                renderItem={renderInfoSlides}
                loop={false}
                enableMomentum={false}
                lockScrollWhileSnapping
                autoplay={false}
                onSnapToItem={(index) => setCurInfoIndex(index)}
            />
            <Pagination
                dotsLength={2}
                activeDotIndex={curInfoIndex}
                containerStyle={{
                    // default padding is too large, override it with smaller value
                    paddingTop: 10,
                    paddingBottom: 0
                }}
                dotStyle={{
                    backgroundColor: THEME.PRIMARY.Light
                }}
            />
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
        marginBottom: 20
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
        // TODO: change background color to fit theme
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }
})

export default Home;

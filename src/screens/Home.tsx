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
import Svg, { SvgXml } from 'react-native-svg';
import { filterSvg } from '../assets/svgs';

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

    // used to gauge monthly spending on Recent Spendings tab
    // MUST be greater than -90
    const [spendEndAngle, setSpendEndAngle] = useState(-89)

    // set to false for testing
    // return to true later
    const [loading, setLoading] = useState(false)

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

        console.log('expenses:\n', expenses);
        

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

    const renderInfoSlides = ({ item }: { item: InfoSlideData }) => {
        let slideContent
        const PIE_HEIGHT = 300
        const PIE_WIDTH = 300
        const PIE_RADIUS = 150
        const PIE_INNER_RAD = PIE_RADIUS - 10

        const curMonthlyExpenses = expenses
            .filter(expense => 
                expense.timestamp !== undefined &&
                moment().year() === moment(expense.timestamp).year() &&
                moment().month() === moment(expense.timestamp).month()
            )


        // TODO: Move each slide content into its own component
        switch (item.type) {
            case 'spend':
                slideContent = (
                    <View>
                        <Text style={STYLES.textLarge} numberOfLines={1}>Recent Spendings</Text>
                        {/* Svg height is half of pie because we are only using the top half */}
                        <Svg style={{ height: PIE_HEIGHT / 2, width: '100%', marginVertical: 20 }}>
                            {/* TODO: add monthly expense amount in center of pie (in open space) */}
                            <VictoryPie
                                animate={{ duration: 500 }}
                                data={DUMMY_DATA}
                                height={PIE_HEIGHT}
                                width={PIE_WIDTH}
                                radius={PIE_RADIUS}
                                padAngle={2}
                                standalone={false}
                                innerRadius={PIE_INNER_RAD}
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
                                // TODO: modify endAngle value based on average expense per previous months
                                // if no previous months then calculate based on earnings vs expenses this month
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                {/* height of 32px is same height as svg filter icon on the right */}
                                <Text style={{ height: 32, textAlignVertical: 'center' }}>Highest Monthly Expenses</Text>
                            </View>
                            <View>
                                {/* TODO: wrap svg in TouchableOpacity and allow filter for category/names */}
                                <SvgXml xml={filterSvg} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                            {
                                curMonthlyExpenses.map((curExpense) => {
                                    return (
                                        <View key={curExpense.timestamp}>
                                            <Text>{curExpense.tag}</Text>
                                        </View>
                                    )
                                })
                            }
                            </View>
                            <View>
                            {
                                curMonthlyExpenses.map((curExpense) => {
                                    return (
                                        <View key={curExpense.timestamp}>
                                            <Text>{curExpense.value}</Text>
                                        </View>
                                    )
                                })
                            }
                            </View>
                        </View>
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

import React, { ClassAttributes, createRef, LegacyRef, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Keyboard, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { PieChart, PieChartData } from 'react-native-svg-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FlashMessage from 'react-native-flash-message';
import moment from 'moment'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Circle, Slice, VictoryAnimation, VictoryChart, VictoryLabel, VictoryPie } from 'victory-native';

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
import MonthlyExpenseSlide from '../components/home-slides/MonthlyExpenseSlide';

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

    // TODO: bring back usability for other tab (currently not being used)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    // used to gauge monthly spending on Recent Spendings tab
    // MUST be greater than -90 and less than 90
    // -89 is complete zero (same with 89)
    // -88 is the smallest integer value where bar actually shows (same with 88)
    const [spendEndAngle, setSpendEndAngle] = useState(-88)
    // used to store the dynamically-calculated height of the parent view
    // holding the pie charts so that said charts can match it
    const [expenseViewWidth, setExpenseViewWidth] = useState(0)

    // set to false for testing
    // return to true later
    const [loading, setLoading] = useState(false)

    const [curInfoIndex, setCurInfoIndex] = useState(0)

    const INFO_SLIDES: InfoSlideData[] = [
        {
            type: 'spend'
        },
        // TODO: bring back when it is polished
        // {
        //     type: 'all'
        // }
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
       
        const curMonthlyExpenses = expenses
            .filter(expense =>
                expense.timestamp !== undefined &&
                moment().year() === moment(expense.timestamp).year() &&
                moment().month() === moment(expense.timestamp).month()
            )

            console.log('curMonthlyExpenses reduced value: ', curMonthlyExpenses.reduce(
                (prev, cur) => {
                    return {
                        value: prev.value + cur.value
                    }
                }, {
                    value: 0
                }
            ).value);

        switch (item.type) {
            case 'spend':
                slideContent = (
                    <MonthlyExpenseSlide
                        onLayout={(e) => setExpenseViewWidth(e.nativeEvent.layout.width)}
                        expenseViewWidth={expenseViewWidth}
                        curMonthlyExpenses={curMonthlyExpenses}
                        spendEndAngle={spendEndAngle}
                    />
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
        // TODO: once All slide is polished, change parent paddingBottom to 10 instead of 20
        <View style={[STYLES.page, { paddingBottom: 20 }]}>
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
            {/* TODO: bring back once All slide is polished */}
            {/* <Pagination
                dotsLength={1}
                activeDotIndex={curInfoIndex}
                containerStyle={{
                    // default padding is too large, override it with smaller value
                    paddingTop: 10,
                    paddingBottom: 0
                }}
                dotStyle={{
                    backgroundColor: THEME.PRIMARY.Light
                }}
            /> */}
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

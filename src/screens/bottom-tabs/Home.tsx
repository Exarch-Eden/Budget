import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { PieChartData } from 'react-native-svg-charts'
import MonthlyExpenseSlide from '../../components/home-slides/MonthlyExpenseSlide'
import Page from '../../components/Page'

import Text from '../../components/Text'
import { InfoSlideRenderFunc } from '../../constants/types/slides'

import { INFO_SLIDES } from '../../constants/values/slides'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectInitialRender } from '../../redux/reducers/ActivitySlice'
import { selectExpensesVal, selectIncomeVal } from '../../redux/reducers/MonetarySlice'
import { STYLES } from '../../styles'

const Home = () => {
    const deviceWidth = Dimensions.get('window').width
    const itemWidth = deviceWidth - 40

    const incomeVal = useAppSelector(selectIncomeVal)
    const expensesVal = useAppSelector(selectExpensesVal)

    const initialRender = useAppSelector(selectInitialRender)

    const dispatch = useAppDispatch()

    /**
     * Used to gauge monthly spending on Recent Spendings tab.
     * Value range MUST be: -90 < value < 90
     * -89/+89: y = 0
     */
    const [spendEndAngle, setSpendEndAngle] = useState(-88)

    const renderInfoSlides: InfoSlideRenderFunc = ({ item }) => {
        let slideContent

        switch (item.type) {
            case 'spend':
                slideContent = (
                    <MonthlyExpenseSlide
                        curMonthlyExpenses={[]}
                        spendEndAngle={spendEndAngle}
                    />
                )
                break
            case 'all':
                slideContent = (
                    <View style={styles.MainContainer}>
                        {/* <Text>Income: ${totalIncome.toFixed(2)}</Text>
                        <Text>Expenses: ${totalExpenses.toFixed(2)}</Text> */}
                        {/* <View style={{ marginTop: 20 }}>
                            <PieChart
                                data={generatePieData()}
                                style={{ height: 200, width: 200 }}
                                innerRadius='75%'
                            />
                        </View> */}
                    </View>
                )
                break
        }

        return slideContent
    }

    // used by All tab (currently not active)
    const generatePieData = (): PieChartData[] => {
        const bothBlank = !incomeVal && !expensesVal

        return [
            {
                value: bothBlank ? 50 : incomeVal,
                svg: {
                    fill: 'green',
                    onPress: () => { }
                },
                key: 'income'
            },
            {
                value: bothBlank ? 50 : expensesVal,
                svg: {
                    fill: 'red',
                    onPress: () => { }
                },
                key: 'expenses'
            }
        ]
    }

    useEffect(() => {
        console.log('initial useEffect');

        // TODO: get user data from asyncstorage

    }, [])

    // NOTE: may scrap carousel idea due to drawer swipe interfering with
    // carousel slide swipe
    return (
        <Page>
            {/* <View style={styles.HeaderContainer}>
                <Text style={styles.Header}>Dashboard</Text>
            </View> */}
            <Carousel
                sliderWidth={deviceWidth}
                itemWidth={itemWidth}
                data={INFO_SLIDES}
                renderItem={renderInfoSlides}
                loop={false}
                enableMomentum={false}
                lockScrollWhileSnapping
                autoplay={false}
            />
        </Page>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginBottom: 20
    },
    Header: {
        fontSize: 24,
        fontWeight: '800'
    },
    MainContainer: {
        alignItems: 'center'
    }
})

export default Home
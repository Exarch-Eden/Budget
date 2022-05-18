import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MonthlyExpenseSlide from '../components/home-slides/MonthlyExpenseSlide'

import Text from '../components/Text'
import { InfoSlideRenderFunc } from '../constants/types/slides'

import { INFO_SLIDES } from '../constants/values/slides'
import { STYLES } from '../styles'

const Home = () => {
    const deviceWidth = Dimensions.get('window').width
    const itemWidth = deviceWidth - 40

    /**
     * Used to gauge monthly spending on Recent Spendings tab.
     * Value range MUST be: -90 < value < 90
     * -89/+89: y = 0
     */
    const [spendEndAngle, setSpendEndAngle] = useState(-88)

    /**
     * Used to store the dynamically-calculated height of the parent view
     * holding the pie charts so that said charts can match it.
     */
    const [expenseViewWidth, setExpenseViewWidth] = useState(0)

    const renderInfoSlides: InfoSlideRenderFunc = ({ item }) => {
        let slideContent

        switch (item.type) {
            case 'spend':
                slideContent = (
                    <MonthlyExpenseSlide
                        onLayout={e => setExpenseViewWidth(e.nativeEvent.layout.width)}
                        expenseViewWidth={expenseViewWidth}
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

    useEffect(() => {

    }, [])

    return (
        <View style={[STYLES.page]}>
            <View style={styles.HeaderContainer}>
                <Text style={styles.Header}>Dashboard</Text>
            </View>
            {/* <Carousel
                sliderWidth={deviceWidth}
                itemWidth={itemWidth}
                data={INFO_SLIDES}
                renderItem={renderInfoSlides}
                loop={false}
                enableMomentum={false}
                lockScrollWhileSnapping
                autoplay={false}
            /> */}
        </View>
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
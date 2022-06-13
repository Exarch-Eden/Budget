import React, { FC, useEffect, useState } from 'react'
import { Dimensions, LayoutChangeEvent, ScrollView, View } from 'react-native'
import Svg, { SvgXml } from 'react-native-svg'
import { AnimationStyle } from 'victory-core'
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory-native'

import Text from '../Text'
import { filterSvg } from '../../assets/svgs'
import { MonetaryData } from '../../constants/types/monetary-types'
import { STYLES, THEME } from '../../styles'
import MonthlyExpenseList from './MonthlyExpenseList'
import { useExpenseDimensions } from '../../hooks/useExpenseDimensions'

const deviceWidth = Dimensions.get('window').width
const PIE_WIDTH = deviceWidth
const PIE_HEIGHT = 300
const PIE_RADIUS = 150
const PIE_INNER_RAD = PIE_RADIUS - 10

// TODO: remove later
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

// TODO: remove later
const AVERAGE_SPENDING = 200

interface MonthlyExpenseSlideProps {
    curMonthlyExpenses: MonetaryData[],
    spendEndAngle: number
}

const MonthlyExpenseSlide: FC<MonthlyExpenseSlideProps> = ({
    curMonthlyExpenses,
    spendEndAngle
}) => {
    const {
        expenseViewWidth,
        expenseListHeight,
        setExpenseViewWidth,
        setExpenseViewHeight,
        setExpenseListY
    } = useExpenseDimensions()

    // the label rendered in the middle of the half-pie
    const TotalMonthlyExpenseLabel = (props: AnimationStyle) => {
        // PIE_HEIGHT is divided by 4
        // because desired height for half-pie
        // has denumerator of 2; divide by 2 again
        // to put the label in the middle of the half-pie
        const labelY = PIE_HEIGHT / 4

        return (
            <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={expenseViewWidth / 2}
                y={labelY}
                text={`$${props.target}`}
                style={{
                    // changes text colour
                    fill: THEME.PRIMARY.Light,
                    fontSize: STYLES.textLarge.fontSize
                }}
            />
        )
    }

    return (
        <ScrollView
            onLayout={e => {
                setExpenseViewWidth(e.nativeEvent.layout.width)
                setExpenseViewHeight(e.nativeEvent.layout.height)
            }}
        >
            <Text size='large' numberOfLines={1}>Recent Spendings</Text>
            {/* Svg height is half of pie because we are only using the top half */}
            <Svg
                height={PIE_HEIGHT / 2}
                width='100%'
                style={{
                    marginVertical: 20,
                }}
            >
                {/* TODO: add monthly expense amount in center of pie (in open space) */}
                <VictoryPie
                    animate={{ duration: 500 }}
                    data={DUMMY_DATA}
                    height={PIE_HEIGHT}
                    width={expenseViewWidth || PIE_WIDTH}
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
                    width={expenseViewWidth || PIE_WIDTH}
                    radius={PIE_RADIUS}
                    padAngle={0}
                    standalone={false}
                    innerRadius={PIE_INNER_RAD}
                    startAngle={-89}
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
                <VictoryAnimation
                    duration={1000}
                    data={{
                        target: curMonthlyExpenses.reduce(
                            (prev, cur) => {
                                return {
                                    value: prev.value + cur.value
                                }
                            }, {
                            value: 0
                        }
                        ).value.toFixed(2)
                    }}
                >
                    {TotalMonthlyExpenseLabel}
                </VictoryAnimation>
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
            <MonthlyExpenseList
                curMonthlyExpenses={curMonthlyExpenses}
                style={expenseListHeight
                    ? {
                        height: expenseListHeight
                    } : undefined
                }
                onLayout={e => {
                    setExpenseListY(e.nativeEvent.layout.y)
                }}
            />
        </ScrollView>
    )
}

export default MonthlyExpenseSlide
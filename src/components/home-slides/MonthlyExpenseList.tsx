import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'

import Text from '../Text'
import { MonetaryData } from '../../constants/types/monetary-types'

interface MonthlyExpenseListProps extends ViewProps {
    curMonthlyExpenses: MonetaryData[],
    style?: StyleProp<ViewStyle>
}

const MonthlyExpenseList: React.FC<MonthlyExpenseListProps> = ({
    curMonthlyExpenses,
    style,
    ...rest
}) => {

    return (
        <View
            style={[styles.container, style]}
            {...rest}
        >
            {
                curMonthlyExpenses.length
                    ? (
                        <>
                            <View>
                                {
                                    curMonthlyExpenses.map((curExpense) => {
                                        return (
                                            <View key={curExpense.timestamp}>
                                                <Text>{curExpense.category}</Text>
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
                                                <Text>{curExpense.value.toFixed(2)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </>
                    )
                    : (
                        <View
                            style={styles.noDataTextContainer}
                        >
                            <Text size='medium'>{'No expense data :<'}</Text>
                        </View>
                    )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        // for testing purposes; TODO: remove later
        // borderColor: 'red',
        // borderWidth: 1
    },
    noDataTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MonthlyExpenseList
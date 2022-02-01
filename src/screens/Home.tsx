import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/reducers/userSlice';
// import { PieChart } from 'react-native-chart-kit'
// import { PieChartProps } from 'react-native-chart-kit/dist/PieChart'
import { PieChart, PieChartData } from 'react-native-svg-charts'

const Home = () => {
    const { income, spendings } = useAppSelector(selectUserData)

    useEffect(() => {
        // TODO: get user data from asyncstorage
        // and set redux user data
    }, [])

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const generatePieData = (): PieChartData[] => {
        // for react-native-svg-charts
        return [
            {
                value: income || 50,
                svg: {
                    fill: randomColor(),
                    onPress: () => { }
                },
                key: `income`
            },
            {
                value: spendings || 50,
                svg: {
                    fill: randomColor(),
                    onPress: () => { }
                },
                key: `spendings`
            },
        ]
    }

    return (
        <View style={styles.container as ViewStyle}>
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
    }
})

export default Home;

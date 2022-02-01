import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/reducers/userSlice';
import { PieChart } from 'react-native-chart-kit'
import { PieChartProps } from 'react-native-chart-kit/dist/PieChart'

const chartConfig = {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    // backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // strokeWidth: 3, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get('screen').width

const Home = () => {
    const { income, spendings } = useAppSelector(selectUserData)

    useEffect(() => {
        // TODO: get user data from asyncstorage
        // and set redux user data

        // console.log('screenWidth: ', screenWidth);
        // console.log('screenWidth / 2 - 220: ', (screenWidth / 2) - 110);
    }, [])

    const generatePieData = () => {
        return [
            {
                name: 'Income',
                population: income || 50,
                color: '#ccc',
                legendFontColor: '#ccc',
                legendFontSize: 15
            },
            {
                name: 'Spendings',
                population: spendings || 50,
                color: 'red',
                legendFontColor: 'red',
                legendFontSize: 15
            }
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
                <PieChart
                    data={generatePieData()}
                    chartConfig={chartConfig}
                    width={screenWidth - 40}
                    height={220}
                    accessor='population'
                    backgroundColor='transparent'
                    paddingLeft='0'
                />
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

import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/reducers/userSlice';
// import { PieChart } from 'react-native-chart-kit'
// import { PieChartProps } from 'react-native-chart-kit/dist/PieChart'
import { PieChart, PieChartData } from 'react-native-svg-charts'

const Home = () => {
    const { income, spendings } = useAppSelector(selectUserData)

    const [modalVisible, setModalVisible] = useState(false)

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

    const addButtonOnPress = () => {
        setModalVisible(true)
    }

    return (
        <View style={styles.container as ViewStyle}>
            <Modal visible={modalVisible} transparent>
                <View style={{ width: '100%', height: Dimensions.get('screen').height * 0.4, opacity: 0.5 }}></View>
                <View style={{ borderRadius: 25, padding: 20, paddingTop: 30, backgroundColor: 'white', width: '100%', height: Dimensions.get('screen').height * 0.6 }}>
                    <View>
                        <Text>This is a modal</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ borderColor: 'red', borderWidth: 1, padding: 20, width: '80%' }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
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
            <TouchableOpacity style={styles.addButton} onPress={() => addButtonOnPress()}>
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
    }
})

export default Home;

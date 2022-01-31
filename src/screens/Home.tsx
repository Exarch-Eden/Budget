import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/reducers/userSlice';

const Home = () => {
    const { income, spendings } = useAppSelector(selectUserData)

    useEffect(() => {
        // TODO: get user data from asyncstorage
        // and set redux user data
    }, [])

    return (
        <View style={styles.container as ViewStyle}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>My Dashboard</Text>
            </View>
            <View style={styles.mainContainer}>
                <Text>Income: ${income}</Text>
                <Text>Spendings: ${spendings}</Text>
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

    }
})

export default Home;

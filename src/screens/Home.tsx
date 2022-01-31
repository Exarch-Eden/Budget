import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

const Home = () => {
    

    return (
        <View style={styles.container as ViewStyle}>
            <Text style={styles.header}>My Dashboard</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: '800'
    }
})

export default Home;

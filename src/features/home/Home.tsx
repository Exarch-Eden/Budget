import { View, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { Account } from "../../types/account";
import AccountCarousel from "./components/AccountCarousel";
import { VictoryPie } from "victory-native";
import { COLORS, TEXT } from "../../styles";
import DonutChart from "../universal/DonutChart";
import Page from "../universal/Page";
import ThemedText from "../universal/ThemedText";
import useDimensions from "../../hooks/useDimensions";

const Home = () => {
    const { windowWidth, windowHeight } = useDimensions()

    const [accounts, setAccounts] = useState<Account[]>([]);

    const getCachedAccounts = async () => {
        console.log("getCachedAccounts()");
        // TODO: implement custom read write process for local data (replace async storage)
        
        try {
            // TODO: implement async storage fetch logic to get account data

            setAccounts([
                {
                    CreationDate: 123,
                    Id: "123abc",
                    Type: "Chequing",
                    Name: "HSBC1"
                }
            ])
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCachedAccounts() 
    }, [])

    return (
        <Page
            
            style={{
                alignItems: "center"
            }}
        >
            <ThemedText style={TEXT.Large}>
                Dashboard
            </ThemedText>
            {/* <DonutChart /> */}
            <AccountCarousel
                data={accounts}
            />
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.PRIMARY.Dark
        backgroundColor: COLORS.PRIMARY.Dark,
    },
});

export default Home;

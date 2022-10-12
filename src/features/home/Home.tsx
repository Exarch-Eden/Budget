import { View, Text } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { Account } from "../../types/account.types";
import AccountCarousel from "./components/AccountCarousel";

const Home = () => {
    const [accounts, setAccounts] = useState<Account[]>([])

    return (
        <View>
            <Text>Home</Text>
            <AccountCarousel
                data={accounts}
                sliderWidth={}
            />
        </View>
    );
};

export default Home;

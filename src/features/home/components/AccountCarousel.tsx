import { View, Text, TouchableOpacity, ListRenderItem, StyleSheet } from "react-native";
import React from "react";
import Carousel, { CarouselProps } from "react-native-snap-carousel";
import { Account } from "../../../types/account";
import RoundedContainer from "../../universal/RoundedContainer";

interface AccountCarouselProps extends Omit<CarouselProps<Account>, "renderItem"> {}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ ...rest }) => {
    const renderItem: ListRenderItem<Account> = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => console.log("pressed account:\n")}
                style={styles.accountContainer}
            >
                <RoundedContainer>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </RoundedContainer>
            </TouchableOpacity>
        );
    };

    return <Carousel {...rest} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
    accountContainer: {

    }
})

export default AccountCarousel;

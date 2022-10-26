import {
    View,
    Text,
    TouchableOpacity,
    ListRenderItem,
    StyleSheet,
    Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Carousel, { CarouselProps } from "react-native-snap-carousel";
import { Account } from "../../../types/account";
import RoundedContainer from "../../universal/RoundedContainer";
import { VictoryPie } from "victory-native";
import { COLORS } from "../../../styles";
import useDimensions from "../../../hooks/useDimensions";

interface AccountCarouselProps
    extends Omit<CarouselProps<Account>, "renderItem"> {
    data: Account[];
}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ data, ...rest }) => {
    const { windowWidth, windowHeight } = useDimensions();

    useEffect(() => {
        console.log("account carousel dimensions:\n", {
            windowWidth,
            windowHeight
        });
    }, [windowWidth, windowHeight])

    const renderItem: ListRenderItem<Account> = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => console.log("pressed account:\n")}
                style={[
                    styles.accountContainer,
                    {
                        width: windowWidth,
                    },
                ]}
            >
                <RoundedContainer
                    style={
                        {
                            // width: windowWidth * 0.9,
                            // paddingHorizontal:
                        }
                    }
                >
                    {/* <VictoryPie
                        animate={{ duration: 500 }}
                        // for testing purposes; TODO: remove later                        
                        data={[
                            {
                                y: 1,
                                color: COLORS.PRIMARY.Green
                            }
                        ]}
                        height={300}
                        width={Dimensions.get("window").width}
                    /> */}
                </RoundedContainer>
            </TouchableOpacity>
        );
    };

    return (
        <Carousel
            data={data}
            sliderWidth={windowWidth || 300}
            itemWidth={windowWidth * 0.9 || 300}
            itemHeight={windowHeight * 0.9 || 300}
            renderItem={renderItem}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    accountContainer: {
        flex: 1,
    },
});

export default AccountCarousel;

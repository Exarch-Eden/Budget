import {
    View,
    Text,
    TouchableOpacity,
    ListRenderItem,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import Carousel, { CarouselProps } from "react-native-snap-carousel";
import { Account } from "../../../types/account";
import RoundedContainer from "../../universal/RoundedContainer";
import { VictoryPie } from "victory-native";
import { COLORS, SPACING } from "../../../styles";
import useDimensions from "../../../hooks/useDimensions";
import { CHART_ANIMATION_DURATION_MS } from "../../../constants/chart";
import Svg from "react-native-svg";

interface AccountCarouselProps
    extends Omit<CarouselProps<Account>, "renderItem"> {
    data: Account[];
}

const AccountCarousel: React.FC<AccountCarouselProps> = ({ data, ...rest }) => {
    const { windowWidth, windowHeight } = useDimensions();

    const containerWidth = windowWidth * 0.9
    const containerHeight = windowHeight * 0.9
    const pieDimensions = containerWidth * 0.2214
    const pieRadius = pieDimensions / 2
    // const pieRadius = Dimensions.get("window").width / 2 - SPACING.GENERAL * 2

    useEffect(() => {
        console.log("account carousel dimensions:\n", {
            windowWidth,
            windowHeight
        });

        console.log("pieDimensions:\n", pieDimensions);
    }, [windowWidth, windowHeight])
    
    const renderItem: ListRenderItem<Account> = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => console.log("pressed account:\n")}
                style={[
                    styles.accountContainer,
                    {
                        width: containerWidth,
                        height: containerHeight
                    },
                ]}
            >
                <RoundedContainer
                    style={{
                        borderColor: "red",
                        borderWidth: 1
                    }}
                    noPadding
                >
                    <Svg
                        height={pieDimensions}
                        width={pieDimensions}
                        // for testing purposes; TODO: remove later
                        style={{
                            borderColor: "blue",
                            borderWidth: 1
                        }}
                    >
                    <VictoryPie
                        animate={{ duration: CHART_ANIMATION_DURATION_MS }}
                        // for testing purposes; TODO: remove later                        
                        data={[
                            {
                                y: 1,
                                color: COLORS.PRIMARY.Green
                            }
                        ]}
                        height={pieDimensions}
                        width={pieDimensions}
                        radius={pieRadius}
                        innerRadius={pieRadius - SPACING.GENERAL}
                        style={{
                            data: {
                                fill: ({ datum }) => datum.color
                            },
                        }}
                    />
                    </Svg>
                </RoundedContainer>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <Carousel
            data={data}
            sliderWidth={windowWidth || 300}
            itemWidth={containerWidth || 300}
            itemHeight={containerHeight || 300}
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

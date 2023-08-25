import { View, Text, Dimensions } from "react-native";
import React from "react";
import { VictoryPie } from "victory-native";
import { VictoryPieProps } from "victory-pie"
import { COLORS } from "../../styles";

interface DonutChartProps extends VictoryPieProps {
    height?: number,
    width?: number
}

const DonutChart: React.FC<DonutChartProps> = ({
    height,
    width,
    ...rest
}) => {
    return (
        <View onLayout={event => {
            const { width, height} = event.nativeEvent.layout
            console.log("actual dimensions:\n", {
                height,
                width
            });
        }}
        style={{
            borderColor: "red",
            borderWidth: 1
        }}
        >
        <VictoryPie
            animate={{ duration: 500 }}
            // for testing purposes; TODO: remove later
            data={[
                {
                    y: 1,
                    color: COLORS.PRIMARY.Green,
                },
            ]}
            // height={height || 300}
            // height={Dimensions.get("window").width}
            // width={width || Dimensions.get("window").width}
            radius={Dimensions.get("window").width / 2}
            // padAngle={2}
            // standalone={false}
            innerRadius={Dimensions.get("window").width / 2 - 10}
            // labels={() => null}
            style={{
                data: {
                    fill: ({ datum }) => datum.color,
                }
            }}
            {...rest}
        />
        </View>
    );
};

export default DonutChart;

import { View, Text } from "react-native";
import React from "react";
import Svg from "react-native-svg";
import { VictoryPie } from "victory-native";
import { CHART_ANIMATION_DURATION_MS } from "../../../constants/chart";
import { COLORS, SPACING } from "../../../styles";

interface AccountPieProps {
    dimensions: number;
}

const AccountPie: React.FC<AccountPieProps> = ({ dimensions }) => {
    const pieRadius = dimensions / 2;

    return (
        <Svg
            height={dimensions}
            width={dimensions}
            // for testing purposes; TODO: remove later
            style={{
                borderColor: "blue",
                borderWidth: 1,
            }}
        >
            <VictoryPie
                animate={{ duration: CHART_ANIMATION_DURATION_MS }}
                // for testing purposes; TODO: remove later
                data={[
                    {
                        y: 1,
                        color: COLORS.PRIMARY.Green,
                    },
                ]}
                height={dimensions}
                width={dimensions}
                radius={pieRadius}
                innerRadius={pieRadius - SPACING.GENERAL}
                style={{
                    data: {
                        fill: ({ datum }) => datum.color,
                    },
                }}
            />
        </Svg>
    );
};

export default AccountPie;

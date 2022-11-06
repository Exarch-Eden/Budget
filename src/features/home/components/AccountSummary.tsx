import { View, Text } from "react-native";
import React from "react";
import AccountPie from "./AccountPie";

interface AccountSummaryProps {
    pieDimensions: number
}

const AccountSummary: React.FC<AccountSummaryProps> = ({
    pieDimensions
}) => {
    return (
        <View>
            <AccountPie dimensions={pieDimensions} />
        </View>
    );
};

export default AccountSummary;

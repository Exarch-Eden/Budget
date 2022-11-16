import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AccountPie from "./AccountPie";
import ThemedText from "../../universal/ThemedText";
import { SPACING, TEXT } from "../../../styles";

interface AccountSummaryProps {
    pieDimensions: number;
    accountId: string;
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ accountId, pieDimensions }) => {
    const [accountData, setAccountData] = useState()

    useEffect(() => {
        console.log("accountId: ", accountId);
        
        // TODO: add local cache fetching logic for account data
    }, [])

    return (
        <View>
            <ThemedText style={[styles.marginBottom, TEXT.Medium]}>Chequing Account</ThemedText>
            <ThemedText style={[styles.marginBottom, TEXT.Small]}>SPENDINGS SINCE SEP. 01</ThemedText>
            <View style={styles.visualInfoContainer}>
                <AccountPie dimensions={pieDimensions} />
                <View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    visualInfoContainer: {
        flexDirection: "row"
    },
    marginBottom: {
        marginBottom: SPACING.GENERAL
    }
});

export default AccountSummary;

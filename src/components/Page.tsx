import { View } from "react-native";
import React, { Children, FC, ReactNode } from "react";
import { STYLES } from "../styles";

interface PageProps {
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
    return <View style={STYLES.page}>{Children.toArray(children)}</View>;
};

export default Page;

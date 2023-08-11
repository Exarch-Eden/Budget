import React, { FC, useEffect, useState } from "react";
import { AsyncStorage, StyleSheet, TextInput, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData, setUserData } from "../../redux/reducers/UserSlice";
import { STYLES, THEME } from "../../styles";
import Button from "../Button";
import GenericModal from "../GenericModal";
import Text from "../Text";

import { ChosenMonetaryType } from "../../constants/types/monetary-types";
import moment from "moment";

interface AddValueModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setTagModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    addButtonOnPress?: (chosenType: ChosenMonetaryType) => void;
    contentOnPress?: () => void;
    flashMessageRef?: React.MutableRefObject<FlashMessage>;
    textInputRef?: React.RefObject<TextInput>;
}

const AddValueModal: FC<AddValueModalProps> = ({
    modalVisible,
    setModalVisible,
    setTagModalVisible,
    addButtonOnPress,
    contentOnPress,
    flashMessageRef,
    textInputRef,
}) => {
    const userData = useAppSelector(selectUserData);
    const { income, expenses, tags } = userData;
    const dispatch = useAppDispatch();

    // ref used to manually trigger flash message inside modal
    // const modalFlashRef = useRef<FlashMessage>(null!)
    const [chosenType, setChosenType] = useState<ChosenMonetaryType>("income");
    const [addedValue, setAddedValue] = useState(0);
    const [addValueInput, setAddValueInput] = useState<string | undefined>();
    const [addValInputIsBlurred, setAddValInputIsBlurred] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | undefined>();

    const renderTags = () => {
        // for testing purposes
        // const tags = ['tag1', 'tag2']

        const tagsElem = tags?.map((tag, index) => {
            const marginCheck = index < tags.length - 1;
            console.log("tag: ", tag);
            console.log("index: ", index);
            console.log("marginCheck: ", marginCheck);

            return (
                <Button
                    key={`#${tag}`}
                    onPress={() =>
                        selectedTag !== tag
                            ? setSelectedTag(tag)
                            : setSelectedTag(undefined)
                    }
                    style={{ marginRight: marginCheck ? 10 : 0 }}
                    label={tag}
                    ignoreIsSelected
                />
            );
        });

        return (
            (tagsElem || [])
                // the add button
                .concat([
                    <Button
                        key="add"
                        onPress={() => setTagModalVisible(true)}
                        label="+ Add"
                        ignoreIsSelected
                        style={{ marginLeft: tags?.length ? 10 : 0 }}
                    />,
                ])
        );
    };

    useEffect(() => {
        if (!modalVisible) {
            setSelectedTag(undefined);
            setAddValueInput("");
            setAddedValue(0);
        }
    }, [modalVisible]);

    const modalAddButtonOnPress = async () => {
        // const modalAddButtonOnPress = async (chosenType: ChosenMonetaryType) => {
        try {
            console.log("modalAddButton()");

            if (!addValueInput && !addedValue)
                throw new Error("Amount field cannot be left blank");

            console.log("addValInputIsBlurred: ", addValInputIsBlurred);

            const valToUse = addValInputIsBlurred
                ? addedValue
                : Number(addValueInput);

            if (isNaN(valToUse)) {
                throw new Error("Value entered is not a number");
            }

            if (!setAddValInputIsBlurred) textInputRef?.current?.blur();

            const isIncome = chosenType === "income";

            // setTotalIncome(isIncome ? totalIncome + valToUse : totalIncome)
            // setTotalExpenses(isIncome ? totalExpenses : totalExpenses + valToUse)

            // TODO: allow user to select date and time
            const dataToAdd = {
                value: valToUse,
                tag: selectedTag,
                timestamp: moment().valueOf(),
            };

            const newUserData = {
                ...userData,
                income: isIncome ? [...income, dataToAdd] : income,
                expenses: isIncome ? expenses : [...expenses, dataToAdd],
            };

            console.log("isIncome: ", isIncome);
            console.log("new income: ", newUserData.income);
            console.log("new expenses: ", newUserData.expenses);

            dispatch(setUserData(newUserData));

            // save to local async storage
            await AsyncStorage.setItem(
                "@userData",
                JSON.stringify(newUserData)
            );
            setModalVisible(false);
        } catch (error) {
            console.log("Error occurred in modalAddButtonOnPress()");
            console.error(error);

            if (error instanceof Error) {
                console.log("error instanceof Error true");
                console.log("modalFlashRef: ", flashMessageRef);

                flashMessageRef?.current?.showMessage({
                    message: error.message,
                    duration: 5000,
                    type: "danger",
                });
            }
        }
    };

    useEffect(() => {
        console.log("modalFlashRef:\n", flashMessageRef);
    }, [flashMessageRef]);

    return (
        <GenericModal
            visible={modalVisible}
            setVisible={() => setModalVisible(!modalVisible)}
            contentOnPress={contentOnPress}
            flashMessageRef={flashMessageRef}
        >
            <>
                <Text style={[STYLES.textLarge, { marginBottom: 10 }]}>
                    Add Data
                </Text>
                {/* Monetary Type */}
                <Text size="small" style={{ alignSelf: "flex-start" }}>
                    Type
                </Text>
                <View style={styles.typeButtonsContainer}>
                    <Button
                        onPress={() => setChosenType("income")}
                        isSelected={chosenType === "income"}
                        style={{
                            marginRight: 10,
                        }}
                        label="Income"
                    />
                    <Button
                        onPress={() => setChosenType("expense")}
                        isSelected={chosenType === "expense"}
                        style={{
                            marginLeft: 10,
                        }}
                        label="Expense"
                    />
                </View>
                {/* Tag Selector */}
                <View
                    style={{
                        marginBottom: 10,
                        alignSelf: "flex-start",
                    }}
                >
                    <Text size="small" style={{ marginBottom: 5 }}>
                        {/* {tags ? 'Select an existing tag:' : 'You have no existing tags: '} */}
                        Categories
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            // borderColor: 'red',
                            // borderWidth: 1
                        }}
                    >
                        {renderTags()}
                    </View>
                </View>
                <Text size="small" style={{ alignSelf: "flex-start" }}>
                    Amount
                </Text>
                <View style={styles.dataInputContainer}>
                    <Text size="large">$</Text>
                    <TextInput
                        ref={textInputRef}
                        keyboardType="number-pad"
                        placeholderTextColor={THEME.PRIMARY.Light}
                        placeholder="0.00"
                        value={addValueInput}
                        onChangeText={(text) =>
                            setAddValueInput(text || undefined)
                        }
                        onBlur={() => {
                            setAddValInputIsBlurred(true);
                            if (addValueInput) {
                                const num = Number(addValueInput);
                                setAddValueInput(num.toFixed(2));
                                setAddedValue(num);
                            }
                            // if (addValueInput?.includes('.')) {
                            //     console.log('addValueInput has a dot');
                            // } else {
                            //     setAddValueInput(Number(addValueInput).toFixed(2))
                            // }
                        }}
                        onFocus={() => setAddValInputIsBlurred(false)}
                        style={{
                            width: "100%",
                            borderBottomColor: THEME.PRIMARY.Light,
                            borderBottomWidth: 2,
                            color: THEME.PRIMARY.Light,
                        }}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <Button
                        onPress={() => modalAddButtonOnPress()}
                        // onPress={() => addButtonOnPress(chosenType)}
                        label="ADD"
                        style={{
                            marginBottom: 10,
                        }}
                    />
                </View>
            </>
        </GenericModal>
    );
};

const styles = StyleSheet.create({
    modalAddButton: {
        borderColor: "orange",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    },
    modalCancelButton: {
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        // marginTop: 10,
        // marginBottom: 'auto'
    },
    typeButtonsContainer: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
    },
    dataInputContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
});

export default AddValueModal;

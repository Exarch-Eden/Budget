import React, { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Animated } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { THEME } from '../styles';
import Button from './Button';

interface GenericModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    closeModalButtonOnPress?: () => void,
    contentOnPress?: () => void,
    flashMessageRef?: React.MutableRefObject<FlashMessage>,
    children?: JSX.Element
}

const GenericModal: FC<GenericModalProps> = ({
    visible,
    setVisible,
    closeModalButtonOnPress,
    contentOnPress,
    flashMessageRef,
    children
}) => {
    // TODO: implement animated view
    // TODO: add Show More Details (opens new screen with more inputs)
    return <Modal visible={visible} transparent>
        <TouchableWithoutFeedback
            onPress={() => setVisible(false)}
        >
            <View
                style={styles.overlay}
            >
                {/* Used for instances where the modal is active and you want a message to 
                display over the 0.5 opacity overlay */}
                <FlashMessage ref={flashMessageRef} position="top" />
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback disabled={!contentOnPress} onPress={contentOnPress}>
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    borderColor: THEME.PRIMARY.Light,
                    padding: 20,
                    paddingTop: 30,
                    backgroundColor: THEME.SECONDARY.Dark,
                    width: '100%',
                    // height: Dimensions.get('screen').height * 0.6,
                }}
            >
                {React.Children.toArray(children)}
                <View style={{ width: '100%', }}>
                    <Button
                        onPress={closeModalButtonOnPress || (() => setVisible(false))}
                        style={{
                            borderColor: THEME.PRIMARY.Red
                        }}
                        textStyle={{
                            color: THEME.PRIMARY.Red
                        }}
                        label='CANCEL'
                    />
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    </Modal>
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%'
        // height: Dimensions.get('screen').height * 0.4, opacity: 0.5
    },
    modalCancelButton: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        // marginTop: 10,
        // marginBottom: 'auto'
    },
})

export default GenericModal;

import React, { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface GenericModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    closeModalButtonOnPress?: () => void,
    contentOnPress?: () => void,
    children?: JSX.Element
}

const GenericModal: FC<GenericModalProps> = ({ visible, setVisible, closeModalButtonOnPress, contentOnPress, children }) => {
    return <Modal visible={visible} transparent>
        <TouchableWithoutFeedback
            onPress={() => setVisible(false)}
        >
            <View
                style={styles.overlay}
            >
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback disabled={!contentOnPress} onPress={contentOnPress}>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    padding: 20,
                    paddingTop: 30,
                    backgroundColor: 'white',
                    width: '100%',
                    // height: Dimensions.get('screen').height * 0.6,
                }}
            >
                {React.Children.toArray(children)}
                <View style={{ width: '100%', }}>
                    <TouchableOpacity onPress={closeModalButtonOnPress || (() => setVisible(false))} style={styles.modalCancelButton}>
                        <Text style={{ color: 'red' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

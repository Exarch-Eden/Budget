import React, { FC, useEffect, useState } from 'react'
import { AsyncStorage, TextInput, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectUserData, setUserData } from '../../redux/reducers/UserSlice'
import { THEME } from '../../styles'
import Button from '../Button'
import GenericModal from '../GenericModal'
import Text from '../Text'

interface AddTagModalProps {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddTagModal: FC<AddTagModalProps> = ({
    modalVisible,
    setModalVisible
}) => {

    const userData = useAppSelector(selectUserData)
    const { income, expenses, tags } = userData
    const dispatch = useAppDispatch()
    
    const [addTagInput, setAddTagInput] = useState('')

    useEffect(() => {
        if (!modalVisible) {
            setAddTagInput('')
        }
    }, [modalVisible])

    const addTag = async () => {
        // TODO: account for duplicate tags

        const newTag = addTagInput.trim()

        console.log(`adding ${newTag} to tags array`);

        const newUserData = { ...userData, tags: tags ? [...tags, newTag] : [newTag] }

        dispatch(setUserData(newUserData))

        // save to local async storageF
        await AsyncStorage.setItem('@userData', JSON.stringify(newUserData))

        setModalVisible(false)
    }

    return (
        <GenericModal visible={modalVisible} setVisible={setModalVisible}>
            <>
                <Text size='large' style={{ marginBottom: 10 }}>Add Category</Text>
                <TextInput
                    placeholder='E.g. Salary'
                    value={addTagInput}
                    onChangeText={text => setAddTagInput(text)}
                    placeholderTextColor={THEME.PRIMARY.Light}
                    style={{
                        width: '100%',
                        borderBottomColor: THEME.PRIMARY.Light,
                        borderBottomWidth: 2,
                        marginBottom: 10,
                        color: THEME.PRIMARY.Light
                    }}
                />
                <View style={{ width: '100%' }}>
                    <Button
                        onPress={() => addTag()}
                        label='ADD'
                        style={{
                            marginBottom: 10
                        }}
                    />
                </View>
            </>
        </GenericModal>
    )
}

export default AddTagModal
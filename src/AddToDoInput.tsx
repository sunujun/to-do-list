import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ITEM_WIDTH } from './util';

const AddToDoInput = ({
    value,
    onChangeText,
    placeholder,
    onPressAdd,
}: {
    value: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    onPressAdd: () => void;
}) => {
    return (
        <View style={{ width: ITEM_WIDTH, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={{ flex: 1, padding: 5, color: '#595959' }}
            />
            <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
                <AntDesign name="plus" size={18} color="#595959" />
            </TouchableOpacity>
        </View>
    );
};

export default AddToDoInput;

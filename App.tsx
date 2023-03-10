import React, { useRef } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import { getCalendarColumns, ITEM_WIDTH } from './src/util';
import { useCalendar } from './src/hooks/useCalendar';
import { ToDoList, useToDoList } from './src/hooks/useToDoList';
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddToDoInput from './src/AddToDoInput';

const App = () => {
    const now = dayjs();
    const {
        selectedDate,
        setSelectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        onPressArrow,
    } = useCalendar(now);
    const { toDoList, filteredToDoList, input, setInput, addToDo, removeToDo, toggleToDo, resetInput } =
        useToDoList(selectedDate);
    const columns = getCalendarColumns(selectedDate);
    const flatListRef = useRef<FlatList>(null);

    const onPressDate = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
    };
    const scrollToEnd = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 300);
    };
    const onPressAdd = () => {
        addToDo();
        resetInput();
        scrollToEnd();
    };
    const onSubmitEditing = () => {
        addToDo();
        resetInput();
        scrollToEnd();
    };
    const onFocus = () => {
        scrollToEnd();
    };

    const ListHeaderComponent = () => (
        <View>
            <Calendar
                toDoList={toDoList}
                columns={columns}
                selectedDate={selectedDate}
                onPressArrow={onPressArrow}
                onPressHeaderDate={showDatePicker}
                onPressDate={onPressDate}
            />
            <Margin height={15} />
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#A3A3A3', alignSelf: 'center' }} />
            <Margin height={15} />
        </View>
    );

    const renderItem = ({ item: toDo }: { item: ToDoList }) => {
        const isSuccess = toDo.isSuccess;
        const onPress = () => {
            toggleToDo(toDo.id);
        };
        const onLongPress = () => {
            Alert.alert('??????????????????????', '', [
                {
                    style: 'cancel',
                    text: '?????????',
                },
                {
                    text: '???',
                    onPress: () => removeToDo(toDo.id),
                },
            ]);
        };

        return (
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                    width: ITEM_WIDTH,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderBottomColor: '#A6A6A6',
                    borderBottomWidth: 0.2,
                    flexDirection: 'row',
                }}>
                <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{toDo.content}</Text>
                <Ionicons name="ios-checkmark" size={17} color={isSuccess ? '#595959' : '#BFBFBF'} />
            </Pressable>
        );
    };

    return (
        <SafeAreaProvider>
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <Image
                    source={{
                        // ??????: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm
                        uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
                <SafeAreaView style={styles.container}>
                    <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <FlatList
                            ref={flatListRef}
                            data={filteredToDoList}
                            ListHeaderComponent={ListHeaderComponent}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingTop: 30 }}
                            showsVerticalScrollIndicator={false}
                        />
                        <AddToDoInput
                            value={input}
                            onChangeText={setInput}
                            placeholder={`${dayjs(selectedDate).format('MM.DD')}??? ????????? ToDo`}
                            onPressAdd={onPressAdd}
                            onSubmitEditing={onSubmitEditing}
                            onFocus={onFocus}
                        />
                    </KeyboardAvoidingView>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </SafeAreaView>
            </Pressable>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;

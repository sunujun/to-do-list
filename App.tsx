import React from 'react';
import { FlatList, GestureResponderEvent, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import dayjs from 'dayjs';
import { getCalendarColumns, getDayColor, getDayText } from './src/util';

const columnSize = 30;

const Column = ({ text, color, opacity }: { text: number | string; color: string; opacity: number }) => {
    return (
        <View style={{ width: columnSize, height: columnSize, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color, opacity }}>{text} </Text>
        </View>
    );
};

const ArrowButton = ({ iconName, onPress }: { iconName: string; onPress?: (event: GestureResponderEvent) => void }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <SimpleLineIcons name={iconName} size={15} color="#404040" />
        </TouchableOpacity>
    );
};

const App = () => {
    const now = dayjs();
    const columns = getCalendarColumns(now);
    const ListHeaderComponent = () => {
        const currentDateText = dayjs(now).format('YYYY.MM.DD.');
        return (
            <View>
                {/* YYYY.MM.DD. */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowButton iconName="arrow-left" />
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
                    </TouchableOpacity>
                    <ArrowButton iconName="arrow-right" />
                </View>
                {/* 일 월 화 수 목 금 토 */}
                <View style={{ flexDirection: 'row' }}>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => {
                        const dayText = getDayText(day);
                        const color = getDayColor(day);
                        return <Column key={`day-${dayText}`} text={dayText} color={color} opacity={1} />;
                    })}
                </View>
            </View>
        );
    };

    const renderItem = ({ item: date }: { item: dayjs.Dayjs }) => {
        const dateText = dayjs(date).get('date');
        const day = dayjs(date).get('day');
        const color = getDayColor(day);
        const isCurrentMonth = dayjs(date).isSame(now, 'month');

        return <Column text={dateText} color={color} opacity={isCurrentMonth ? 1 : 0.4} />;
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <FlatList
                    data={columns}
                    keyExtractor={(_, index) => `columns-${index}`}
                    numColumns={7}
                    renderItem={renderItem}
                    ListHeaderComponent={ListHeaderComponent}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;

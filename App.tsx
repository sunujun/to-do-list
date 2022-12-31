import React from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { getCalendarColumns } from './src/util';

const App = () => {
    const now = dayjs();
    const columns = getCalendarColumns(now);

    return <View></View>;
};

const styles = StyleSheet.create({});

export default App;

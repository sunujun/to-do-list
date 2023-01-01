import { useState } from 'react';
import dayjs from 'dayjs';

export const useCalendar = (now: dayjs.Dayjs) => {
    const [selectedDate, setSelectedDate] = useState(now);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setSelectedDate(dayjs(date));
        hideDatePicker();
    };

    const onPressArrow = (direction: 'left' | 'right') => {
        const newSelectedDate =
            direction === 'left' ? dayjs(selectedDate).subtract(1, 'month') : dayjs(selectedDate).add(1, 'month');
        setSelectedDate(newSelectedDate);
    };

    return {
        selectedDate,
        setSelectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        onPressArrow,
    };
};

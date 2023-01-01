import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export interface ToDoList {
    id: number;
    content: string;
    date: dayjs.Dayjs;
    isSuccess: boolean;
}

const TO_DO_LIST_KEY = 'TO_DO_LIST_KEY';

export const useToDoList = (selectedDate: dayjs.Dayjs) => {
    const [toDoList, setToDoList] = useState<ToDoList[]>([]);
    const [input, setInput] = useState('');

    const init = async () => {
        const result = await AsyncStorage.getItem(TO_DO_LIST_KEY);
        if (result) {
            const newToDoList: ToDoList[] = JSON.parse(result);
            setToDoList(newToDoList);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const saveToDoList = (newToDoList: ToDoList[]) => {
        setToDoList(newToDoList);
        AsyncStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(newToDoList));
    };
    const addToDo = () => {
        const lastId = toDoList.length === 0 ? 0 : toDoList[toDoList.length - 1].id;
        const newToDoList: ToDoList[] = [
            ...toDoList,
            {
                id: lastId + 1,
                content: input,
                date: selectedDate,
                isSuccess: false,
            },
        ];
        saveToDoList(newToDoList);
    };
    const removeToDo = (toDoId: number) => {
        const newToDoList = toDoList.filter(toDo => toDo.id !== toDoId);
        saveToDoList(newToDoList);
    };
    const toggleToDo = (toDoId: number) => {
        const newToDoList = toDoList.map(toDo => {
            if (toDo.id !== toDoId) {
                return toDo;
            }
            return {
                ...toDo,
                isSuccess: !toDo.isSuccess,
            };
        });
        saveToDoList(newToDoList);
    };
    const resetInput = () => {
        setInput('');
    };
    const filteredToDoList = toDoList.filter(toDo => {
        const isSameDate = dayjs(toDo.date).isSame(selectedDate, 'date');
        return isSameDate;
    });

    return {
        toDoList,
        filteredToDoList,
        input,
        setInput,
        addToDo,
        removeToDo,
        toggleToDo,
        resetInput,
    };
};

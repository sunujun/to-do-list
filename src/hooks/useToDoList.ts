import { useState } from 'react';
import dayjs from 'dayjs';

export interface ToDoList {
    id: number;
    content: string;
    date: dayjs.Dayjs;
    isSuccess: boolean;
}

export const useToDoList = (selectedDate: dayjs.Dayjs) => {
    const [toDoList, setToDoList] = useState<ToDoList[]>([]);
    const [input, setInput] = useState('');

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
        setToDoList(newToDoList);
    };

    const removeToDo = (toDoId: number) => {
        const newToDoList = toDoList.filter(toDo => toDo.id !== toDoId);
        setToDoList(newToDoList);
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
        setToDoList(newToDoList);
    };

    const resetInput = () => {
        setInput('');
    };

    const filteredToDoList = toDoList.filter(toDo => {
        const isSameDate = dayjs(toDo.date).isSame(selectedDate, 'date');
        return isSameDate;
    });

    return {
        filteredToDoList,
        input,
        setInput,
        addToDo,
        removeToDo,
        toggleToDo,
        resetInput,
    };
};

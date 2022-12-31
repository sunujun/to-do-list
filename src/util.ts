import dayjs from 'dayjs';

export const fillEmptyColumns = (
    columns: dayjs.Dayjs[],
    start: string | number | Date | dayjs.Dayjs | null | undefined,
    end: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
    const filledColumns = columns.slice();

    const startDay = dayjs(start).get('day');
    // 첫날 이전 공백 채우기
    for (let i = 1; i <= startDay; i += 1) {
        const date = dayjs(start).subtract(i, 'day');
        filledColumns.unshift(date);
    }
    const endDay = dayjs(end).get('day');
    // 2. 마지막날 이후 공백 채우기
    for (let i = 1; i <= 6 - endDay; i += 1) {
        const date = dayjs(end).add(i, 'day');
        filledColumns.push(date);
    }

    return filledColumns;
};
export const getCalendarColumns = (now: string | number | Date | dayjs.Dayjs | null | undefined) => {
    /** 달의 첫 날짜 정보 */
    const start = dayjs(now).startOf('month');
    /** 달의 마지막 날짜 정보 */
    const end = dayjs(now).endOf('month');
    /** 달의 일수가 몇 일인지 */
    const endDate = dayjs(end).get('date');

    const columns = [];
    // columns에 달의 날짜 정보를 모두 담음
    for (let i = 0; i < endDate; i += 1) {
        const date = dayjs(start).add(i, 'day');
        columns.push(date);
    }

    const filledColumns = fillEmptyColumns(columns, start, end);
    return filledColumns;
};

/**
 * @param day 0 - 6
 * @return 일 - 월
 */
const dayTexts = ['일', '월', '화', '수', '목', '금', '토'];
export const getDayText = (day: number) => {
    return dayTexts[day];
};

export const getDayColor = (day: number) => {
    return day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
};

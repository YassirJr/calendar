import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {addDays, addMinutes, format, Locale, startOfMonth, startOfWeek} from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getDaysInMonth = (date: Date) => {
    const startOfMonthDate = startOfMonth(date);
    let currentDate = startOfWeek(startOfMonthDate, {
        weekStartsOn: 0,
    });
    const calendar = [];

    while (calendar.length < 42) {
        calendar.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }

    return calendar;
};

export const generateWeekdays = (locale: Locale) => {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
        const date = addDays(startOfWeek(new Date(), {weekStartsOn: 0}), i);
        daysOfWeek.push(format(date, 'EEEEEE', {locale}));
    }
    return daysOfWeek;
};

export const generateTimes = () => {
    const times = []
    for (let hour = 8; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
            times.push(time)
        }
    }
    return times
}

export const getNextValidTime = () => {
    const now = new Date()
    return addMinutes(now, 30 - (now.getMinutes() % 30))
}

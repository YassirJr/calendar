import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {addDays, format, Locale, startOfMonth, startOfWeek} from "date-fns";

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
    const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i);
    daysOfWeek.push(format(date, 'EEEEEE', { locale }));
  }
  return daysOfWeek;
};


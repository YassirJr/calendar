import { useCalendar } from "@/hooks/use-calendar";
import { getDaysInMonth, generateWeekdays, cn } from "@/lib/utils";
import { format, isSameDay, isSameMonth, isToday } from "date-fns";
import { useMemo } from "react";

export const CalendarMonthView = () => {
    const { date, events, locale } = useCalendar();


    const monthDates = useMemo(() => getDaysInMonth(date), [date]);
    const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

    return (
        <div className="h-screen flex flex-col">
            <div className="grid grid-cols-7 gap-px sticky top-0 bg-background border-b">
                {weekDays.map((day, i) => (
                    <div
                        key={day}
                        className={cn(
                            'mb-2 text-right text-sm text-muted-foreground pr-2',
                            [0, 6].includes(i) && 'text-muted-foreground/50'
                        )}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid overflow-hidden -mt-px flex-1 auto-rows-fr p-px grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-px">
                {monthDates.map((_date) => {
                    const currentEvents = events.filter((event) =>
                        isSameDay(event.startDate, _date)
                    );

                    return (
                        <div
                            className={cn(
                                'ring-1 p-2 text-sm text-muted-foreground ring-border overflow-auto',
                                !isSameMonth(date, _date) && 'text-muted-foreground/50'
                            )}
                            key={_date.toString()}
                        >
                            <span
                                className={cn(
                                    'size-6 grid place-items-center rounded-full mb-1 sticky top-0',
                                    isToday(_date) && 'bg-primary text-primary-foreground'
                                )}
                            >
                                {format(_date, 'd')}
                            </span>

                            {currentEvents.map((event) => {
                                return (
                                    <div
                                        key={event.id}
                                        className="px-1 rounded text-sm flex items-center gap-1"
                                    >
                                        <div
                                            className={cn(
                                                'shrink-0',
                                            )}
                                        ></div>
                                        <span className="flex-1 truncate">{event.title}</span>
                                        <time className="tabular-nums text-muted-foreground/50 text-xs">
                                            {format(event.startDate, 'HH:mm')}
                                        </time>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
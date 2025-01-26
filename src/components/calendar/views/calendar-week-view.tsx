import { useCalendar } from "@/hooks/use-calendar";
import { EventGroup } from "../event-group";
import { TimeTable } from "../time-table";
import { addDays, format, isToday, setHours, startOfWeek } from "date-fns";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export const CalendarWeekView = () => {
    const { date, locale, events } = useCalendar();

    const weekDates = useMemo(() => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const weekDates = [];

        for (let i = 0; i < 7; i++) {
            const day = addDays(start, i);
            const hours = [...Array(24)].map((_, i) => setHours(day, i));
            weekDates.push(hours);
        }

        return weekDates;
    }, [date]);

    const headerDays = useMemo(() => {
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const result = addDays(startOfWeek(date, { weekStartsOn: 0 }), i);
            daysOfWeek.push(result);
        }
        return daysOfWeek;
    }, [date]);

    return (
        <div className="flex flex-col relative overflow-auto h-full">
            <div className="flex sticky top-0 bg-card z-10 border-b mb-3">
                <div className="w-12"></div>
                {headerDays.map((date, i) => (
                    <div
                        key={date.toString()}
                        className={cn(
                            'text-center flex-1 gap-1 pb-2 text-sm text-muted-foreground flex items-center justify-center',
                            [0, 6].includes(i) && 'text-muted-foreground/50'
                        )}
                    >
                        {format(date, 'E', { locale })}
                        <span
                            className={cn(
                                'h-6 grid place-content-center',
                                isToday(date) &&
                                'bg-primary text-primary-foreground rounded-full size-6'
                            )}
                        >
                            {format(date, 'd')}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex flex-1">
                <div className="w-fit">
                    <TimeTable />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 flex-1">
                    {weekDates.map((hours, i) => (
                        <div
                            className={cn(
                                'h-full text-sm text-muted-foreground border-l first:border-l-0',
                                [0, 6].includes(i) && 'bg-muted/50'
                            )}
                            key={hours[0].toString()}
                        >
                            {hours.map((hour) => (
                                <EventGroup
                                    key={hour.toString()}
                                    hour={hour}
                                    events={events}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
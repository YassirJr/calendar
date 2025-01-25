import {useCalendar} from "@/hooks/use-calendar";
import {format, setMonth} from "date-fns";
import {useMemo} from "react";
import {generateWeekdays, getDaysInMonth} from "@/lib/utils";
import {MonthCardForYearView} from "@/components/calendar/month-card-for-year-view";

export const CalendarYearView = () => {
    const {date, locale, today} = useCalendar();

    const months = useMemo(() => {
        return Array.from({length: 12}).map((_, i) => {
            return getDaysInMonth(setMonth(date, i));
        });
    }, [date]);

    const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

    return (
        <div className="p-4 grid grid-cols-4 gap-10 overflow-auto h-full">
            {months.map((days, i) => (
                <div key={days[0].toString()}>
                    <span className="text-xl">{format(setMonth(date, i), 'MMMM')} </span>

                    <div className="grid grid-cols-7 gap-2 my-5">
                        {weekDays.map((day) => (
                            <div
                                key={day}
                                className="text-center text-xs text-muted-foreground"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <MonthCardForYearView days={days} index={i} today={today}/>
                </div>
            ))}
        </div>
    );
};

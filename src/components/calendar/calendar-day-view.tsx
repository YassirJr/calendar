import { setHours } from "date-fns";
import {TimeTable} from "@/components/calendar/time-table";
import {useCalendar} from "@/hooks/use-calendar";
import {EventGroup} from "@/components/calendar/event-group";

export const CalendarDayView = () => {
    const {date , events} = useCalendar()
    const hours = [...Array(24)].map((_, i) => setHours(date, i));

    return (
        <div className="flex relative pt-2 overflow-auto h-full">
            <TimeTable />
            <div className="flex-1">
                {hours.map((hour) => (
                    <EventGroup key={hour.toString()} hour={hour} events={events} />
                ))}
            </div>
        </div>
    );
};
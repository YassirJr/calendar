import {CalendarLayout} from "@/components/calendar/calendar-layout";
import CalendarContext from "@/context/calendar-context";

export default function Calendar() {
    return (
        <div>
            <CalendarContext>
                <CalendarLayout/>
            </CalendarContext>
        </div>
    )
}
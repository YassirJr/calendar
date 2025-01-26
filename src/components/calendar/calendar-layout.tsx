"use client"

import {CalendarHeader} from "./calendar-header"
import {CalendarNav} from "@/components/calendar/calendar-nav";
import {CalendarYearView} from "@/components/calendar/views/calendar-year-view";
import {useCalendar} from "@/hooks/use-calendar";
import {CalendarMonthView} from "@/components/calendar/views/calendar-month-view";
import {CalendarWeekView} from "@/components/calendar/views/calendar-week-view";
import {CalendarDayView} from "@/components/calendar/views/calendar-day-view";

export function CalendarLayout() {

    const {viewMode} = useCalendar()

    return (
        <div className="rounded-lg border bg-background">
                <CalendarHeader/>
                <CalendarNav/>
                {
                    viewMode === 'year' ? <CalendarYearView/> :
                        viewMode === 'month' ? <CalendarMonthView/> :
                            viewMode === 'week' ? <CalendarWeekView/> :
                                viewMode === 'day' && <CalendarDayView/>
                }
        </div>
    )
}


"use client"

import { CalendarHeader } from "./calendar-header"
import {CalendarNav} from "@/components/calendar/calendar-nav";
import {CalendarYearView} from "@/components/calendar/calendar-year-view";
import CalendarContext from "@/context/calendar-context";

export function CalendarLayout() {

    return (
        <div className="rounded-lg border bg-background">
            <CalendarContext>
                <CalendarHeader />
                <CalendarNav />
                <CalendarYearView />
            </CalendarContext>
        </div>
    )
}


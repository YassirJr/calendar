import {Button} from "@/components/ui/button"
import {Calendar} from "lucide-react"
import {DateSwitcher} from "@/components/calendar/date-switcher"
import {TimeMode} from "@/components/calendar/time-mode";
import {ColorFilter} from "@/components/calendar/color-filter";
import {useCalendar} from "@/hooks/use-calendar";
import { ViewMode } from "@/components/calendar/views/view-mode";
import {AddEventDialog} from "@/components/forms/add-event";


export function CalendarNav() {
    const {month, today, setDate} = useCalendar()
    return (
        <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center gap-2">
                <DateSwitcher/>
            </div>

            <div className="flex items-center gap-2">
                <TimeMode/>
                <ColorFilter/>
                <Button variant="outline" size="sm" className="gap-2" disabled={month === today.getMonth() + 1}
                        onClick={
                            () => setDate(new Date())
                        }>
                    <Calendar className="h-4 w-4"/>
                    This Month
                </Button>
                <ViewMode/>
                <AddEventDialog/>
            </div>
        </div>
    )
}


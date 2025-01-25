import {Button} from "@/components/ui/button"
import {Calendar, LayoutGrid, List, MonitorPlay} from "lucide-react"
import {DateSwitcher} from "@/components/calendar/date-switcher"
import {TimeMode} from "@/components/calendar/time-mode";
import {ColorFilter} from "@/components/calendar/color-filter";
import {useCalendar} from "@/hooks/use-calendar";


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



                <Button className="gap-2">Add Event</Button>
            </div>
        </div>
    )
}


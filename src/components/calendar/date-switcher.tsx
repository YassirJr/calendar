import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format  } from "date-fns";
import { Button } from "@/components/ui/button";
import {DateSwitcherSelect} from "@/components/calendar/date-switcher-select";
import {useCalendar} from "@/hooks/use-calendar";

export function DateSwitcher() {
    const {date , setDate}= useCalendar()

    const handleNextMonth = () => {
        setDate(addMonths(date, 1))
    }

    const handlePrevMonth = () => {
        setDate(subMonths(date, 1))
    }

    const months = React.useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => ({
                value: i.toString(),
                label: format(new Date(2024, i), "MMMM"),
            })),
        []
    );

    const years = React.useMemo(
        () =>
            Array.from({ length: 10 }, (_, i) => {
                const year = 2024 + i;
                return { value: year.toString(), label: year.toString() };
            }),
        []
    );

    return (
        <div
            className="flex items-center gap-2"
        >
            <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-10 w-10">
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
                <DateSwitcherSelect
                    isMonth={true}
                    value={date.getMonth().toString()}
                    options={months}
                />

                <DateSwitcherSelect
                    isMonth={false}
                    value={date.getFullYear().toString()}
                    options={years}
                />
            </div>

            <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-10 w-10">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

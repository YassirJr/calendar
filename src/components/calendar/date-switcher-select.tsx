import * as React from "react";
import {motion} from "framer-motion";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useCalendar} from "@/hooks/use-calendar";
import {CalendarDaysIcon} from "lucide-react";

interface DateSwitcherSelectProps {
    isMonth: boolean;
    value: string;
    options: { value: string; label: string }[];
}

export function DateSwitcherSelect({isMonth, value, options}: DateSwitcherSelectProps) {

    const {date, setDate} = useCalendar()

    const onValueChange = (newDate: string) => {
        if (isMonth) {
            setDate(new Date(new Date(date).setMonth(Number.parseInt(newDate))))
        } else {
            setDate(new Date(new Date(date).setFullYear(Number.parseInt(newDate))))
        }
    }

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={`h-10 ${isMonth ? 'min-w-[140px]' : 'min-w-[110px]'} bg-white`}>
                <motion.div
                    initial={{y: isMonth ? 20 : -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.3}}
                    key={
                        options.find((option) => option.value === value)?.value
                    }
                    className="flex items-center justify-center gap-1"
                >
                    {
                        isMonth && <CalendarDaysIcon className="h-4 w-4"/>
                    }
                    <SelectValue>
                        <span>
                            {options.find((option) => option.value === value)?.label}
                        </span>
                    </SelectValue>
                </motion.div>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

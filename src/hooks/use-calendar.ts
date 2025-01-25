import {useContext} from "react";
import {CalendarStateContext} from "@/context/calendar-context";

export const useCalendar = () => useContext(CalendarStateContext)

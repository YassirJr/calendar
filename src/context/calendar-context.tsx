"use client"

import React, {createContext, useState} from 'react';
import {getMonth, getDay, getYear, getHours, Locale} from "date-fns";
import {enUS} from "date-fns/locale/en-US";
import {EventFormValues} from "@/lib/zod/form";

export type ViewMode = 'day' | 'week' | 'month' | 'year';
export type TimeMode = 'am' | 'pm';


export interface Color {
    id: string
    name: string
    value: string
}


interface CalendarContextProps {
    date: Date,
    today: Date,
    hours: number | null,
    day: number | null,
    month: number | null,
    year: number | null,
    locale: Locale,
    setDate: (date: Date) => void,
    events: EventFormValues[],
    addEvent: (event: EventFormValues) => void,
    deleteEvent: (eventId: string) => void,
    updateEvent: (event: EventFormValues) => void,
    updateEventDate: (eventId: string, newDate: Date) => void,
    resetEvents: () => void,
    viewMode: ViewMode,
    setViewMode: (view: ViewMode) => void,
    timeMode: TimeMode,
    setTimeMode: (time: TimeMode) => void,
    resetView: () => void,
    colors: Color[],
    selectedColors: string[],
    setSelectedColors: (colorId: string) => void,
    resetSelectedColors: () => void,
}

const colors: Color[] = [
    {id: "blue", name: "Blue", value: "bg-blue-500"},
    {id: "red", name: "Red", value: "bg-red-500"},
    {id: "green", name: "Green", value: "bg-green-500"},
    {id: "yellow", name: "Yellow", value: "bg-yellow-500"},
    {id: "purple", name: "Purple", value: "bg-purple-500"},
    {id: "pink", name: "Pink", value: "bg-pink-500"},
    {id: "indigo", name: "Indigo", value: "bg-indigo-500"},
]


export const CalendarStateContext = createContext<CalendarContextProps>(
    {
        date: new Date(),
        today: new Date(),
        hours: null,
        day: null,
        month: null,
        year: null,
        locale: enUS,
        setDate: () => {
        },
        events: [],
        addEvent: () => {
        },
        deleteEvent: () => {
        },
        updateEvent: () => {
        },
        updateEventDate: () => {
        },
        resetEvents: () => {
        },
        viewMode: 'day',
        setViewMode: () => {
        },
        timeMode: 'am',
        setTimeMode: () => {
        },
        resetView: () => {
        },
        colors,
        selectedColors: [],
        setSelectedColors: () => {
        },
        resetSelectedColors: () => {
        }
    }
)

export default function CalendarContext({children}: { children: React.ReactNode }) {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<EventFormValues[]>([])
    const [viewMode, setViewMode] = useState<ViewMode>('day')
    const [timeMode, setTimeMode] = useState<TimeMode>('am')
    const [selectedColors, _setSelectedColors] = useState<string[]>([])

    const hours = getHours(date)
    const day = getDay(date)
    const month = getMonth(date) + 1
    const year = getYear(date)

    const addEvent = (event: EventFormValues) => {
        setEvents((prev) => [...prev, event])
    }

    const deleteEvent = (eventId: string) => {
        setEvents((prev) => prev.filter((event) => event.id !== eventId))
    }

    const updateEvent = (updatedEvent: EventFormValues) => {
        setEvents((prev) => prev.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent
            } else {
                return event
            }
        }))
    }

    const resetEvents = () => {
        setEvents([])
    }

    const resetView = () => {
        setViewMode('day')
    }

    const setSelectedColors = (colorId: string) => {
        _setSelectedColors((prev) => {
            if (prev.includes(colorId)) {
                return prev.filter((id) => id !== colorId)
            } else {
                return [...prev, colorId]
            }
        })
    }

    const resetSelectedColors = () => {
        _setSelectedColors([])
    }

    const updateEventDate = (eventId: string, newDate: Date) => {
        setEvents((prev) =>
            prev.map((event) => {
                if (event.id === eventId) {
                    const oldDate = event.startDate;
                    return {
                        ...event,
                        startDate: new Date(
                            newDate.getFullYear(),
                            newDate.getMonth(),
                            newDate.getDate(),
                            oldDate.getHours(),
                            oldDate.getMinutes(),
                            oldDate.getSeconds()
                        ),
                    };
                }
                return event;
            })
        );
    };


    return (
        <CalendarStateContext.Provider value={{
            date,
            today: new Date(),
            hours,
            day,
            month,
            year,
            locale: enUS,
            setDate,
            events,
            addEvent,
            deleteEvent,
            updateEvent,
            updateEventDate,
            resetEvents,
            viewMode,
            setViewMode,
            timeMode,
            setTimeMode,
            resetView,
            colors,
            selectedColors,
            setSelectedColors,
            resetSelectedColors

        }}>
            {children}
        </CalendarStateContext.Provider>
    )
}
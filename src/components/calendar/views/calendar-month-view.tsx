import {useCalendar} from "@/hooks/use-calendar";
import {getDaysInMonth, generateWeekdays, cn} from "@/lib/utils";
import {format, isSameDay, isSameMonth, isToday} from "date-fns";
import React, {useMemo} from "react";
import {EventCard} from "@/components/calendar/event-card";

export const CalendarMonthView: React.FC = () => {
    const {date, events, locale, updateEventDate} = useCalendar();
    console.log(events)

    const monthDates = useMemo(() => getDaysInMonth(date), [date]);
    const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, eventId: string) => {
        event.dataTransfer.setData("eventId", eventId);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, newDate: Date) => {
        event.preventDefault();
        const eventId = event.dataTransfer.getData("eventId");
        if (eventId) {
            updateEventDate(eventId, newDate);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="grid grid-cols-7 gap-px sticky top-0 bg-background border-b">
                {weekDays.map((day, i) => (
                    <div
                        key={day}
                        className={cn(
                            "mb-2 text-right text-sm text-muted-foreground pr-2",
                            [0, 6].includes(i) && "text-muted-foreground/50"
                        )}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div
                className="grid overflow-hidden -mt-px flex-1 auto-rows-fr p-px grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-px">
                {monthDates.map((_date) => {
                    const currentEvents = events.filter((event) =>
                        isSameDay(event.startDate, _date)
                    );

                    return (
                        <div
                            key={_date.toString()}
                            className={cn(
                                "ring-1 p-2 text-sm text-muted-foreground ring-border overflow-auto",
                                !isSameMonth(date, _date) && "text-muted-foreground/50"
                            )}
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, _date)} // Handle drop event
                        >
                            {/* Date Display */}
                            <span
                                className={cn(
                                    "size-6 grid place-items-center rounded-full mb-1 sticky top-0",
                                    isToday(_date) && "bg-primary text-primary-foreground"
                                )}
                            >
                {format(_date, "d")}
              </span>

                            {currentEvents.map((event) => (
                                <div
                                    key={event.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, event.id!)} // Handle drag start
                                >
                                    <EventCard event={event}/>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

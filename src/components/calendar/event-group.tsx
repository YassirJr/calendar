import {differenceInMinutes, isSameHour} from 'date-fns';
import {cn} from "@/lib/utils";
import {Event} from "@/context/calendar-context";

export const EventGroup = ({
                               events,
                               hour,
                           }: {
    events: Event[];
    hour: Date;
}) => {
    return (
        <div className="h-20 border-t last:border-b">
            {events
                .filter((event) => isSameHour(event.start, hour) && !event.repeat)
                .map((event) => {
                    const hoursDifference = differenceInMinutes(event.end!, event.start) / 60;
                    const startPosition = event.start.getMinutes() / 60;

                    return (
                        <div
                            key={event.id}
                            className={cn(
                                'relative',
                            )}
                            style={{
                                top: `${startPosition * 100}%`,
                                height: `${hoursDifference * 100}%`,
                            }}
                        >
                            {event.title}
                        </div>
                    );
                })}
        </div>
    );
};
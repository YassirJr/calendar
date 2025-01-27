import {differenceInMinutes, isSameHour} from 'date-fns';
import {cn} from "@/lib/utils";
import {EventFormValues} from "@/lib/zod/form";
export const EventGroup = ({
                               events,
                               hour,
                           }: {
    events: EventFormValues[];
    hour: Date;
}) => {
    return (
        <div className="h-20 border-t last:border-b">
            {events
                .filter((event) => isSameHour(event.startDate, hour))
                .map((event) => {
                    const hoursDifference = differenceInMinutes(event.endDate!, event.startDate) / 60;
                    const startPosition = event.startDate.getMinutes() / 60;

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
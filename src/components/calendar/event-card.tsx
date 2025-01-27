import {EventFormValues} from "@/lib/zod/form";
import {format} from "date-fns";
import {useCalendar} from "@/hooks/use-calendar";

export const EventCard = ({event}: { event: EventFormValues }) => {
    const {colors} = useCalendar()
    const eventColor = colors.find(color => color.id === event.color) || colors[0]
    return (
        <div className={`p-2 my-2 border rounded-lg ${eventColor.value} `}>
            <div className="flex items-center justify-between">
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                        {format(event.startDate, 'HH:mm')}
                    </span>

                </div>
            </div>
            <p className="text-sm text-gray-500">{event.description}</p>
        </div>
    )
}
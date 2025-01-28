import {EventFormValues} from "@/lib/zod/form";
import {format} from "date-fns";
import {useCalendar} from "@/hooks/use-calendar";
import {AlertDialog} from "@radix-ui/react-alert-dialog";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {cn} from "@/lib/utils";

export const EventCard = ({event}: { event: EventFormValues }) => {
    const {colors} = useCalendar()
    const eventColor = colors.find(color => color.id === event.color) || colors[0]
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className={`p-2 my-2 border cursor-pointer rounded-lg ${eventColor.value} `}>
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
            </AlertDialogTrigger>
            <AlertDialogContent className={
                cn(
                    "p-4 rounded-lg shadow-lg",
                    eventColor.value
                )
            }>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex justify-between items-center">
                            <span>
                                {event.title}
                            </span>
                            <span>
                                {
                                    format(event.startDate, 'HH:mm')
                                }
                            </span>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            {
                                event.description
                            }
                        </p>
                        {

                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
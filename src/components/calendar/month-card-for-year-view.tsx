import {cn} from "@/lib/utils";
import {format, getMonth, isSameDay} from "date-fns";

export function MonthCardForYearView(
    {
        days,
        index,
        today
    }: {
        days: Date[]
        index: number,
        today: Date
    }
) {
    return (
        <div className="grid gap-x-2 text-center grid-cols-7 text-xs tabular-nums">
            {days.map((_date) => {
                return (
                    <div
                        key={_date.toString()}
                        className={cn(
                            getMonth(_date) !== index && 'text-muted-foreground'
                        )}
                    >
                        <button
                            className={cn(
                                'aspect-square grid place-content-center size-full tabular-nums',
                                isSameDay(today, _date) &&
                                getMonth(_date) === index &&
                                'bg-primary text-primary-foreground rounded-full'
                            )}
                            onClick={() => console.log(_date)}
                        >
                            {format(_date, 'd')}
                        </button>
                    </div>
                );
            })}
        </div>
    )
}
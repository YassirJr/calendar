"use client"

import {format} from "date-fns"
import {Switch} from "@/components/ui/switch"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription
} from "@/components/ui/form"
import {useFormContext} from "react-hook-form"
import {EventFormValues} from "@/lib/zod/form";
import {RepeatIcon} from "lucide-react";

export function RepeatingEventField() {
    const form = useFormContext<EventFormValues>()
    const startDate = form.watch("startDate")
    const endDate = form.watch("endDate")
    const startTime = form.watch("startTime")
    const endTime = form.watch("endTime")

    const repeatingText = `Repeat daily ${startTime} - ${endTime} from ${format(startDate, "MMM d")} to ${format(endDate, "MMM d")}?`

    return (
        <FormField
            control={form.control}
            name="isRepeating"
            render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                            <RepeatIcon className="h-4 w-4" />
                            Repeating Event?
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                            {repeatingText}
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

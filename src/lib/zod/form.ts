import * as z from "zod"

export const eventFormSchema = z.object({
    // id as uuid
    id: z.string().optional(),
    title: z.string().min(1, "Event title is required"),
    description: z.string().optional(),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    startTime: z.string({
        required_error: "Start time is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    endTime: z.string({
        required_error: "End time is required",
    }),
    isRepeating: z.boolean(),
    color: z.string( {
        required_error: "Please select an event color",
    }),
})

export type EventFormValues = z.infer<typeof eventFormSchema>
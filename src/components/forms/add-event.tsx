"use client"

import * as React from "react"
import {v4} from "uuid"
import {Calendar, CalendarPlusIcon} from "lucide-react"
import {format} from "date-fns"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Calendar as CalendarComponent} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {eventFormSchema, type EventFormValues} from "@/lib/zod/form"
import {useCalendar} from "@/hooks/use-calendar"
import {Color} from "@/context/calendar-context"
import {RepeatingEventField} from "@/components/forms/repeating-event-field";
import {generateTimes, getNextValidTime} from "@/lib/utils"


export function AddEventDialog() {
    const {colors , addEvent} = useCalendar()
    const nextValidTime = getNextValidTime()
    const defaultStartTime = `${nextValidTime.getHours().toString().padStart(2, "0")}:${nextValidTime.getMinutes().toString().padStart(2, "0")}`
    const defaultEndTime = `${(nextValidTime.getHours() + 1).toString().padStart(2, "0")}:${nextValidTime.getMinutes().toString().padStart(2, "0")}`

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            id: v4(),
            title: "",
            description: "",
            startDate: new Date(),
            startTime: defaultStartTime,
            endDate: new Date(),
            endTime: defaultEndTime,
            color: "blue",
        },
    })

    function onSubmit(data: EventFormValues) {
        addEvent(data)
    }

    const times = generateTimes()
    const now = new Date()
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <CalendarPlusIcon className="h-4 w-4"/>
                    Add Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Calendar className="h-5 w-5"/>
                        Add Event
                    </DialogTitle>
                    <p className="text-muted-foreground text-sm">Create a new event in your calendar.</p>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Event Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event Title" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="grid gap-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline"
                                                            className="w-full justify-start text-left font-normal">
                                                        <Calendar className="mr-2 h-4 w-4"/>
                                                        {field.value ? format(field.value, "MMMM do, yyyy") :
                                                            <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {times.map((time) => (
                                                    <SelectItem key={time} value={time} disabled={time < currentTime}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline"
                                                            className="w-full justify-start text-left font-normal">
                                                        <Calendar className="mr-2 h-4 w-4"/>
                                                        {field.value ? format(field.value, "MMMM do, yyyy") :
                                                            <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {times.map((time) => (
                                                    <SelectItem key={time} value={time} disabled={time < currentTime}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <RepeatingEventField/>

                        <FormField
                            control={form.control}
                            name="color"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Event Color</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select color"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((color: Color) => (
                                                <SelectItem key={color.id} value={color.id}>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-4 h-4 rounded-full ${color.value}`}/>
                                                        <span>{color.name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalendarHeader() {
    return (
        <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">Event Calendar</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Sun className="h-4 w-4" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    )
}


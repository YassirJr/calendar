import {Button} from "@/components/ui/button";
import {Clock} from "lucide-react";
import {motion} from "framer-motion";
import {useCalendar} from "@/hooks/use-calendar";

export function TimeMode(){
    const {timeMode , setTimeMode} = useCalendar()

    return (
        <motion.div
            whileTap={{scale: 0.9}}
        >
            <Button variant="outline" size="sm" className="" onClick={
                () => setTimeMode(timeMode === "am" ? "pm" : "am")
            }>
                <Clock className="h-4 w-4"/>
                {
                    timeMode === "am" ? "AM" : "PM"
                }
            </Button>
        </motion.div>
    )
}
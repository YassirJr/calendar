import * as React from "react"
import { Check, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import {useCalendar} from "@/hooks/use-calendar";
import {Color} from "@/context/calendar-context";


export function ColorFilter() {
    const { colors, selectedColors, setSelectedColors , resetSelectedColors } = useCalendar()

    const toggleColor = (colorId: string) => {
        setSelectedColors(colorId)
    }

    return (
        <Popover >
            <PopoverTrigger asChild>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="gap-2"
                >
                    <Button variant="outline" size='sm'  className="min-w-[110px]">
                        <Filter className="h-4 w-4" />
                        <div>
                            Filter
                        </div>
                    </Button>
                </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-48">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Colors</h4>
                    <Separator />
                    <div className="space-y-2">
                        {colors.map((color: Color) => (
                            <button
                                key={color.id}
                                onClick={() => toggleColor(color.id)}
                                className="flex w-full items-center gap-2 rounded px-2 text-left"
                            >
                                <div className="w-4 flex justify-center">
                                    {selectedColors.includes(color.id) && <Check className="h-4 w-4" />}
                                </div>
                                <div className={`h-4 w-4 rounded-full ${color.value}`} aria-hidden="true" />
                                <span className="text-sm">{color.name}</span>
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full" onClick={resetSelectedColors}>
                        Reset
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
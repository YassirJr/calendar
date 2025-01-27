import * as React from "react";
import { Check, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useCalendar } from "@/hooks/use-calendar";
import { Color } from "@/context/calendar-context";
import { cn } from "@/lib/utils";


export function ColorFilter() {
    const { colors, selectedColors, setSelectedColors, resetSelectedColors } = useCalendar();

    const toggleColor = (colorId: string) => {
        setSelectedColors(colorId);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "min-w-[100px] gap-2 transition-colors",
                            selectedColors.length > 0 && "border-primary text-primary"
                        )}
                    >
                        <Filter className="h-4 w-4" />
                        <motion.span
                            key={selectedColors.length}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                        >
                            {selectedColors.length > 0
                                ? `${selectedColors.length} selected`
                                : "Filter"}
                        </motion.span>
                    </Button>
                </motion.div>
            </PopoverTrigger>
            <PopoverContent
                className="w-56 p-0 overflow-hidden"
                sideOffset={5}
                align="start"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="p-4"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-sm">Colors</h4>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                                className={`${selectedColors.length > 0 ? "flex" : "hidden"}`}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-muted-foreground"
                                    onClick={resetSelectedColors}
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Clear
                                </Button>
                            </motion.div>
                    </div>
                    <Separator className="mb-4" />
                    <div className="space-y-2">
                        <AnimatePresence>
                            {colors.map((color: Color, index) => (
                                <motion.div
                                    key={color.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        ease: "easeOut",
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => toggleColor(color.id)}
                                        className={cn(
                                            "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted cursor-pointer",
                                            selectedColors.includes(color.id) && "bg-muted"
                                        )}
                                    >
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                scale: selectedColors.includes(color.id) ? 1 : 0.5,
                                                opacity: selectedColors.includes(color.id) ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="w-4 flex justify-center"
                                        >
                                            <Check className="h-4 w-4" />
                                        </motion.div>
                                        <div
                                            className={cn(
                                                "h-4 w-4 rounded-full ring-1 ring-inset ring-black/10",
                                                color.value
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm flex-1">{color.name}</span>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </PopoverContent>
        </Popover>
    );
}
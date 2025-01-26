import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ListIcon,
    Columns2,
    Grid3X3Icon,
    LayoutGridIcon,
} from "lucide-react";
import {useCalendar} from "@/hooks/use-calendar";

export function ViewMode() {
    const { viewMode, setViewMode } = useCalendar();

    const buttonAnimation = {
        whileTap: { scale: 0.95 },
    };

    const textAnimation = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <div className="flex items-center gap-1 rounded-md border transition-all">
            <motion.div {...buttonAnimation}>
                <Button
                    variant="outline"
                    onClick={() => setViewMode("day")}
                    className={`border-none ${viewMode === "day" ? "bg-gray-100" : ""}`}
                    size="sm"
                >
                    <ListIcon className="h-4 w-4" />
                    {viewMode === "day" && (
                        <motion.span {...textAnimation}>Day</motion.span>
                    )}
                </Button>
            </motion.div>
            <motion.div {...buttonAnimation}>
                <Button
                    variant="outline"
                    onClick={() => setViewMode("week")}
                    className={`border-none ${viewMode === "week" ? "bg-gray-100" : ""}`}
                    size="sm"
                >
                    <Columns2 className="h-4 w-4" />
                    {viewMode === "week" && (
                        <motion.span {...textAnimation}>Week</motion.span>
                    )}
                </Button>
            </motion.div>
            <motion.div {...buttonAnimation}>
                <Button
                    variant="outline"
                    onClick={() => setViewMode("month")}
                    className={`border-none ${viewMode === "month" ? "bg-gray-100" : ""}`}
                    size="sm"
                >
                    <Grid3X3Icon className="h-4 w-4" />
                    {viewMode === "month" && (
                        <motion.span {...textAnimation}>Month</motion.span>
                    )}
                </Button>
            </motion.div>
            <motion.div {...buttonAnimation}>
                <Button
                    variant="outline"
                    onClick={() => setViewMode("year")}
                    className={`border-none ${viewMode === "year" ? "bg-gray-100" : ""}`}
                    size="sm"
                >
                    <LayoutGridIcon className="h-4 w-4" />
                    {viewMode === "year" && (
                        <motion.span {...textAnimation}>Year</motion.span>
                    )}
                </Button>
            </motion.div>
        </div>
    );
}

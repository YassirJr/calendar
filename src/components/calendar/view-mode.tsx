import {Button} from "@/components/ui/button";
import {Columns2, Grid3X3Icon, LayoutGridIcon, ListIcon} from "lucide-react";


export function ViewMode(){
    return (
        <div className="flex items-center gap-1 rounded-md border">
            <Button
                size="sm"
            >
                <ListIcon className="h-4 w-4"/>
            </Button>
            <Button
                size="sm"
            >
                <Columns2 className="h-4 w-4"/>
            </Button>
            <Button
                size="sm"
            >
                <Grid3X3Icon className="h-4 w-4"/>
            </Button>
            <Button
                size="sm"
            >
                <LayoutGridIcon className="h-4 w-4"/>
            </Button>
        </div>
    )
}
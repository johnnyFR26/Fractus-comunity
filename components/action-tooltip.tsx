"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

interface ActionTooltipProps {
    children: React.ReactNode;
    label: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
    children,
    label,
    side, align
}: ActionTooltipProps) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p>
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
    
}
"use client"
import { Box, Lock, Search, Settings, Sparkles, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect";

export  function BentoGrid(){
    return(
        <ul className="border border-solid border-green-500 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"> 
        <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icons={<MessageCircle className="h-4 w-4" />}
        title="Real-Time Chat"
        description="Watch messages roll in nearly real time, enough of a delay to keep things interesting."
      />
        </ul>
    )
}

interface GridItemProps{
    area: string;
    icons: React.ReactNode;
    title: string;
    description: React.ReactNode;

}

const GridItem = ({
    area,
    icons,
    title,
    description
}: GridItemProps) => {
    return(
        <li className= {cn("border border-solid border-red-500", area)}>
            <div className="border border-solid border-red-500 relative h-full rounded-[1.25rem] p-2 md:rounded-[1.5] md:p-3"> 
             
             
             <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-background p-6 shadow-sm dark:shadow -[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6  border border-solid border-red-500"> 
                <div className="relative flex flex-1 flex-col justify-between gap-3 border border-solid border-red-500 p-20"></div>
                
                 </div>
              </div>
             </li>
    )
}
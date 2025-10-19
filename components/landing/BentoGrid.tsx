"use client"
import { Box, Lock, Search, Settings, Sparkles, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "../ui/glowing-effect";

export  function BentoGrid(){
    return(
        <ul className="border border-solid border-green-500 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"> 
        <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icons={<MessageCircle className="h-4 w-4" />}
        title="Real-Time Chat"
        description="Watch messages roll in nearly real time, enough of a delay to keep things interesting."
      />

      <GridItem
      area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
      icons= {<Box className="h-4 w-4" />}
      title="Media Embeds"
      description="View images, videos, and other media types directly within the chat interface."
      ></GridItem>
       <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icons={<Lock className="h-4 w-4" />}
        title="Rate-Limited"
        description="Slow down, speed-typer. We keep the spam at bay."
      />
       <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icons={<Sparkles className="h-4 w-4" />}
        title="GIF & Emoji Support"
        description="Words are cool, but memes and emojis are cooler."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icons={<Search className="h-4 w-4" />}
        title="Sleek & Simple UI"
        description="No clutter—just pure conversation vibes."
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
        <li className= {cn("border border-solid border-red-500 min-h-[14rem] list-none", area)}>
            <div className="border border-solid border-red-500 relative h-full rounded-[1.25rem] p-2 md:rounded-[1.5] md:p-3"> 
             
             <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />


             <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-background p-6 shadow-sm dark:shadow -[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6  border border-solid border-red-500"> 
                <div className="relative flex flex-1 flex-col justify-between gap-3 border border-solid border-red-500">

                    <div className="w-fit rounded-lg border border-solid border-green-500 bg-muted p-2
                    ">
                        {icons}
                    </div>
                    <div className="space-y-3"
                    >
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                            {title}
                        </h3>
                        <h2 className="[&_b]:md:font-semibold [&_strog]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                            {description}
                        </h2>
                    </div>

                </div>
                
                 </div>
              </div>
             </li>
    )
}
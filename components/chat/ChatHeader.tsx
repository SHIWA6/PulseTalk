"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface ChatHeaderProps {
  roomTitle: string
  isConnected: boolean
}

export function ChatHeader({ roomTitle, isConnected }: ChatHeaderProps) {
  const router = useRouter()

  return (
    <div
      className={cn(
        "border-b border-zinc-800/40 px-4 py-3 flex items-center justify-between",
        // Premium background shell
        "bg-gradient-to-r from-slate-900 via-zinc-900 to-zinc-800 text-stone-100",
        // Depth + subtle glow
        "shadow-[0_4px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm"
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className={cn(
            "rounded-xl",
            "text-stone-300 hover:text-stone-100",
            "hover:bg-zinc-800/50 active:scale-95 transition-all",
            "ring-1 ring-transparent hover:ring-emerald-600/40"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="font-semibold tracking-tight text-stone-100 text-lg">
            {roomTitle || "Loading..."}
          </h1>

          <div
            className={cn(
              "h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.4)] transition-all",
              isConnected
                ? "bg-emerald-500 ring-2 ring-emerald-600/30"
                : "bg-rose-600 ring-2 ring-rose-600/30"
            )}
            title={isConnected ? "Connected" : "Disconnected"}
          />
        </div>
      </div>
    </div>
  )
}

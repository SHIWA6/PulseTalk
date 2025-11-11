"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircleMore, MoreVertical, Share, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import { useSession, signIn } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from "sonner"

interface ChatGroup {
  id: string
  userId: string
  title: string
  createdAt: string
  totalParticipants: number
  updatedAt: string
}

function Home() {
  const { status } = useSession()
  const [rooms, setRooms] = useState<ChatGroup[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [newRoomName, setNewRoomName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
      return;
    }
    

    const fetchRooms = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/rooms')
        if (!res.ok) {
          throw new Error("Failed to fetch")
        }
        const data = await res.json()
        setRooms(data.rooms || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching rooms:', err)
        setError('Failed to load rooms. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchRooms()
  }, [status])

  const createRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() 
    if (isCreating) return 
    
    setIsCreating(true)
    try {
      const roomName = newRoomName.trim() || `Room ${rooms.length + 1}`
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomName })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        if (res.status === 429) {
          toast.error("Rate Limit Exceeded", {
            description: data.message || "You can only create 2 rooms per hour. Please try again later.",
            duration: 5000
          })
        } else {
          toast.error("Error", {
            description: data.error || "Failed to create room. Please try again."
          })
        }
        throw new Error(data.error || "Failed to create room")
      }
      
      setRooms(prevRooms => [data.room, ...prevRooms])
      setNewRoomName("")
      setOpen(false)
      
      toast.success("Room created!", {
        description: `Room "${roomName}" has been created successfully.`
      })
    } catch (err) {
      console.error('Error creating room:', err)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (roomId: string) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to delete room");
        return;
      }

      setRooms(rooms.filter(room => room.id !== roomId));
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error("Failed to delete room");
    }
  };

  return (
   <>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button
        className="hover:cursor-pointer border-3 bg-gradient-to-tr from-emerald-600 via-teal-700 to-slate-900 text-stone-100 shadow-[0_8px_30px_rgba(16,185,129,0.35)] border-zinc-800/30 hover:shadow-[0_12px_40px_rgba(16,185,129,0.45)] hover:translate-y-[-1px] active:translate-y-0 transition-all duration-300 rounded-xl px-5 py-2.5 tracking-tight ring-1 ring-zinc-800/50"
        onClick={() => setOpen(true)}
      >
        Create Room
      </Button>
    </DialogTrigger>
    <DialogContent className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-zinc-800/30 shadow-2xl rounded-2xl ring-1 ring-zinc-800/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-slate-900 dark:text-stone-100 text-xl md:text-2xl font-semibold tracking-tight">
          Create New Room
        </DialogTitle>
        <DialogDescription className="text-zinc-600 dark:text-zinc-300">
          Enter a name for your room
        </DialogDescription>
      </DialogHeader>
      <Input
        type="text"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        placeholder="Enter room name"
        className="border p-2 bg-white/70 dark:bg-zinc-900/60 placeholder:zinc-500 rounded-xl px-4 py-3 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
      />
      <Button
        onClick={createRoom}
        disabled={isCreating}
        className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-stone-100 px-5 py-2.5 font-medium tracking-tight shadow-[0_8px_30px_rgba(16,185,129,0.35)] ring-1 ring-zinc-800/50 hover:shadow-[0_12px_40px_rgba(16,185,129,0.45)] hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {isCreating ? "Creating..." : "Create"}
      </Button>
    </DialogContent>
  </Dialog>

  <div className="p-3 pt-14 md:pt-3 sm:p-6 w-full">
    {isLoading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(24)].map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden rounded-2xl border border-zinc-800/20 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-lg"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-md bg-gradient-to-r from-stone-100 via-zinc-200 to-stone-100 animate-pulse" />
                <Skeleton className="h-4 w-20 rounded-md bg-gradient-to-r from-stone-100 via-zinc-200 to-stone-100 animate-pulse" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full bg-gradient-to-r from-stone-100 via-zinc-200 to-stone-100 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    ) : error ? (
      <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-600/20">
        {error}
      </div>
    ) : rooms && rooms.length === 0 ? (
      <div className="text-center p-8">
        <p className="text-zinc-500 mb-4">
          No rooms available. Create your first room!
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="group overflow-hidden rounded-2xl border border-zinc-800/20 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer ring-1 ring-transparent hover:ring-emerald-600/30"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div
                className="flex-1"
                onClick={() => {
                  // Use window.location for Safari compatibility
                  window.location.href = `/chat/${room.id}`;
                }}
              >
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                    {room.title}
                  </h1>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">
                      {new Date(room.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      {room.totalParticipants}{" "}
                      {room.totalParticipants === 1 ? "participant" : "participants"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircleMore className="h-5 w-5 text-emerald-600 group-hover:scale-105 transition-transform" />

                {/* Share Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0 rounded-lg hover:bg-stone-100/70 dark:hover:bg-zinc-800/60 ring-1 ring-zinc-800/20 transition">
                      <Share className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border border-zinc-800/20 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm shadow-xl"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        // Copy the room link to clipboard
                        const roomLink = `${window.location.origin}/chat/${room.id}`;
                        navigator.clipboard.writeText(roomLink);
                        toast.success("Link copied to clipboard!");
                      }}
                      className="cursor-pointer focus:bg-stone-100/70 dark:focus:bg-zinc-800/60"
                    >
                      <Share className="mr-2 h-4 w-4 text-teal-700" />
                      <span className="text-zinc-800 dark:text-stone-100">Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        const roomLink = `${window.location.origin}/chat/${room.id}`;
                        const twitterShareUrl = `https://twitter.com/intent/tweet?text=Join%20my%20ChatPulse%20room!&url=${encodeURIComponent(
                          roomLink
                        )}`;
                        window.open(twitterShareUrl, "_blank");
                      }}
                      className="cursor-pointer focus:bg-stone-100/70 dark:focus:bg-zinc-800/60"
                    >
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      <span className="text-zinc-800 dark:text-stone-100">Share on Twitter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* More Options Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0 rounded-lg hover:bg-stone-100/70 dark:hover:bg-zinc-800/60 ring-1 ring-zinc-800/20 transition">
                      <MoreVertical className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border border-zinc-800/20 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm shadow-xl"
                  >
                    <DropdownMenuItem
                      onClick={() => handleDelete(room.id)}
                      className="text-rose-600 focus:bg-rose-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-rose-600" />
                      <span>Delete room</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
</>

  )
}

export default Home;

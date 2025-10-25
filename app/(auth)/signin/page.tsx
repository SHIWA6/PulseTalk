"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { signIn } from "next-auth/react"


export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Sign in to PulseChat</h1>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </Button>
    </div>
  )
}

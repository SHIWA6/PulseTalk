"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

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

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

import { signInSchema } from "@/app/lib/zod"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { usePostHog } from 'posthog-js/react';

export default function Signinpage(){
  return <Signin/>;
}

const Signin = () => {

  const form = useForm<z.infer<typeof signInSchema>>({
  resolver: zodResolver(signInSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});


  return(
    <div className="w-full max-w-md space-y-8 rounded-xl border border-solid border-red-500 bg-card/20 p-6 backdrop-blur-sm"> 
    <div className="text-center border border-solid border-green-500 p-5">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your Account
      </h2>
      <p className="mt-2 text-sm text-muted-foreground"> 
        Welcome back to Pulsetalk
      </p>
    </div>
    <Form {...form}> <form onSubmit={form.handleSubmit(onsubmit )} className="space-y-6"> </form></Form>
    </div>
  )

}

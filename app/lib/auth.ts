import { CredentialsProvider } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import {signUpSchema , signInSchema} from "./zod"
import { Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma"


interface FormCredentials{
    email:string
}
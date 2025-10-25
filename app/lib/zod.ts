import {object, string} from "zod"

export const signInSchema = object({

    email: string({required_error: "Email is must"})
    .min(3, "Email Required")
    .email("Invalid email"),
       
     password: string({
        required_error: "password is Required"
     }).min(2, 'password Required')
     .min(8, "password must contain 8 or more chars")
     .max(32, "password length cannot be more then 32 chars")
})

export const signUpSchema = object({
    email: string({required_error: "Mail is required"})
    .min(3,'email required')
    .email("invalid email"),
    password: string({required_error:"password is must"}).min(2, " password required")
    .min(2,"password Required").min(8, "password must have more than 8 chars")
    .max(32, "password cannit be exceed more then 32 chars"),
    confirmPassword:string({required_error:"password is required"}).min(2,"password required").min(8, "password must have more than 8 chars")
    .max(32, "password cannot exceed more then 32 chars")
})

.refine((data)=> data.password === data.confirmPassword, {
    message:"Password are not same",
    path:["confirmPassword"]
})
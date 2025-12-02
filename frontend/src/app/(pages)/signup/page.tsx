"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import mimir from "@/app/API"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const formSchema = z
    .object({
        username: z.string().min(1, "Username is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export default function SignupPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError(null)
        try {
            const { confirmPassword, ...payload } = values
            await mimir.post("/api/register/", payload)
            router.push("/login")
        } catch (err: any) {
            console.error("Signup error:", err)
            setError(
                err.response?.data?.detail ||
                (typeof err.response?.data === "string" ? err.response?.data : "Failed to sign up. Please try again.")
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F9F5F0] p-4">
            <Card className="w-full max-w-md border-[#F2EAD3] bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-[#344F1F]">
                        Join Munch
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#344F1F]">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Choose a username"
                                                className="border-[#F2EAD3] focus:ring-[#F4991A] focus:border-[#F4991A]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#344F1F]">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="border-[#F2EAD3] focus:ring-[#F4991A] focus:border-[#F4991A]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#344F1F]">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Create a password"
                                                className="border-[#F2EAD3] focus:ring-[#F4991A] focus:border-[#F4991A]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#344F1F]">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm your password"
                                                className="border-[#F2EAD3] focus:ring-[#F4991A] focus:border-[#F4991A]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <div className="text-sm text-[#F4991A] font-medium text-center bg-[#F2EAD3] p-3 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-[#F4991A] hover:bg-[#344F1F] text-white font-medium transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing up...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#F4991A] hover:text-[#344F1F] font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

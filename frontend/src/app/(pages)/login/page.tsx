"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import mimir from "@/app/API"
import { ACCESS_TOKEN } from "@/constants"
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

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await mimir.post("/api/token/", values)
      const { access } = response.data
      if (access) {
        localStorage.setItem(ACCESS_TOKEN, access)
        router.push("/")
      } else {
        setError("Invalid response from server")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(
        err.response?.data?.detail || "Failed to login. Please check your credentials."
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
            Welcome to Munch
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your credentials to access your account
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
                        placeholder="Enter your username"
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
                        placeholder="Enter your password"
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#F4991A] hover:text-[#344F1F] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

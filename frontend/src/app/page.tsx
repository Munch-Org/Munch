"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  Heart,
  Search,
  Menu,
  User as UserIcon,
  LogOut,
  Globe,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { ACCESS_TOKEN } from "@/constants"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UNIVERSITIES } from "./data"
import { DishCard } from "./components/dish-card"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {}
  )

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem(ACCESS_TOKEN)
    setIsLoggedIn(!!token)
    if (token) {
      setUsername("Avi")
    }
  }, [])

  const scroll = (uniName: string, direction: "left" | "right") => {
    const container = scrollContainerRefs.current[uniName]
    if (container) {
      const scrollAmount = 320
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#F2EAD3] bg-white/95 backdrop-blur-sm transition-all duration-200">
        <div className="mx-auto flex h-20 max-w-[2520px] items-center justify-between px-6 xl:px-20">
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <Link
              href="/home"
              className="text-[26px] font-bold text-[#344F1F] tracking-tight"
            >
              Munch
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center rounded-full border border-[#F2EAD3] bg-[#F2EAD3]/50 shadow-sm hover:shadow-md transition-all duration-200 py-2.5 pl-6 pr-2 gap-2 cursor-pointer">
              <div className="text-sm font-medium px-4 truncate max-w-[200px] text-[#344F1F]">
                Campus Location
              </div>
              <div className="bg-[#F4991A] p-2.5 rounded-full text-white ml-2 hover:bg-[#344F1F] transition-colors">
                <Search size={16} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex-1 flex items-center justify-end gap-2">
            <div className="hover:bg-[#F2EAD3] p-3 rounded-full cursor-pointer transition duration-200 mr-1">
              <Globe size={18} className="text-[#344F1F]" />
            </div>

            {mounted && isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 rounded-full border border-[#F2EAD3] p-1 pl-3 hover:shadow-md transition duration-200 cursor-pointer bg-white">
                    <Menu size={18} className="text-[#344F1F] ml-1" />
                    <Avatar className="h-8 w-8 border border-[#F2EAD3]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-[#344F1F] text-white">
                        <UserIcon size={16} className="fill-current" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[240px] rounded-xl p-2 shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-[#F2EAD3] mt-2"
                >
                  <DropdownMenuItem className="font-medium py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Trips
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Wishlists
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-[#F2EAD3]" />
                  <DropdownMenuItem className="py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Manage listings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-[#F2EAD3]" />
                  <DropdownMenuItem className="py-2.5 px-4 rounded-lg cursor-pointer hover:bg-[#F2EAD3]">
                    Help Centre
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/logout"
                      className="w-full cursor-pointer py-2.5 px-4 rounded-lg text-[#F4991A] hover:text-[#344F1F] hover:bg-[#F2EAD3]"
                    >
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full font-medium text-[#344F1F] hover:bg-[#F2EAD3]"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-full bg-[#F4991A] hover:bg-[#344F1F] font-medium text-white">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[2520px] px-6 pt-28 pb-20 xl:px-20 space-y-12">
        {UNIVERSITIES.map((uni) => (
          <section key={uni.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#344F1F]">
                {uni.name}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(uni.name, "left")}
                  className="rounded-full h-8 w-8 border-[#F2EAD3] hover:border-[#344F1F] hover:bg-[#F2EAD3] text-[#344F1F]"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll(uni.name, "right")}
                  className="rounded-full h-8 w-8 border-[#F2EAD3] hover:border-[#344F1F] hover:bg-[#F2EAD3] text-[#344F1F]"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            <div
              ref={(el) => {
                scrollContainerRefs.current[uni.name] = el
              }}
              className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x scroll-smooth"
            >
              {uni.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

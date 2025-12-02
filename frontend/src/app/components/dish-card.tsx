import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Dish } from "../data"

interface DishCardProps {
  dish: Dish
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 cursor-pointer min-w-[280px] sm:min-w-[300px] snap-start">
      {/* Image Container */}
      <div className="relative aspect-20/19 w-full overflow-hidden rounded-xl bg-[#F2EAD3]">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Student Favourite Badge */}
        {dish.isGuestFavorite && (
          <div className="absolute top-3 left-3 z-10">
            <div className="backdrop-blur-md bg-white/95 px-3 py-1 pb-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-white/20 transition hover:scale-105">
              <span className="text-xs font-bold text-[#344F1F] tracking-wide leading-none">
                Student favourite
              </span>
            </div>
          </div>
        )}

        {/* Heart Icon */}
        <div className="absolute top-3 right-3 z-10">
          <button className="group/heart relative p-2 transition hover:scale-110">
            <Heart
              className="fill-black/50 stroke-white transition-colors group-hover/heart:fill-[#F4991A] group-hover/heart:stroke-[#F4991A]"
              size={24}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-start mt-1">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-[15px] text-gray-900 leading-tight group-hover:text-[#344F1F]">
            {dish.name}
          </h3>
          <p className="text-gray-500 text-[15px]">{dish.split}</p>
          <p className="text-gray-500 text-[15px] flex items-center gap-2">
            {dish.discount && (
              <Badge
                variant="secondary"
                className="bg-[#F4991A] text-white hover:bg-[#F4991A]/90 font-medium rounded-md px-1.5 py-0 text-[10px]"
              >
                {dish.discount}
              </Badge>
            )}
            <span className="text-gray-500">Available now</span>
          </p>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="font-semibold text-gray-900 text-[15px]">
              {dish.price}
            </span>
            <span className="text-gray-900 text-[15px] font-light">total</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-[15px]">
          <span className="text-[#F4991A]">★</span>
          <span className="text-gray-900 font-light">{dish.rating}</span>
        </div>
      </div>
    </div>
  )
}

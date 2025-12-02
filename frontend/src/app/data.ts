export interface Dish {
    id: string
    name: string
    price: string
    discount?: string
    split: string
    image: string
    rating: number
    isGuestFavorite: boolean
}

export interface University {
    name: string
    dishes: Dish[]
}

const COMMON_DISHES: Dish[] = [
    {
        id: "1",
        name: "Truffle Mushroom Risotto",
        price: "$24",
        split: "Serves 1",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
        rating: 4.95,
        isGuestFavorite: true,
    },
    {
        id: "2",
        name: "Margherita Pizza",
        price: "$18",
        discount: "10% off",
        split: "Serves 1-2",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
        rating: 4.8,
        isGuestFavorite: true,
    },
    {
        id: "3",
        name: "Seafood Paella",
        price: "$32",
        split: "Serves 2-3",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
        rating: 4.9,
        isGuestFavorite: true,
    },
    {
        id: "4",
        name: "Wagyu Beef Burger",
        price: "$22",
        split: "Serves 1",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
        rating: 4.85,
        isGuestFavorite: false,
    },
    {
        id: "5",
        name: "Caesar Salad",
        price: "$16",
        split: "Serves 1",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
        rating: 4.7,
        isGuestFavorite: false,
    },
    {
        id: "6",
        name: "Tiramisu",
        price: "$12",
        split: "Serves 1",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        rating: 4.98,
        isGuestFavorite: true,
    },
    {
        id: "7",
        name: "Sushi Platter",
        price: "$45",
        split: "Serves 2",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
        rating: 4.92,
        isGuestFavorite: true,
    },
    {
        id: "8",
        name: "Pasta Carbonara",
        price: "$20",
        split: "Serves 1",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
        rating: 4.75,
        isGuestFavorite: false,
    },
]

export const UNIVERSITIES: University[] = [
    {
        name: "Monash University (Clayton)",
        dishes: COMMON_DISHES,
    },
    {
        name: "Monash University (Mornington Peninsula)",
        dishes: [...COMMON_DISHES].reverse(),
    },
    {
        name: "RMIT City Campus",
        dishes: COMMON_DISHES.slice(0, 4),
    },
    {
        name: "Deakin University",
        dishes: COMMON_DISHES.slice(2, 6),
    },
    {
        name: "Victoria University",
        dishes: COMMON_DISHES.slice(4, 8),
    },
]

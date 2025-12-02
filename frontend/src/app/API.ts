import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { ACCESS_TOKEN } from "@/constants"

const mimir: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

mimir.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN) : null
    if (token) {
      config.headers = config.headers ?? {}
      ;(config.headers as Record<string, string>)["Authorization"] =
        `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default mimir

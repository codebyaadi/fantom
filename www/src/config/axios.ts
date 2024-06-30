import axios, { AxiosInstance } from "axios";
import { env } from "@/env";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_HONO_API_URL,
  headers: { "Content-Type": "application/json" },
});

export { axiosInstance };

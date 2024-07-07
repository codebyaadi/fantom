import { axiosInstance } from "@/config/axios";
import { Product } from "@/types";

export async function getAllProducts() {
    const res = await axiosInstance.get("/fetch-all-products");
    return res.data as Product[];
};
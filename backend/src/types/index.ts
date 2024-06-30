export interface StoredImage {
    id: string;
    name: string;
    url: string;
}

export type ProductTypes = {
    title?: string;
    description?: string;
    price?: number;
    rating?: number;
    type?: "manga" | "manhwa" | "manhua";
    status?: "On going" | "Complete" | "On hold" | "Dropped";
    coverImg?: string;
}
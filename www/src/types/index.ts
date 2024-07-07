export interface Product {
    id: number;
    title: string;
    description: string;
    coverImg: string;
    price: number;
    rating: number;
    type: 'manga' | 'manhwa' | 'manhua';
    status: 'On going' | 'Complete' | 'On hold' | 'Dropped';
    createdAt: string;
    updatedAt: string;
}

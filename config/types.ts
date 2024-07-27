type BaseAdminCollection = {
    createdDate: Date,
    createdBy: string,
    updatedBy: string,
    updatedDate: Date
}
type BaseUserCollection = {
    createdDate: Date
    userId: string
    id: string
}
type Product = BaseAdminCollection & {
    id: string;
    name: string;
    imageUrl: string;
    originalPrice: number;
    discountPrice: number;
    offerPercentage: number;
    rating: number;
    ratingCount: number;
    department: Department | null;
    tags: string[];
    isActive: boolean
};
type Department = BaseAdminCollection & {
    name: string,
    id: string,
    isActive: boolean,
    url: string
}
enum STATUS {
    ORDERED = "ordered",
    PROCESSED = "processed",
    SHIPPED = "shipped",
    TRANSIT = "transit",
    COMPLETED = "completed"

}
type Order = BaseUserCollection & {
    status: STATUS,
    products: Product[],
    totalPrice: number,
    shippingPrice: number,
    servicePrice: number,
    comments: string
}
type Cart = BaseUserCollection & {
    products: Product[]
}
export { Product, Department, Order, Cart }
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
type BaseProduct = {
    id: string;
    name: string;
    imageUrl: string;
}
type Product = BaseAdminCollection & BaseProduct & {
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
type CartProduct = BaseProduct & {
    discountPrice: number;
    quantity: number
}
type CartProductWithPrice = CartProduct & {
    price: number
}
type Order = BaseUserCollection & {
    status: STATUS,
    products: CartProduct[],
    totalPrice: number,
    shippingPrice?: number,
    servicePrice?: number,
    comments?: string
}
type Cart = BaseUserCollection & {
    products: CartProduct[],
    totalPrice: number,
}
type CartWithPrice = BaseUserCollection & {
    products: CartProductWithPrice[],
    totalPrice: number,
}
export { Product, Department, Order, Cart, CartProduct, CartWithPrice, STATUS as ORDERSTATUS }
import { Department, Product, Order, Cart } from "@/config/types"

export enum COLLECTIONS {
    PRODUCTS = "products",
    DEPARTMENTS = "departments",
    ORDERS = "orders",
    CART = "carts"
}
export type CollectionTypes = Product | Department | Order | Cart
import { FIREBASE_STORE } from './firebaseconfig'
import { deleteDoc, doc, getDoc, limit, query, setDoc, updateDoc, collection, where, getDocs, getAggregateFromServer, count, sum, average } from "firebase/firestore";
import { Cart, CartProduct, Department, Order, ORDERSTATUS, Product } from './types';
import uuid from 'react-native-uuid';
import * as data from '../constants/data'
import { COLLECTIONS, CollectionTypes } from '@/constants/collections';

const isDevelopment = false
// Add a new document in collection "cities"
export const insertProduct = (product: Product) => {
    if (!product.id) {
        product.id = uuid.v4().toString();
    }
    return setDoc(doc(FIREBASE_STORE, COLLECTIONS.PRODUCTS, product.id), product)
};
export const fetchProducts = async (department?: Department) => {
    if (isDevelopment) {
        console.log("pulling from development")
        if (department) {
            return data.PRODUCTS_LIST.filter(item => item.department.id == department.id)
        }
        return data.PRODUCTS_LIST;
    }
    let q
    if (department) {
        q = query(collection(FIREBASE_STORE, COLLECTIONS.PRODUCTS), where("department.id", "==", department.id));
    } else {
        q = query(collection(FIREBASE_STORE, COLLECTIONS.PRODUCTS));

    }
    const querySnapshot = await getDocs(q);
    let products: Product[] = []
    querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, doc.data())
        let product = doc.data()
        product.id = doc.id;
        products.push(product)
    });
    return products;
}
export const insertDepartment = (department: Department | null) => {
    // let id
    if (!department.id) {
        department.id = uuid.v4().toString();
    }
    // delete department.id
    // console.log(department)
    return setDoc(doc(FIREBASE_STORE, COLLECTIONS.DEPARTMENTS, department.id), department)

}
export const fetchDepartments = async (onlyActive = false) => {
    if (isDevelopment) {
        console.log("pulling from development")
        return data.DEPARTMENT_LIST;
    }
    const q = query(collection(FIREBASE_STORE, COLLECTIONS.DEPARTMENTS), onlyActive ? where('isActive', '==', true) : null);
    const querySnapshot = await getDocs(q);
    let departments: Department[] = []
    querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, doc.data())
        let department = doc.data()
        department.id = doc.id;
        departments.push(department)
    });
    return departments;
}

export const fetchCart = async (userId) => {
    const docRef = doc(FIREBASE_STORE, COLLECTIONS.CART, userId);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
        // console.log("fetched data", docSnapShot.data())
        return docSnapShot.data() as Cart
    }
    return null;
}


export const deleteItem = async (collection: COLLECTIONS, id) => {
    return await deleteDoc(doc(FIREBASE_STORE, collection, id));
}


export const insertItem = async (collection: COLLECTIONS, document: CollectionTypes, id: string) => {
    if (!id) {
        id = uuid.v4().toString();
    }
    document.createdDate = new Date();
    return await setDoc(doc(FIREBASE_STORE, collection, id), document)
}
export const addToCart = async (product: Product, userId): Promise<boolean> => {
    const docRef = doc(FIREBASE_STORE, COLLECTIONS.CART, userId);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
        const cart: Cart = docSnapShot.data() as Cart;
        cart.totalPrice = Number(cart.totalPrice) + Number(product.discountPrice);
        const isProductExistsIndex = cart.products.findIndex(prod => prod.id == product.id)
        // console.log("product existing ", isProductExistsIndex)
        if (isProductExistsIndex > -1) {
            let existedProduct = cart.products[isProductExistsIndex]
            existedProduct.quantity += 1;
            cart.products[isProductExistsIndex] = existedProduct;
        } else {
            cart.products.push({ ...product, quantity: 1 })
        }
        return updateDoc(docRef, cart)
            .then(() => true)
            .catch(error => {
                console.log(error);
                return false;
            })

    } else {
        const cart: Cart = { products: [{ ...product, quantity: 1 }], createdDate: new Date(), id: userId, userId: userId, totalPrice: product.discountPrice }
        return setDoc(doc(FIREBASE_STORE, COLLECTIONS.CART, userId), cart)
            .then(() => true)
            .catch(error => {
                console.log(error);
                return false;
            })
    }
}

export const updateCartQunatiy = async (cartProduct: CartProduct, userID, quntity: number) => {
    const docRef = doc(FIREBASE_STORE, COLLECTIONS.CART, userID);
    const docSnapShot = await getDoc(docRef);
    const cart = docSnapShot.data() as Cart
    const index = cart.products.findIndex(prod => prod.id === cartProduct.id)
    const productFetched = cart.products[index]
    if (cartProduct.quantity + quntity <= 0) {
        cart.products = cart.products.filter(prod => prod.id !== cartProduct.id);
        cart.totalPrice = productFetched.discountPrice * productFetched.quantity
    } else {
        productFetched.quantity = Number(productFetched.quantity) + quntity;
        cart.products[index] = productFetched;
        if (quntity <= 0) {
            cart.totalPrice = Number(cart.totalPrice) - Number(cartProduct.discountPrice);
        } else {
            cart.totalPrice = Number(cart.totalPrice) + Number(cartProduct.discountPrice);
        }
    }
    updateDoc(doc(FIREBASE_STORE, COLLECTIONS.CART, userID), cart);
}

export const processOrder = async (userId: string) => {
    const cart = await fetchCart(userId);
    const id = uuid.v4().toString()
    const order: Order = {
        products: cart.products,
        id: id,
        userId: userId,
        status: ORDERSTATUS.ORDERED,
        shippingPrice: 30,
        createdDate: new Date(),
        totalPrice: cart.totalPrice
    }
    const docRef = doc(FIREBASE_STORE, COLLECTIONS.ORDERS, id)
    return setDoc(docRef, order)
}
export const clearCart = async (userId: string) => {
    return deleteItem(COLLECTIONS.CART, userId);
}

export const getDashboardAnalytics = async () => {
    const coll = collection(FIREBASE_STORE, COLLECTIONS.ORDERS);
    const snapShot = await getAggregateFromServer(coll, {
        totalOrders: count(),
        totalSales: sum('totalPrice'),
        averagePrice: average('totalPrice')
    })
    return snapShot.data()
}
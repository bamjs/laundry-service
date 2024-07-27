import { FIREBASE_STORE } from './firebaseconfig'
import { deleteDoc, doc, limit, setDoc } from "firebase/firestore";
import { Cart, Department, Product } from './types';
import uuid from 'react-native-uuid';
import * as data from '../constants/data'
import { collection, query, where, getDocs } from "firebase/firestore";
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
        console.log(doc.id, doc.data())
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
    console.log(department)
    return setDoc(doc(FIREBASE_STORE, COLLECTIONS.DEPARTMENTS, department.id), department)

}
export const fetchDepartments = async () => {
    if (isDevelopment) {
        console.log("pulling from development")
        return data.DEPARTMENT_LIST;
    }
    const q = query(collection(FIREBASE_STORE, COLLECTIONS.DEPARTMENTS));
    const querySnapshot = await getDocs(q);
    let departments: Department[] = []
    querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, doc.data())
        let department = doc.data()
        department.id = doc.id;
        departments.push(department)
    });
    return departments;
}

export const fetchCart = async (userId) => {
    const q = query(collection(FIREBASE_STORE, COLLECTIONS.CART), where("userId", "==", userId), limit(1))
    const querySnapshot = await getDocs(q);
    let carts: Cart[] = []
    querySnapshot.forEach((doc: any) => {
        let cart = doc.data()
        cart.id = doc.id
        carts.push(cart)
    })
    return await carts[0]
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
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCart, fetchDepartments, fetchProducts, insertItem } from "@/config/database";
import ProductCardWrapper from "@/components/products/ProductUser";
import { useUserId } from "@/contexts/UserContext";
import { Cart, Department } from "@/config/types";
import { COLLECTIONS } from "@/constants/collections";
import { showMessage } from "react-native-flash-message";
import DepartmentAdminWrapper from "@/components/departments/DepartmentAdminWrapper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const App = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const userid = useUserId()
    const [userCart, setUserCart] = useState<Cart>({ id: "", createdDate: new Date(), products: [], userId: null });
    const [department, setDepartment] = useState<Department>()
    const [departments, setDepartments] = useState<Department[]>([])
    useEffect(() => {

        fetchDepartments().then(data => {
            setDepartments(data as Department[])
            console.log("fected dep", data)
        })
        fetchCart(userid).then(cart => {
            setUserCart(cart)
        }).catch(error => console.error(error)
        )

    }, [])
    useEffect(() => {
        if (department) {
            fetchProducts().then(products => {
                // console.log(products)
                setProducts(products)
            })

        }
    }, [department])


    // useEffect(() => {
    //     const fetchCart = 
    // }, [])
    const handleLoginSucess = (state: boolean) => {
        const data = fetchProducts()
        // console.log("fetched cart", data)
        setIsLoggedIn(state)
    }
    const handleCart = (product) => {
        console.log("ädding to cart")
        if (userCart.userId === null) {
            userCart.userId = userid
        }
        console.log("updating user cart")
        userCart.userId = userid;
        // userCart.userId = userid
        userCart.products.push(product)
        console.log("after adding the product", userCart)
        insertItem(COLLECTIONS.CART, userCart, userCart.id).then(data => {
            console.log(data)
            showMessage({ "message": "Added to Cart", type: "info" })
        }).catch(error => {
            console.error(error)
        })


    }
    return (<>
        <SafeAreaView>
            <ScrollView >

                {department ?
                    products.length > 0 && products.map((product) => {
                        return <ProductCardWrapper product={product} key={product.id} onAddToCart={handleCart} />
                    }) :
                    departments.length > 0 && departments.map((dep) => {
                        return <TouchableWithoutFeedback key={dep.id} onPress={() => { setDepartment(dep) }}>
                            <DepartmentAdminWrapper department={dep} />
                        </TouchableWithoutFeedback>
                    })
                }

            </ScrollView>

        </SafeAreaView>
    </>
    )
}

export default App
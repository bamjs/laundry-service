import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCart, fetchCart, fetchDepartments, fetchProducts, insertItem } from "@/config/database";
import ProductCardWrapper from "@/components/products/ProductUser";
import { useSession, useUserId } from "@/contexts/UserContext";
import { Cart, Department } from "@/config/types";
import { COLLECTIONS } from "@/constants/collections";
import { showMessage } from "react-native-flash-message";
import DepartmentAdminWrapper from "@/components/departments/DepartmentAdminWrapper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DepartmentUserWrapper from "@/components/departments/DepartmentUserWrapper";
const App = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const { isloading, setIsLoading } = useSession();
    const [products, setProducts] = useState([]);
    const userid = useUserId();
    const [department, setDepartment] = useState<Department>()
    const [departments, setDepartments] = useState<Department[]>([])
    useEffect(() => {
        loadData()
    }, [])
    useEffect(() => {
        if (department) {
            fetchProducts().then(products => {
                // console.log(products)
                setProducts(products)
            })

        }
    }, [department])


    const loadData = () => {
        fetchDepartments(true).then(data => {
            setDepartments(data as Department[])
            setDepartment(departments[0]);
            if (department) {
                fetchProducts().then(products => {
                    // console.log(products)
                    setProducts(products)
                })
            }
        })
    }
    const handleLoginSucess = (state: boolean) => {
        const data = fetchProducts()
        // console.log("fetched cart", data)
        setIsLoggedIn(state)
    }
    const handleCart = async (product) => {
        setIsLoading(true);
        const response = await addToCart(product, userid);
        if (response) {
            showMessage({ message: 'Added To Cart', type: 'info' })
        } else {
            showMessage({ message: 'Unable to Add To Cart', type: 'danger' })
        }
        setIsLoading(false);
    }
    return (<>
        <SafeAreaView>

            <FlatList
                style={styles.departmentContainer}
                data={departments}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return <>
                        <TouchableWithoutFeedback key={index} onPress={() => { setDepartment(item) }}>
                            <DepartmentUserWrapper department={item} />
                        </TouchableWithoutFeedback>
                    </>
                }}
                horizontal={true}
            />

            {products.length > 0 &&
                <FlatList
                    data={products}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    refreshing={isloading}
                    onRefresh={() => loadData()}
                    renderItem={({ item, index }) => {
                        return <>
                            <ProductCardWrapper product={item} key={item.id} onAddToCart={handleCart} />
                        </>
                    }}
                />
            }
        </SafeAreaView >
    </>
    )
}
const styles = StyleSheet.create({
    departmentContainer: {
        backgroundColor: '#FAF9F6',
        marginTop: -5

    }
})
export default App
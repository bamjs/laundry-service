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
import EmptyProduct from "@/components/products/EmptyProduct";
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
        console.log("fetching product use effect")
        if (department) {
            fetchProducts(department).then(products => {
                console.log("fetched products", products)
                setProducts(products)
            })
        }
    }, [department, departments])


    const loadData = () => {
        fetchDepartments(true).then(response => {
            const data = response as Department[]
            setDepartment(data[0])
            setDepartments(data)
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

        {department && <FlatList
            data={products}
            style={styles.productContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => { return <EmptyProduct key={department.id} departmentName={department.name} /> }}
            refreshing={isloading}
            onRefresh={() => loadData()}
            renderItem={({ item, index }) => {
                return <>
                    <ProductCardWrapper product={item} key={item.id} onAddToCart={handleCart} />
                </>
            }}
        />}
    </>
    )
}
const styles = StyleSheet.create({
    departmentContainer: {
        backgroundColor: '#FAF9F6',
        margin: 3,
        borderRadius: 15
    },
    productContainer: {
        marginTop: 5
    }
})
export default App
import { clearCart, fetchCart, processOrder } from "@/config/database"
import { Cart, CartProduct, Product } from "@/config/types"
import { useSession, useUserId } from "@/contexts/UserContext"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, Image, Button, Linking, FlatList, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import CartProductComponent from "./CartProductComponent"
import EmptyCart from "./EmptyCart"
import { showMessage } from "react-native-flash-message"
import RNUpiPayment from 'react-native-upi-payment';
// import OneUpi from 'one-react-native-upi'

type UserCartWrapperType = {
    cart?: Cart
}
const UserCartWrapper = (props: UserCartWrapperType) => {
    const userId = useUserId()
    const [userCart, setUserCart] = useState<Cart>(props.cart ? props.cart : null)
    const [loaded, setLoaded] = useState(false)
    const { isloading, setIsLoading } = useSession();
    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        fetchCart(userId).then(data => {
            if (data) {
                setUserCart(data);
            } else {
                setUserCart(null)
            }
        })

    }

    const upiName = "9063942144@ybl";
    const BussinessName = "RS Enterprises"
    const handlePlaceOrder = () => {
        processOrder(userId).then(() => {
            clearCart(userId).then(() => {
                Linking.openURL(`upi://pay?pa=${upiName}&pn=${BussinessName}&mode=02&purpose=00&am=${userCart.totalPrice}`)
                showMessage({ "message": 'Order Placed Successfully', type: 'success' })
                loadCart();
            })
        }).catch(() => {
            showMessage({ "message": 'Unable to Place Order', type: 'success' })
            loadCart()
        })
        // Linking.openURL(`upi://pay?pa=${upiName}&pn=${BussinessName}&mode=02&purpose=00&am=${userCart.totalPrice}`)
    }
    const getProducts = () => {
        if (userCart && userCart.products && userCart.products.length > 0) {
            return userCart.products;
        } else {
            return null;
        }
    }
    function successCallback(data) {
        // do whatever with the data
        console.log(data)
    }

    function failureCallback(data) {
        // do whatever with the data
        console.log(data)
    }


    return (
        <View>


            {/* <AntDesign.Button onPress={() => { loadCart() }} name="reload1">Refresh</AntDesign.Button> */}
            {userCart ?
                <View style={styles.container}>
                    <Text style={styles.title}>Cart</Text>
                    <FlatList
                        data={getProducts()}
                        refreshing={isloading}
                        ListEmptyComponent={() => { return <EmptyCart /> }}
                        onRefresh={() => { loadCart() }}
                        renderItem={({ item, index }) => (
                            <CartProductComponent key={index} product={item} userId={userId} handleRefresh={loadCart} />
                        )}
                    />
                    <Text style={styles.totalPrice}>Total: Rs {userCart.totalPrice}</Text>
                    <View>
                        <Button title="Pay now" onPress={handlePlaceOrder}></Button>
                    </View>
                </View> :
                <EmptyCart />
            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // borderColor: '#29bdc1',
        borderRadius: 10,
        padding: 10,
        margin: 10

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        margin: 15,
    },
});

export default UserCartWrapper
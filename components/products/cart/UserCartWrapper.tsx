import { fetchCart } from "@/config/database"
import { Cart, CartProduct, Product } from "@/config/types"
import { useSession, useUserId } from "@/contexts/UserContext"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, Image, Button, Linking, FlatList, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import CartProductComponent from "./CartProductComponent"
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
        loadCart();
    }, [])


    useEffect(() => {
        if (!loaded) {
            return
        }
    }, [loaded])




    const loadCart = async () => {
        setLoaded(false);
        const data = await fetchCart(userId)
        if (data) {
            setUserCart(data)
        }
        setLoaded(true);
    }

    const upiName = "9063942144@ybl";
    const BussinessName = "RS Enterprises"
    const processPayment = () => {
        Linking.openURL(`upi://pay?pa=${upiName}&pn=${BussinessName}&mode=02&purpose=00&am=${userCart.totalPrice}`)
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
        <SafeAreaView>
            <ScrollView>
                {/* <AntDesign.Button onPress={() => { loadCart() }} name="reload1">Refresh</AntDesign.Button> */}
                {loaded && <View style={styles.container}>
                    <Text style={styles.title}>Cart</Text>
                    {userCart ?
                        <View>
                            <FlatList
                                data={userCart.products}
                                refreshing={isloading}
                                scrollEnabled={false}
                                onRefresh={() => { loadCart() }}
                                renderItem={({ item, index }) => (
                                    <CartProductComponent key={index} product={item} userId={userId} handleRefresh={loadCart} />
                                )}
                            />
                            <Text style={styles.totalPrice}>Total: Rs {userCart.totalPrice}</Text>
                            <View>
                                <Button title="Pay now" onPress={processPayment}></Button>
                            </View>
                        </View> :
                        <View>
                            <Text>
                                Cart is empty
                            </Text>
                        </View>
                    }
                </View>}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height - 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },

    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 16,
    },
});

export default UserCartWrapper
import { fetchCart } from "@/config/database"
import { Cart, Product } from "@/config/types"
import { useUserId } from "@/contexts/UserContext"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, Image, Button, Linking } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import OneUpi from 'one-react-native-upi'
// import OneUpi from 'one-react-native-upi'
type ProductWithQuanity = Product & {
    quantity: number
}
type UserCartWrapperType = {
    cart?: Cart
}
const UserCartWrapper = (props: UserCartWrapperType) => {
    const userId = useUserId()
    const [userCart, setUserCart] = useState<Cart>(props.cart ? props.cart : null)
    const [productQuantity, setProductQuantity] = useState<ProductWithQuanity[]>(null)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        loadCart()
    }, [])
    useEffect(() => {
        if (!loaded) {
            return
        }
    }, [loaded])
    // useEffect(() => {
    //     if (productQuantity && productQuantity.length > 0) {
    //         calculateTotalPrice(productQuantity)
    //     }
    // }, [productQuantity])



    const loadCart = () => {
        console.log(userId)
        fetchCart(userId).then(cart => {
            console.log("fetched cart", cart)
            setUserCart(cart)
            if (cart) {
                calculateQunatiy(cart.products as Product[])
                setLoaded(true)
            }
        }).catch(error => console.error(error)
        )
    }
    // useEffect(() => {
    //     if (loaded) {
    //         // SplashScreen.hideAsync();
    //     }
    // }, [loaded])
    // Function to calculate the total price
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
        // setTotalAmmount(totalPrice)
        // return totalPrice
    };
    const calculateQunatiy = (products) => {
        // Initialize the quantity for each product
        const updatedProducts = products.map(product => ({ ...product, quantity: 1 }));

        // Group and count the products by name
        const groupedProducts = updatedProducts.reduce((acc, product) => {
            if (!acc[product.name]) {
                acc[product.name] = { ...product, quantity: 0 };
            }
            acc[product.name].quantity += product.quantity;
            return acc;
        }, {});
        const resultArray: ProductWithQuanity[] = Object.values(groupedProducts);
        setProductQuantity(resultArray)
        console.log("groupped products", resultArray)
    }
    const upiName = "9063942144@ybl";
    const BussinessName = "RS Enterprises"
    const processPayment = () => {
        Linking.openURL(`upi://pay?pa=${upiName}&pn=${BussinessName}&mode=02&purpose=00&am=${calculateTotalPrice(productQuantity)}`)
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
                <AntDesign.Button onPress={() => { loadCart() }} name="reload1">Refresh</AntDesign.Button>
                {loaded && <View style={styles.container}>
                    <Text style={styles.title}>Cart</Text>
                    {productQuantity.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                                <Text style={styles.price}>Rs {(item.quantity * item.discountPrice).toFixed(2)}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.totalPrice}>Total: Rs {calculateTotalPrice(productQuantity).toFixed(2)}</Text>
                </View>}
                <View>
                    <Button title="Pay now" onPress={processPayment}></Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productImage: {
        height: 30,
        width: 30
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    infoContainer: {
        justifyContent: 'space-around',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 16,
    },
});

export default UserCartWrapper
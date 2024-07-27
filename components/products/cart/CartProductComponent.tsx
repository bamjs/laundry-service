import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as react from 'react'
import { CartProduct } from '@/config/types'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { updateCartQunatiy } from '@/config/database';


type CartProductComponentProps = {
    product: CartProduct
    userId: string
    handleRefresh: () => void
}
const CartProductComponent = (props: CartProductComponentProps) => {
    const product = props.product;
    const decreaseQunaity = async () => {
        const response = await updateCartQunatiy(product, props.userId, -1);
        props.handleRefresh()
    };
    const increaseQuanity = async () => {
        const response = await updateCartQunatiy(product, props.userId, 1);
        props.handleRefresh()
    }



    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.quantity}>Quantity </Text>
                <View style={{ display: 'flex', alignContent: 'space-between', width: 180, flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 20 }} onPress={() => decreaseQunaity()}>
                        <AntDesign name="minus" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={[styles.quantity, { width: 40, textAlign: 'center' }]}>{product.quantity}</Text>
                    <TouchableOpacity style={{ width: 20 }} onPress={() => increaseQuanity()}>
                        <MaterialIcons name="add" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>Rs {(product.quantity * product.discountPrice).toFixed(2)}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderColor: '#29bdc1',
        borderRadius: 10,
        borderWidth: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productImage: {
        height: 30,
        width: 30,
        borderRadius: 50
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

export default CartProductComponent
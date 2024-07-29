import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmptyCart = () => {
    console.log("loading empty cart")
    return (
        <View style={styles.container}>
            <MaterialIcons name="add-shopping-cart" size={24} color="black" />
            <Text style={styles.message}>Your cart is empty</Text>
            <Text style={styles.subMessage}>Add items to get started</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    message: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    subMessage: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});

export default EmptyCart;

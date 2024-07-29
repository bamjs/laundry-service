import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyProduct = ({ departmentName }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>No products available for the {departmentName} department.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FAF9F6'
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default EmptyProduct;

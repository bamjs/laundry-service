// ProductCard.tsx

import { Product } from '@/config/types';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



type AdminProductCardWrapperProps = {
    product: Product;
};

const AdminProductCardWrapper: React.FC<AdminProductCardWrapperProps> = ({ product }) => {
    const { name, imageUrl, originalPrice, discountPrice, offerPercentage, tags } = product;

    return (
        <View style={styles.productCard}>
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productPrice}>
                ₹{discountPrice} <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                <Text style={styles.discountPercentage}> ({offerPercentage}% off)</Text>
            </Text>
            <View style={styles.productTags}>
                {tags.map((tag) => (
                    <Text key={tag} style={styles.tag}>
                        {tag}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 4,
        marginBottom: 8,
    },
    productName: {
        fontSize: 18,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 14,
        marginBottom: 8,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    discountPercentage: {
        color: '#007bff',
    },
    productTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginRight: 8,
        marginBottom: 4,
        fontSize: 12,
        color: '#555',
    },
    addToCartButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default AdminProductCardWrapper;

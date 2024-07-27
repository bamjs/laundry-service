import { Department } from '@/config/types';
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

type DepartmentAdminWrapperProps = {
    department: Department
}
export default function DepartmentAdminWrapper(params: DepartmentAdminWrapperProps) {
    const { department } = params
    return (

        <View style={[styles.productCard, department.isActive ? null : styles.disabled]}>
            <Image source={{ uri: department.url }} style={styles.productImage} />
            <Text style={styles.productName}>{department.name}</Text>
        </View>
    )
}
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
    disabled: {
        opacity: 0.7,
        backgroundColor: 'gray'
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

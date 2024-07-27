import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Department } from '@/config/types'
type DepartmentUserWrapperProps = {
    department: Department
}
const DepartmentUserWrapper = (props: DepartmentUserWrapperProps) => {
    const department = props.department;
    return (
        <View style={[styles.productCard]}>
            <Image source={{ uri: department.url }} style={styles.departmentImage} />
            <Text style={styles.productName}>{department.name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    productCard: {
        // borderWidth: 1,
        borderColor: 'none',
        paddingTop: 14,
        borderRadius: 8,
        // shadowColor: '#000',
        // backgroundColor: '#fff',
        marginLeft: 5,
        alignItems: 'center',
        width: 100,
        fontSize: 5,
        flexShrink: 1,
        textAlign: 'center'
    },

    departmentImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        textAlign: 'center'
    },
});
export default DepartmentUserWrapper
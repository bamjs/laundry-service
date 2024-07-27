import { deleteItem, fetchDepartments, insertProduct } from "@/config/database"
import { Department, Product } from "@/config/types"
import { Formik } from "formik"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Dimensions } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Picker } from '@react-native-picker/picker';
import { showMessage } from "react-native-flash-message"
import DeleteDailog from "../shared/deleteModal"
import { COLLECTIONS } from "@/constants/collections"
import { AntDesign } from "@expo/vector-icons"
type CreateOrEditDepartmentComponentProps = {
    product?: Product
    onSubmit?: () => void
}

const CreateOrEditProductComponet = (props: CreateOrEditDepartmentComponentProps) => {
    const initialValues: Product = props.product ? props.product : {
        id: "",
        name: "",
        discountPrice: 0,
        imageUrl: "",
        offerPercentage: 0,
        rating: 0,
        originalPrice: 0,
        ratingCount: 0,
        tags: [],
        department: null,
        isActive: true
    }
    const intialDepartment: Department = { id: "", isActive: true, name: "", url: "" }
    const [selectedDepartment, setSelectedDepartment] = useState(intialDepartment)
    const [departmentDropdown, setDepartmentDropdown] = useState([{ key: "", value: {} }])

    useEffect(() => {
        const fetchDepartmentsAsync = async () => {
            const departments = await fetchDepartments()
            setDepartmentDropdown(departments.map((department: Department) => {
                return { "key": department.name, "value": department }
            }))
        }
        fetchDepartmentsAsync()
    }, [])


    const handleSubmit = (values: Product) => {
        values.department = selectedDepartment
        values.offerPercentage = Math.round((values.originalPrice - values.discountPrice) / values.originalPrice * 100)

        console.log("values", values)
        console.log("offer", values.offerPercentage)
        insertProduct(values).then(data => {
            showMessage({ message: props.product ? 'Updated Successfully' : 'Created Product', type: "success", duration: 1500 })
            props.onSubmit()
        }).catch(error => {
            showMessage({ message: props.product ? ' Error Updating' : 'Error Creating Product', type: "danger", duration: 1500 })
            console.log("error", error)
            props.onSubmit()
        })
    }
    const handleReset = () => { }
    const handleDelete = () => {
        console.log("handling delete")
        DeleteDailog(() => {
            //on selecting ok 
            deleteItem(COLLECTIONS.PRODUCTS, props.product.id)
        }, () => {

            // on cancel 
            showMessage({ message: "Cancelled Deleting", type: "info" })
        }, props.product.name)
    }
    return (
        <>
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            onReset={handleReset}
                        >
                            {(
                                {
                                    touched,
                                    handleChange,
                                    handleReset,
                                    handleSubmit,
                                    isValid,
                                    values
                                }
                            ) => {
                                return (
                                    <View >
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Name </Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.name}
                                                onChangeText={handleChange("name")}
                                                placeholder="Name of the Product"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Image Url </Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.imageUrl.toString()}
                                                onChangeText={handleChange("imageUrl")}
                                                placeholder="Image URL"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Orginal Price </Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.originalPrice.toString()}
                                                onChangeText={handleChange("originalPrice")}
                                                placeholder="Orginal Price"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Discount Price </Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.discountPrice.toString()}
                                                onChangeText={handleChange("discountPrice")}
                                                placeholder="Discount Price"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Rating </Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.rating.toString()}
                                                onChangeText={handleChange("rating")}
                                                placeholder="Rating"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Rating Count</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={values.ratingCount.toString()}
                                                onChangeText={handleChange("ratingCount")}
                                                placeholder="Rating Count"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Departments </Text>
                                            <Picker
                                                selectedValue={selectedDepartment}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    // setSelectedLanguage(itemValue)
                                                    setSelectedDepartment(itemValue as Department)
                                                }
                                                prompt="Select Department"
                                                renderToHardwareTextureAndroid={true}
                                                key="label"
                                                style={styles.input}
                                            >
                                                <Picker.Item label="Select " key={null} value={null} />
                                                {
                                                    departmentDropdown.map(dep => (
                                                        <Picker.Item label={dep.key} key={dep.key} value={dep.value} />
                                                    ))

                                                }
                                            </Picker>
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.label}>Is Active </Text>
                                            <BouncyCheckbox
                                                fillColor="red"
                                                unFillColor="#FFFFFF"
                                                isChecked={values.isActive}
                                                style={styles.checkBox}
                                                onPress={() => handleChange('isActive')}
                                            />
                                        </View>
                                        <View style={styles.button}>
                                            <Button onPress={handleSubmit} title="submit" />

                                        </View>
                                        <View style={styles.button}>

                                            <AntDesign.Button color={"orange"} onPress={() => handleReset} name="reload1" > Reset</AntDesign.Button>
                                        </View>
                                        <View style={[styles.button, { marginBottom: 10, alignItems: "center" }]}>
                                            <AntDesign.Button color={"black"} onPress={() => handleDelete()} name="delete"  >Delete </AntDesign.Button>
                                        </View>
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </SafeAreaView >
            </ScrollView >

        </>
    )

}
const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 2,
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 16,
        height: 40,
        color: 'black',
        width: (1 * Dimensions.get("screen").width / 2) - 10
    },
    checkBox: {
        borderStyle: 'solid',
        borderColor: 'none'
    },
    label: {
        paddingVertical: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: (Dimensions.get("screen").width / 3)
    },
    button: {
        margin: 4,
        textAlign: 'center',
        width: (Dimensions.get("screen").width - 20)
    },
    buttonRed: {
        backgroundColor: 'red',
        color: 'black'
    },
    textError: {
        color: '#fc6d47',
        fontSize: 14,
    },
});
export default CreateOrEditProductComponet
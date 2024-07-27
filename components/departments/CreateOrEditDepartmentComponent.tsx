import { deleteItem, insertDepartment } from "@/config/database";
import { Department } from "@/config/types";
import { Formik } from "formik";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';
import * as Yup from 'yup'
import DeleteDailog from "../shared/deleteModal";
import { COLLECTIONS } from "@/constants/collections";
import { useUserId } from "@/contexts/UserContext";
type DepartmentCreateOrEditProps = {
    department?: Department
    onSubmit?: () => void
}
const DepartmentCreateOrEdit: React.FC<DepartmentCreateOrEditProps> = (props: DepartmentCreateOrEditProps) => {
    const { user } = useUserId()
    let initialValues: Department = props.department ?
        props.department :
        {
            id: uuid.v4().toString(),
            url: "",
            isActive: true,
            name: "",
            createdBy: user,
            createdDate: new Date(),
            updatedBy: user,
            updatedDate: new Date(),
        }
    const handleSubmit = (values) => {
        console.log("submitting data", values)
        insertDepartment(values).then(data => {
            showMessage({ message: props.department ? 'Updated Successfully' : 'Created Department', type: "success", duration: 1500 })
            props.onSubmit()
        }).catch(error => {
            showMessage({ message: props.department ? ' Error Updating' : 'Error Creating Department', type: "danger", duration: 1500 })
            console.log("error", error)
            props.onSubmit()
        })

    }
    const handleReset = () => {
    }
    const handleDelete = () => {
        console.log("handling delete")
        DeleteDailog(() => {
            //on selecting ok 
            deleteItem(COLLECTIONS.DEPARTMENTS, props.department.id)
        }, () => {

            // on cancel 
            showMessage({ message: "Cancelled Deleting", type: "info" })
        }, props.department.name)
    }
    return (
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
                                            placeholder="Name of the Category"
                                        />
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.label}>Url </Text>
                                        <TextInput
                                            style={styles.input}
                                            value={values.url}
                                            onChangeText={handleChange("url")}
                                            placeholder="Image URL"
                                        />
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
                                        <Button color={"orange"} onPress={() => handleReset()} title="Reset" />
                                    </View>
                                    <View style={styles.button}>
                                        <Button color={"red"} onPress={() => handleDelete()} title="Delete" />
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5
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
        width: (2 * Dimensions.get("screen").width / 3) - 20
    },
    checkBox: {
        borderStyle: 'solid',
        borderColor: 'none'
    },
    label: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: (Dimensions.get("screen").width / 3)
    },
    button: {
        margin: 4
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

export default DepartmentCreateOrEdit
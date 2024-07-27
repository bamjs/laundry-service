import DepartmentCreateOrEdit from "@/components/departments/CreateOrEditDepartmentComponent";
import DepartmentAdminWrapper from "@/components/departments/DepartmentAdminWrapper";
import BottomSheetModalComponent from "../../../components/shared/bottomSheet"
import { ThemedView } from "@/components/ThemedView";
import { fetchDepartments } from "@/config/database";
import { Department } from "@/config/types";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View, Dimensions } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
export default function Departments(params: any) {
    const depat: Department = { id: "", name: "", isActive: false, url: "" }
    let intialDepartments: Department[] = []
    const [showModal, setShowModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(depat);
    const [departments, setDepartments] = useState(intialDepartments)



    const openModal = (department) => {
        setShowModal(true);
        setSelectedDepartment(department);
        console.log("opening modal");
        // bottomSheetModalRef.current.present()
    }
    const onModalClose = () => {
        setShowModal(false)
        setSelectedDepartment(depat)
        console.log("closed modal")
    }
    useEffect(() => {
        fetchDepartments().then(data => {
            setDepartments(data)
        })
    }, [])

    return (
        < View style={styles.container}>
            <ThemedView style={styles.button}>
                <Button title="+  New" onPress={() => { setShowModal(true) }} />
                {/* <AntDesign name="addfile" size={24} color="black" /> */}
            </ThemedView>
            <ScrollView>
                {
                    departments.map(dep => (
                        <TouchableWithoutFeedback key={dep.id} onPress={() => {
                            openModal(dep)
                        }}>
                            <DepartmentAdminWrapper department={dep} />
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
            {showModal &&
                <BottomSheetModalComponent index={2} onDismiss={onModalClose} show={showModal}>
                    <DepartmentCreateOrEdit department={selectedDepartment} onSubmit={() => { setShowModal(false) }} />
                </BottomSheetModalComponent>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: Dimensions.get("screen").height,
        flex: 1
    },
    button: {
        flexDirection: 'row-reverse',
        padding: 5,
        margin: 5
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },

})
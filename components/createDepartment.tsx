import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from 'react-native-uuid';
export default function createProduct(params) {
    const [department, setDepartment] = useState({
        name: '',
        id: uuid.v4().toString(),
        enabled: true,
        url: ''
    })
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}
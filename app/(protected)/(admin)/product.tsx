import { ThemedView } from "@/components/ThemedView";
import { Button, ScrollView, TextInput, SafeAreaView, StyleSheet, Dimensions, View, TouchableWithoutFeedback } from "react-native";
import * as staticData from '../../../constants/data'
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/UserContext";
import { fetchProducts, insertProduct } from '@/config/database';
import CreateOrEditProductComponet from "@/components/products/CreateOrEditProductComponet";
import BottomSheetModalComponent from "@/components/shared/bottomSheet";
import { Product } from "@/config/types";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ProductAdminWrapper from "@/components/products/ProductAdminWrapper";
import AdminProductCardWrapper from "@/components/products/AdminProductCardWrapper";
const ProductHome = () => {
    const intialProduct: Product = {
        id: '',
        name: '',
        imageUrl: '',
        originalPrice: 0,
        discountPrice: 0,
        offerPercentage: 0,
        rating: 0,
        ratingCount: 0,
        tags: [],
        department: null,
        isActive: true
    }

    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(intialProduct)
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(data => setProducts(data))
    }, [])
    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        console.log("opening modal");
        // bottomSheetModalRef.current.present()
    }
    const onModalClose = () => {
        setShowModal(false)
        setSelectedProduct(intialProduct)
        console.log("closed modal")
    }


    return (
        < View style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.button}>
                    <Button title="+  New" onPress={() => { setShowModal(true) }} />
                </ThemedView>
                {
                    products.length > 0 && products.map(prod => (
                        <TouchableWithoutFeedback key={prod.id} onPress={() => {
                            console.log("touched")
                            openModal(prod)
                        }}>
                            <View>
                                <AdminProductCardWrapper product={prod} />
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
            {showModal &&
                <BottomSheetModalComponent index={2} onDismiss={onModalClose} show={showModal}>
                    <CreateOrEditProductComponet product={selectedProduct} onSubmit={() => { setShowModal(false) }} />
                </BottomSheetModalComponent>}
        </View>
    )
}
export default ProductHome

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
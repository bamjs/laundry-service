import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { getDashboardAnalytics } from '@/config/database';

const BootomSheet = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    // const [analaytics, setAnalatics] = useState<{ totalOrders: number, averagePrice: number, totalSales: number }>({ averagePrice: 0, totalOrders: 0, totalSales: 0 });
    const snapPoints = ["10%", "30%", "50%", "90%", "95%"]
    // // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    // useEffect(() => {
    //     getDashboardAnalytics().then((data) => {
    //         setAnalatics(data)
    //     })
    // }, [])
    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                index={2}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eveniet doloribus aliquam nihil dolorum officiis aperiam, vitae magni magnam impedit, in cupiditate, aut voluptate quo illum. Nisi cum quae explicabo.
                    </Text>
                    {/* <Text style={styles.analysisText}>
                        Total Orders : {analaytics.totalOrders}

                    </Text>
                    <Text style={styles.analysisText}>
                        Sales YTD : {analaytics.totalSales}
                    </Text>
                    <Text style={styles.analysisText}>

                        Average Sale Price : {analaytics.averagePrice}
                    </Text> */}
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    analysisText: {
        fontSize: 20,
        fontWeight: '500'
    }
});

export default BootomSheet;
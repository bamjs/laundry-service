import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BootomSheet = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["10%", "30%", "50%", "90%", "95%"]
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

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
                    <Text>Awesome 🎉
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. In reiciendis corrupti ex dolores quibusdam mollitia sed explicabo? Qui, ad iusto. Commodi eaque dignissimos quas! Nam nemo totam aut rerum eveniet?
                    </Text>
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
});

export default BootomSheet;
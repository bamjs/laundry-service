import React, { forwardRef, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet, {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetModalProps,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import DepartmentCreateOrEdit from '../departments/CreateOrEditDepartmentComponent';
import { FullWindowOverlay } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
type BottomSheetModalComponentProps = BottomSheetModalProps & {
    children?: React.ReactNode | undefined;
    show: boolean
}
const BottomSheetModalComponent = ({ children, show, ...rest }: BottomSheetModalComponentProps) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '65%', '75%', '90%', '100%'], []);

    // // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    useEffect(() => {
        if (show) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current.dismiss()

        }
    }, [show])
    // renders
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enableDismissOnClose={true}
                    enablePanDownToClose={true}
                    {...rest}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomSheetModalComponent;
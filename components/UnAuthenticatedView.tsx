// AuthenticatedView.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type UnAuthenticatedViewProps = {
    children: React.ReactNode;
};

export const UnAuthenticatedView: React.FC<UnAuthenticatedViewProps> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

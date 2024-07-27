// AuthenticatedView.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type AuthenticatedViewProps = {
    children: React.ReactNode;
};

export const AuthenticatedView: React.FC<AuthenticatedViewProps> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

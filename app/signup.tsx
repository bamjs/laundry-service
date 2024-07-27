import { createUserWithUsernameAndPassword } from '@/config/firebaseconfig';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { View, TextInput, Button, Text, StyleSheet, Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function SignupComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirm_password, setConfirmPassword] = useState("")
    const router = useRouter();
    const handleCreateAccount = async () => {
        try {
            if (confirm_password !== password) {
                return setErrorMessage("Passwords are not Same")
            }
            const response = await createUserWithUsernameAndPassword(email, password);
            if (response?.success) {
                console.log('user created ', response)
                showMessage({ message: "User Created Successfully", type: "success" })
                // useSnackBar({ message: "User Created Successfully", type: "SUCCESS" })
            }
        } catch (error: any) {
            showMessage({ message: error.message, type: "danger" })
            // setErrorMessage(error.message);
        }
    };
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Create an Account
                </Text>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirm_password}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button title="Create Account" onPress={handleCreateAccount} />
                </View>
                <Button title="Back to Login" onPress={() => router.back()} />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        // borderColor: 'gray',
        backgroundColor: '#fef8fa',
        color: '#000000',
        borderWidth: 0.5,
        marginBottom: 12,
        paddingHorizontal: 8,
        shadowColor: '#000',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        width: Dimensions.get("screen").width - 20,
        elevation: 1,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        marginBottom: 12
    },
    createAccountText: {
        textAlign: 'center',
        alignItems: 'center'
    }
});
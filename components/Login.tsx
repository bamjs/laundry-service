// LoginComponent.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { loginUserWithUsernameAndPassword, createUserWithUsernameAndPassword, FIREBASE_STORE } from '../config/firebaseconfig'
import { useNavigation } from 'expo-router';
import { AuthContext } from '@/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
type LoginComponentProps = {
    onLoginSuccess: any
};
const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [confirm_password, setConfirmPassword] = useState("")
    const authContext = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);
    const handleLogin = async () => {
        try {
            const userCredentail = await loginUserWithUsernameAndPassword(email, password);
            if (userCredentail.user) {
                console.log("login successfull")
                console.log(userCredentail.user)
                // setUserContext(userCredentail.user)
                AsyncStorage.setItem("user", JSON.stringify(userCredentail.user))
                onLoginSuccess(true);
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };
    const handleCreateAccount = async () => {
        try {
            if (confirm_password === password) {
                return setErrorMessage("Passwords are not Same")
            }
            const response = await createUserWithUsernameAndPassword(email, password);
            if (response?.success) {
                console.log('user created ', response)
                // useSnackBar({ message: "User Created Successfully", type: "SUCCESS" })
            }
        } catch (error: any) {
            // useSnackBar({ message: "Error creating user", type: "ERROR" })
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isCreatingAccount ? 'Create an Account' : 'RS Enterprises Login'}
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
            {isCreatingAccount ? (
                <>
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
                    <Button title="Back to Login" onPress={() => setIsCreatingAccount(false)} />
                </>
            ) : (
                <>
                    <View style={styles.button}>
                        <Button title="Login" onPress={handleLogin} />
                    </View>
                    <View style={styles.createAccountText}>
                        <Text onPress={() => setIsCreatingAccount(true)} >New User! Create Account</Text>
                    </View>
                </>
            )}
        </View>
    );
};

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
        width: 300,
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

export default LoginComponent;

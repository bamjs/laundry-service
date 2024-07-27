// LoginComponent.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Dimensions } from 'react-native';
import { loginUserWithUsernameAndPassword, createUserWithUsernameAndPassword, FIREBASE_STORE } from '../config/firebaseconfig'
import { useNavigation, useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
type LoginComponentProps = {
    onLoginSuccess?: any
};
const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    const router = useRouter();
    const { session, isLoggedIn, setSession, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);
    const handleLogin = async () => {
        try {
            const userCredentail = await loginUserWithUsernameAndPassword(email, password);
            const user = userCredentail.user
            if (user) {
                console.log("login successfull")
                console.log(user)
                AsyncStorage.setItem("user", JSON.stringify(user))
                showMessage({ message: "Login Successfull", type: "success", duration: 200 })
                setSession(user);
                setIsLoggedIn(true)
            }
        } catch (error: any) {
            // setErrorMessage(error.message);
            if ((error.message as string).includes("auth/invalid-credential")) {
                showMessage({ message: "Invalid Credentials", type: 'danger' })
            } else {
                showMessage({ message: error.message, type: 'danger' })

            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                RS Enterprises Login
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

            <View style={styles.button}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <View style={styles.createAccountText}>
                <Text onPress={() => router.navigate("signup")} >New User! Create Account</Text>
            </View>
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
        marginBottom: 8,
        paddingHorizontal: 8,
        shadowColor: '#000',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        width: (Dimensions.get("screen").width) - 30,
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

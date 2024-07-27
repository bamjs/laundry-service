import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter } from "expo-router";
import { Auth, UserCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";

const AuthContext = createContext<{
    isLoggedIn: boolean,
    session: {} | null,
    setSession: ({ }) => void,
    setIsLoggedIn: (login: boolean) => void
    isloading: boolean
    setIsLoading: (value: boolean) => void
    checkLocalStorage: () => void
}>({
    isLoggedIn: false,
    session: null,
    setIsLoggedIn: (login: boolean) => { },
    setSession: ({ }) => { },
    isloading: false,
    setIsLoading: (value: boolean) => { },
    checkLocalStorage: () => { }
});



function useSession() {
    const value = React.useContext(AuthContext)
    return value
}
function useUserId() {
    const value = React.useContext(AuthContext)
    return isDevelopment ? value.session['user']["email"] : value.session["email"]
}
const isDevelopment = false
const SessionProvider = (props: React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isDevelopment ? true : false);
    const [session, setSession] = useState<UserCredential>(isDevelopment ? ({ user: { email: "muthyala.js@gmail.com" } } as UserCredential) : null);
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    const handleLogIn = () => {
        if (isLoggedIn) {
            router.replace("/(protected)")
        } else {
            setSession(null)
            AsyncStorage.clear().then(
                () => router.replace("/login")
            );
        }
    }
    const checkLocalStorage = async () => {
        const userString = await AsyncStorage.getItem("user");
        const user = JSON.parse(userString);
        console.log("Local storage user", user);
        if (user) {
            setSession(user);
            setIsLoggedIn(true);
            router.replace("/(protected)/index");
            return true
        } else {
            setIsLoggedIn(false);
            router.replace("/login");
            return false;
        }
    };
    useEffect(() => {
        setIsloading(true)
        checkLocalStorage().then(() => {
            console.log('====================================');
            console.log("fetched storage");
            console.log('====================================')
            setIsloading(false)
        }).catch(error => console.error(error))
    }, [])
    useEffect(() => { handleLogIn() }, [isLoggedIn])

    return (
        <>
            <AuthContext.Provider value={{ session: session, isLoggedIn: isLoggedIn, checkLocalStorage: checkLocalStorage, setIsLoggedIn: setIsLoggedIn, setSession: setSession, isloading: isLoading, setIsLoading: setIsloading }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}
export { AuthContext, useSession, SessionProvider, useUserId }
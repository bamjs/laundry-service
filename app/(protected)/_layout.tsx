import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useSession } from '@/contexts/UserContext';

export default function Layout() {
    const [isAdmin, setIsAdmin] = useState(true);
    const { isLoggedIn } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login")
        }
    }, [isLoggedIn])
    return (
        // <>{isAdmin ?

        <Drawer>

            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'User',
                    title: 'overview',
                }}
                redirect={true}
            />
            <Drawer.Screen
                name="(admin)" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Admin',
                    title: 'Admin Console',
                }}
            />
            <Drawer.Screen
                name="(user)" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'User',
                    title: 'Home',
                }}
            />


        </Drawer>

        //     :

        //     <Stack>
        //         <Stack.Screen name='(user)' />
        //         <Stack.Screen name='index' />
        //     </Stack>

        // }
        // </>
    );
}

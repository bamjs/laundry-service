import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/contexts/UserContext';
import { AntDesign } from '@expo/vector-icons';
export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { isLoggedIn } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login")
        }
    }, [isLoggedIn])
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen name='home' options={{
                title: 'Home', tabBarIcon: ({ color, focused }) =>
                    (<MaterialIcons name="admin-panel-settings" size={24} color={focused ? 'blue' : 'grey'} />)
            }} />
            <Tabs.Screen name='departments' options={{
                title: 'Departments', tabBarIcon: ({ color, focused }) =>
                    (<AntDesign name="enviroment" size={24} color={focused ? 'blue' : 'black'} />)
            }} />
            <Tabs.Screen name='product' options={{
                title: 'Product', tabBarIcon: ({ color, focused }) =>
                    (<AntDesign name="isv" size={24} color={focused ? 'blue' : 'black'} />)
            }} />
            <Tabs.Screen name='orders' options={{
                title: 'Orders', tabBarIcon: ({ color, focused }) =>
                    (<AntDesign name="shoppingcart" size={24} color={focused ? 'blue' : 'black'} />)
            }} />
        </Tabs>
    );
}

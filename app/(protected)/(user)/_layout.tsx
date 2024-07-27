import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/contexts/UserContext';

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
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider, useSession } from '@/contexts/UserContext';
import FlashMessage from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    XHRInterceptor.enableInterception();
    console.log(XHRInterceptor.isInterceptorEnabled())
    XHRInterceptor.setOpenCallback(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 5000);
      setIsLoading(true)
    })
    XHRInterceptor.setResponseCallback(
      () => {
        setIsLoading(false)
      }
    )
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider >
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          animation='fade'
          textStyle={{ color: '#FFF' }}
        />
        < GestureHandlerRootView style={{ flex: 1 }}>
          <MyStack isLoggedIn={session.isLoggedIn} />
        </GestureHandlerRootView >
      </SessionProvider>
      <StatusBar backgroundColor={Colors.light.tint} />
      <FlashMessage style={{ marginTop: 30 }} position="top" />
    </ThemeProvider >
  );
}
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


type MyStackProps = {
  isLoggedIn: boolean
}
function MyStack(props: MyStackProps) {
  const { isLoggedIn } = useSession()
  useEffect(() => {
    console.log("use effect ");
    if (isLoggedIn) {
      console.log("navigatin")
    }
  }, [isLoggedIn])
  return (
    <Stack
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="login"
        redirect={isLoggedIn}
        options={{
          title: 'Login',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="signup"
        redirect={isLoggedIn}
        options={{
          title: 'Sign Up',
          headerShown: false,
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="(protected)"
        redirect={!isLoggedIn}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
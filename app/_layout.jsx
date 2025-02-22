import { PaperProvider } from "react-native-paper";
import { SplashScreen, Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  TitanOne_400Regular,
} from "@expo-google-fonts/dev";
import FlashMessage from "react-native-flash-message";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { BottomSheetProvider } from '../src/context/BottomSheetContext';
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated, isLoading, isLoginRoute } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized || isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isAuthScreen = segments[0] === "login" || segments[0] === "signup";

    if (isAuthenticated) {
      if (!inAuthGroup) {
        router.replace("/(auth)/home");
      }
    } else {
      if (!isAuthScreen) {
        router.replace(isLoginRoute ? "/login" : "/");
      }
    }
  }, [initialized, isAuthenticated, segments, isLoading, isLoginRoute]);

  if (isLoading) {
    return null;
  }

  return <Slot />;
}

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Titan-One": TitanOne_400Regular,
    "Nunito-Bold": Nunito_700Bold,
    "Nunito-Black": Nunito_900Black,
    "Nunito-ExtraBold": Nunito_800ExtraBold,
    "Nunito-SemiBold": Nunito_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PaperProvider>
          <BottomSheetProvider>
            <StatusBar style="dark" backgroundColor="transparent" />
            <RootLayoutNav />
            <FlashMessage position="bottom" />
          </BottomSheetProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

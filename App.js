import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import NavigationHeader from "./app/components/NavigationHeader";

export default App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationHeader />
    </SafeAreaProvider>
  );
};

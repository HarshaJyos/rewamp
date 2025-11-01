import React, { useEffect, useState } from "react";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { firebaseAuthService } from "./src/services/firebaseAuthService";
import { apiService } from "./src/services/api";
import * as Font from 'expo-font';


// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? MD3DarkTheme : MD3LightTheme;
    const [fontsLoaded, setFontsLoaded] = useState(false);
  

  useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
          'MaterialIcons': require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        });
        setFontsLoaded(true);
      }
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return null; // or splash screen
    }

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await firebaseAuthService.savePushToken(token);

      const user = firebaseAuthService.getCurrentUser();
      if (user) {
        await apiService.updateProfile(user.uid, { pushToken: token });
      }
    };

    setupNotifications();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { firebaseAuthService } from "../services/firebaseAuthService";

export default function AuthScreen({ navigation }: any) {
  const theme = useTheme();

  const handleAnonymousLogin = async () => {
    try {
      await firebaseAuthService.signInAnonymously();
      navigation.replace("ProfileSetup");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>
        Credit Card Advisor
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Get personalized card recommendations
      </Text>
      <Button mode="contained" onPress={handleAnonymousLogin} style={styles.button}>
        Continue as Guest
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  logo: { width: 120, height: 120, marginBottom: 24 },
  title: { fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 32, opacity: 0.7 },
  button: { borderRadius: 8, paddingHorizontal: 16 },
});
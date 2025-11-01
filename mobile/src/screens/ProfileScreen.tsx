import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Divider, useTheme } from "react-native-paper";
import { apiService } from "../services/api";
import { firebaseAuthService } from "../services/firebaseAuthService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProfileScreen({ navigation }: any) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const uid = firebaseAuthService.getCurrentUser()?.uid;

  useEffect(() => {
    if (!uid) return;
    apiService.getProfile(uid).then((res) => {
      setProfile(res.data);
      setLoading(false);
    });
  }, [uid]);

  const handleLogout = async () => {
    await firebaseAuthService.signOut();
    navigation.replace("Auth");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="titleLarge">Profile</Text>
      </View>

      {profile ? (
        <>
          <View style={styles.field}>
            <Text variant="labelLarge">Annual Income</Text>
            <Text variant="bodyLarge">${profile.annualIncome?.toLocaleString()}</Text>
          </View>
          <Divider />
          <View style={styles.field}>
            <Text variant="labelLarge">Credit Score</Text>
            <Text variant="bodyLarge">{profile.creditScore}</Text>
          </View>
          <Divider />
          <View style={styles.field}>
            <Text variant="labelLarge">Spending Category</Text>
            <Text variant="bodyLarge">{profile.primarySpendingCategory}</Text>
          </View>
          <Divider />
        </>
      ) : (
        <Text style={styles.empty}>Profile not set up yet.</Text>
      )}

      <Button mode="outlined" onPress={() => navigation.navigate("ProfileSetup")} style={styles.button}>
        Edit Profile
      </Button>
      <Button mode="contained" onPress={handleLogout} style={styles.button} color="#D32F2F">
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  field: { padding: 16 },
  empty: { textAlign: "center", margin: 40, opacity: 0.6 },
  button: { margin: 16, borderRadius: 8 },
});
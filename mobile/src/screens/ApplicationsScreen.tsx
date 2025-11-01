import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Chip, useTheme } from "react-native-paper";
import { apiService } from "../services/api";
import { firebaseAuthService } from "../services/firebaseAuthService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ApplicationsScreen() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const uid = firebaseAuthService.getCurrentUser()?.uid;

  useEffect(() => {
    if (!uid) return;
    apiService.getApplications(uid).then((res) => {
      setApps(res.data || []);
      setLoading(false);
    });
  }, [uid]);

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="titleLarge">Your Applications</Text>
      </View>
      {apps.length === 0 ? (
        <Text style={styles.empty}>No applications yet.</Text>
      ) : (
        apps.map((app) => (
          <Card key={app.id} style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{app.creditCard.name}</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
                Applied on {new Date(app.appliedAt).toLocaleDateString()}
              </Text>
              <Chip
                mode="flat"
                style={{
                  marginTop: 8,
                  backgroundColor:
                    app.status === "pending"
                      ? "#FFF8E1"
                      : app.status === "approved"
                      ? "#E8F5E9"
                      : "#FFEBEE",
                }}
              >
                {app.status.toUpperCase()}
              </Chip>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  card: { marginHorizontal: 16, marginVertical: 8 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.6 },
});
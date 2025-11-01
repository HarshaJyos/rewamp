import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, IconButton, useTheme } from "react-native-paper";
import { apiService } from "../services/api";
import { firebaseAuthService } from "../services/firebaseAuthService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const uid = firebaseAuthService.getCurrentUser()?.uid;

  const loadNotifs = async () => {
    if (!uid) return;
    const res = await apiService.getNotifications(uid);
    setNotifs(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifs();
  }, [uid]);

  const markRead = async (id: string) => {
    await apiService.markNotificationRead(id);
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="titleLarge">Notifications</Text>
      </View>
      {notifs.length === 0 ? (
        <Text style={styles.empty}>No notifications</Text>
      ) : (
        notifs.map((n) => (
          <List.Item
            key={n.id}
            title={n.message}
            titleStyle={{ fontWeight: n.read ? "normal" : "bold" }}
            description={new Date(n.createdAt).toLocaleString()}
            left={() => <List.Icon icon={n.read ? "bell" : "bell-ring"} />}
            right={() => !n.read && <IconButton icon="check" size={20} onPress={() => markRead(n.id)} />}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.6 },
});
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { apiService } from "../services/api";
import { firebaseAuthService } from "../services/firebaseAuthService";
import CardItem from "../components/CardItem";
import RecommendationItem from "../components/RecommendationItem";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomeScreen() {
  const [cards, setCards] = useState<any[]>([]);
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const uid = firebaseAuthService.getCurrentUser()?.uid;

  const loadData = async () => {
    if (!uid) return;
    try {
      const [cardsRes, recsRes] = await Promise.all([
        apiService.getCards(),
        apiService.getRecommendations(uid),
      ]);
      setCards(cardsRes.data || []);
      setRecs(recsRes.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [uid]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleRegenerate = async () => {
    if (!uid) return;
    setLoading(true);
    await apiService.generateRecommendations(uid);
    await loadData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.section}>
        <View style={styles.header}>
          <Text variant="titleLarge">Top Recommendations</Text>
          <Button mode="outlined" onPress={handleRegenerate} compact>
            Regenerate
          </Button>
        </View>
        {recs.length === 0 ? (
          <Text style={styles.empty}>Complete your profile to see recommendations!</Text>
        ) : (
          recs.map((r) => <RecommendationItem key={r.id} rec={r} uid={uid!} onApplied={loadData} />)
        )}
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge">All Cards</Text>
        {cards.map((c) => (
          <CardItem key={c.id} card={c} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  empty: { textAlign: "center", opacity: 0.6, fontStyle: "italic", marginVertical: 20 },
});
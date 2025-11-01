import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, ProgressBar, Button, useTheme } from "react-native-paper";
import { apiService } from "../services/api";

interface Props {
  rec: any;
  uid: string;
  onApplied: () => void;
}

export default function RecommendationItem({ rec, uid, onApplied }: Props) {
  const theme = useTheme();
  const score = rec.matchScore / 100;

  const handleApply = async () => {
    try {
      await apiService.createApplication(uid, rec.creditCardId);
      onApplied();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium">{rec.creditCard.name}</Text>
          <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
            {rec.matchScore}% Match
          </Text>
        </View>

        <ProgressBar progress={score} color={score > 0.8 ? "#4CAF50" : score > 0.6 ? "#FF9800" : "#F44336"} style={styles.bar} />

        <Text variant="bodySmall" style={styles.issuer}>
          {rec.creditCard.issuer} • ${rec.creditCard.annualFee}/yr
        </Text>

        <Button mode="contained" onPress={handleApply} style={styles.button} compact>
          Apply Now
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  bar: { height: 8, borderRadius: 4, marginVertical: 12 },
  issuer: { opacity: 0.7, marginBottom: 8 },
  button: { borderRadius: 8 },
});
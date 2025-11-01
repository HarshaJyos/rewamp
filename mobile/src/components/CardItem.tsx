import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Chip, useTheme } from "react-native-paper";

interface Props {
  card: any;
}

export default function CardItem({ card }: Props) {
  const theme = useTheme();

  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {card.name}
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          {card.issuer}
        </Text>

        <View style={styles.row}>
          <Chip icon="cash" compact style={styles.chip}>
            ${card.annualFee}/yr
          </Chip>
          <Chip icon="star" compact style={styles.chip}>
            {card.signupBonus}
          </Chip>
        </View>

        <Text variant="bodySmall" style={styles.reward}>
          {card.rewardRate}
        </Text>

        <View style={styles.benefits}>
          {card.benefits.map((b: string, i: number) => (
            <Text key={i} style={styles.benefit}>• {b}</Text>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8 },
  row: { flexDirection: "row", gap: 8, marginTop: 8 },
  chip: { height: 32 },
  reward: { marginTop: 8, fontStyle: "italic" },
  benefits: { marginTop: 8 },
  benefit: { fontSize: 12, opacity: 0.8 },
});
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, COMMON_STYLES } from '../theme';

export default function NutritionScreen({ onBack }) {
  // Mock data for demo
  const dailyCalories = 1750;
  const calorieGoal = 2000;
  const macros = [
    { label: 'Protein', value: '65g', percent: 32, color: COLORS.success },
    { label: 'Carbs', value: '210g', percent: 52, color: COLORS.primary },
    { label: 'Fat', value: '45g', percent: 16, color: COLORS.error },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>NUTRITION</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, COMMON_STYLES.card]}>
          <Text style={styles.cardTitle}>Daily Calories</Text>
          <Text style={styles.calorieVal}>{dailyCalories.toLocaleString()}</Text>
          <Text style={styles.goalText}>Goal: {calorieGoal} kcal</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(dailyCalories/calorieGoal)*100}%` }]} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Macros Breakdown</Text>
        {macros.map((macro, index) => (
          <View key={index} style={[styles.card, COMMON_STYLES.card, { marginBottom: 15 }]}>
            <View style={styles.macroRow}>
              <Text style={styles.macroLabel}>{macro.label}</Text>
              <Text style={styles.macroValue}>{macro.value} ({macro.percent}%)</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${macro.percent}%`, backgroundColor: macro.color }]} />
            </View>
          </View>
        ))}

        <View style={[styles.card, COMMON_STYLES.card, { marginTop: 10 }]}>
          <Text style={styles.infoText}>
            Nutrition data is automatically calculated from your extracted recipes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
  },
  title: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  backBtn: { color: COLORS.primary, fontWeight: 'bold' },
  content: { padding: SPACING.md },
  card: { alignItems: 'center', marginBottom: SPACING.xl },
  cardTitle: { color: COLORS.textSecondary, fontSize: 14, textTransform: 'uppercase' },
  calorieVal: { color: COLORS.primary, fontSize: 64, fontWeight: 'bold', marginVertical: 10 },
  goalText: { color: COLORS.textSecondary, fontSize: 16 },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  macroLabel: { color: COLORS.text, fontWeight: '600' },
  macroValue: { color: COLORS.textSecondary },
  infoText: { color: COLORS.textSecondary, textAlign: 'center', fontSize: 12, fontStyle: 'italic' },
});

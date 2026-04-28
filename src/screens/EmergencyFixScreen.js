import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../theme';

/**
 * EMERGENCY FIX SCREEN
 * Provides instant solutions for common cooking mistakes.
 */
const EmergencyFixScreen = ({ onBack, mistakeType = "too much salt" }) => {
  
  const fixes = {
    "too much salt": [
      { id: 1, title: "Add Potatoes", text: "Add 3-4 peeled, raw potato chunks. They absorb excess salt like a sponge." },
      { id: 2, title: "Add Liquid", text: "If it's a curry, add a splash of water, unsalted broth, or coconut milk." },
      { id: 3, title: "Balance with Acid", text: "A squeeze of lemon or a dash of vinegar can mask the salty taste." },
      { id: 4, title: "Creamy Fix", text: "Add a dollop of yogurt or heavy cream to mellow the flavors." }
    ],
    "too spicy": [
      { id: 1, title: "Dairy Power", text: "Add yogurt, cream, or milk. Casein in dairy neutralizes capsaicin." },
      { id: 2, title: "Nut Butters", text: "Stir in a spoonful of peanut butter or tahini." },
      { id: 3, title: "Sugar/Honey", text: "A pinch of sweetness can balance the heat." }
    ]
  };

  const currentFixes = fixes[mistakeType] || fixes["too much salt"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← BACK TO COOKING</Text>
        </TouchableOpacity>
        <Text style={styles.title}>EMERGENCY FIX ⚠️</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mistakeBanner}>
          <Text style={styles.mistakeEmoji}>🧂</Text>
          <Text style={styles.mistakeTitle}>{mistakeType.toUpperCase()}</Text>
          <Text style={styles.mistakeSub}>Don't worry, we can fix this!</Text>
        </View>

        {currentFixes.map((fix) => (
          <View key={fix.id} style={styles.fixCard}>
            <Text style={styles.fixNum}>OPTION {fix.id}</Text>
            <Text style={styles.fixTitle}>{fix.title}</Text>
            <Text style={styles.fixText}>{fix.text}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.resumeButton} onPress={onBack}>
          <Text style={styles.resumeButtonText}>I FIXED IT, RESUME COOKING ✓</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
  },
  backButton: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  mistakeBanner: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  mistakeEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  mistakeTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  mistakeSub: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  fixCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  fixNum: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  fixTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fixText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  resumeButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  resumeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmergencyFixScreen;

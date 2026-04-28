import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS, SPACING } from '../theme';
import { useStore } from '../store/useStore';
import { useCooking } from '../hooks/useCooking';

export default function CookingModeScreen({ onMistake }) {
  const activeRecipe = useStore(state => state.activeRecipe);
  const exitCooking = useStore(state => state.exitCooking);

  const cookingData = useCooking((cmd) => {
    if (cmd === 'salt_error') {
      onMistake('too much salt');
    }
  });

  const { 
    currentStep, 
    stepNumber, 
    totalSteps, 
    handleVoiceCommand, 
    isFirstStep, 
    isLastStep 
  } = cookingData;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.recipeTitle}>{activeRecipe?.title?.toUpperCase() || 'RECIPE'}</Text>
        <Text style={styles.stepCounter}>STEP {stepNumber} OF {totalSteps}</Text>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.instructionText}>
          "{currentStep?.instruction}"
        </Text>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{currentStep?.timer > 0 ? `${Math.floor(currentStep.timer / 60)}:00` : '--:--'}</Text>
          <Text style={styles.timerLabel}>Remaining</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.voiceIndicator}>
          <View style={styles.micCircle}>
            <Text style={{ fontSize: 24 }}>🎤</Text>
          </View>
          <Text style={styles.listeningText}>"Hey Chef" — Listening...</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, isFirstStep && { opacity: 0.3 }]} 
            onPress={() => handleVoiceCommand('previous')}
            disabled={isFirstStep}
          >
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleVoiceCommand('stop')}>
            <Text style={[styles.buttonText, { color: '#000' }]}>EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]} onPress={() => handleVoiceCommand('salt')}>
            <Text style={styles.buttonText}>SALT?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, isLastStep && { opacity: 0.3 }]} 
            onPress={() => handleVoiceCommand('next')}
            disabled={isLastStep}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
  },
  recipeTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  stepCounter: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  instructionText: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  timerContainer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  timerText: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: 'bold',
  },
  timerLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  footer: {
    padding: SPACING.lg,
  },
  voiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 50,
    marginBottom: SPACING.lg,
  },
  micCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  listeningText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

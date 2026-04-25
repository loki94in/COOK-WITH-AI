import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { COLORS, SPACING } from './src/theme';
import { initDatabase } from './src/services/database';
import { useStore } from './src/store/useStore';
import { useCooking } from './src/hooks/useCooking';
import { extractRecipeFromUrl } from './src/services/youtubeApi';
import PantryScreen from './src/screens/PantryScreen';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');

  // PERFORMANCE: Destructure only what is needed to avoid unnecessary re-renders
  const activeRecipe = useStore(state => state.activeRecipe);
  const isCooking = useStore(state => state.isCooking);
  const setActiveRecipe = useStore(state => state.setActiveRecipe);
  const exitCooking = useStore(state => state.exitCooking);

  const { 
    currentStep, 
    stepNumber, 
    totalSteps, 
    handleVoiceCommand, 
    isFirstStep, 
    isLastStep 
  } = cookingData;

  useEffect(() => {
    initDatabase();
  }, []);

  // Function to handle mock extraction
  const handleExtract = async () => {
    setLoading(true);
    try {
      const recipe = await extractRecipeFromUrl('https://youtube.com/watch?v=mock');
      setActiveRecipe(recipe);
      Toast.show({
        type: 'success',
        text1: 'Recipe Ready!',
        text2: 'Voice control is now active.',
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (currentScreen === 'pantry') {
    return (
      <>
        <PantryScreen onBack={() => setCurrentScreen('home')} />
        <Toast />
      </>
    );
  }

  if (!isCooking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContent}>
          <Text style={styles.instructionText}>Paste Recipe URL</Text>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton, { width: 200, marginTop: 20 }]} 
            onPress={handleExtract}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={[styles.buttonText, { color: '#000' }]}>EXTRACT MOCK RECIPE</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { width: 200, marginTop: 20 }]} 
            onPress={() => setCurrentScreen('pantry')}
          >
            <Text style={styles.buttonText}>MANAGE PANTRY</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.recipeTitle}>{activeRecipe.title.toUpperCase()}</Text>
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
          <TouchableOpacity 
            style={[styles.button, isLastStep && { opacity: 0.3 }]} 
            onPress={() => handleVoiceCommand('next')}
            disabled={isLastStep}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
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

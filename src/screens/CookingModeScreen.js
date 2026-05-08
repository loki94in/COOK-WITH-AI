import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS, SPACING } from '../theme';
import { useStore } from '../store/useStore';
import { useCooking } from '../hooks/useCooking';
import { syncPantryAfterCooking } from '../services/pantrySync';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

export default function CookingModeScreen({ onMistake, setCurrentScreen }) {
  const activeRecipe = useStore(state => state.activeRecipe);
  const exitCooking = useStore(state => state.exitCooking);
  const playerRef = useRef(null);

  const handleFinish = () => {
    const success = syncPantryAfterCooking(activeRecipe?.ingredients || []);
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Cooking Complete! 🍳',
        text2: 'Pantry inventory has been updated.',
      });
    }
    exitCooking();
    setCurrentScreen('home');
  };

  const cookingData = useCooking((cmd) => {
    if (cmd === 'too much salt') {
      onMistake('too much salt');
    } else if (cmd === 'too spicy') {
      onMistake('too spicy');
    } else if (cmd === 'finish') {
      handleFinish();
    }
  });
  const { 
    currentStep, 
    stepNumber, 
    totalSteps, 
    handleVoiceCommand, 
    isFirstStep, 
    isLastStep,
    currentTimestamp
  } = cookingData;

  const stepsCount = totalSteps || 0;




  // Extract Video ID
  const videoId = activeRecipe?.source_url?.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/)?.[1];

  // Auto-seek when step changes
  useEffect(() => {
    if (currentTimestamp > 0 && playerRef.current) {
      playerRef.current.seekTo(currentTimestamp, true);
    }
  }, [currentTimestamp]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => setCurrentScreen('pantry')} style={styles.navLink}>
          <Text style={styles.navText}>PANTRY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('timers')} style={styles.navLink}>
          <Text style={styles.navText}>TIMERS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('nutrition')} style={styles.navLink}>
          <Text style={styles.navText}>NUTRITION</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.navLink}>
          <Text style={styles.navText}>EXIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        {videoId ? (
          <YoutubePlayer
            ref={playerRef}
            height={(width * 9) / 16}
            play={true}
            videoId={videoId}
            initialPlayerParams={{
                controls: 1,
                modestbranding: 1,
                rel: 0
            }}
          />
        ) : (
          <View style={styles.noVideo}>
            <Text style={styles.noVideoText}>Video Preview Unavailable</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.header}>
            <Text style={styles.recipeTitle}>{activeRecipe?.title?.toUpperCase() || 'RECIPE'}</Text>
            <Text style={styles.stepCounter}>STEP {stepNumber} OF {totalSteps}</Text>
        </View>

        <View style={styles.stepBox}>
            <Text style={styles.instructionText}>
                "{currentStep?.instruction}"
            </Text>
            
            {currentStep?.timer > 0 && (
                <View style={styles.miniTimer}>
                    <Text style={styles.timerText}>{Math.floor(currentStep.timer / 60)}:00</Text>
                    <Text style={styles.timerLabel}>Timer active</Text>
                </View>
            )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.voiceIndicator}>
          <View style={styles.micCircle}>
            <Text style={{ fontSize: 20 }}>🎤</Text>
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
          
          <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]} onPress={() => handleVoiceCommand('salt')}>
            <Text style={styles.buttonText}>SALT?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, isLastStep ? styles.finishButton : styles.primaryButton]} 
            onPress={() => isLastStep ? handleFinish() : handleVoiceCommand('next')}
          >
            <Text style={[styles.buttonText, { color: '#000' }]}>{isLastStep ? 'FINISH' : 'NEXT'}</Text>
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
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.xs,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  navLink: {
    padding: SPACING.sm,
  },
  navText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  videoContainer: {
    backgroundColor: '#000',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  noVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideoText: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  recipeTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  stepCounter: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  stepBox: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  instructionText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
  },
  miniTimer: {
    marginTop: SPACING.lg,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    gap: 10,
  },
  timerText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: '#000',
  },
  voiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.sm,
    borderRadius: 50,
    marginBottom: SPACING.md,
  },
  micCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  listeningText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  finishButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 11,
  },
});


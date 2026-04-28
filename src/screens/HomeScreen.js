import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { COLORS, SPACING, COMMON_STYLES } from '../theme';
import { useStore } from '../store/useStore';
import { extractRecipeFromUrl } from '../services/youtubeApi';
import { matchIngredientsWithPantry } from '../hooks/pantryLogic';
import { getPantry } from '../services/database';

export default function HomeScreen({ setCurrentScreen }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const setActiveRecipe = useStore(state => state.setActiveRecipe);

  const handleExtract = async () => {
    if (!url.trim() || !url.includes('youtube.com')) {
      Alert.alert('Invalid URL', 'Please paste a valid YouTube recipe link.');
      return;
    }

    setLoading(true);
    try {
      const recipe = await extractRecipeFromUrl(url.trim());
      const pantryStock = getPantry();
      
      const { missing } = matchIngredientsWithPantry(recipe.ingredients || [], pantryStock);

      if (missing.length > 0) {
        const missingNames = missing.map(m => m.name).join(', ');
        Alert.alert(
          'Missing Ingredients',
          `You are missing ${missing.length} items from your pantry:\n${missingNames}\n\nDo you want to continue anyway?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Cook Anyway', 
              onPress: () => {
                setActiveRecipe(recipe);
                setUrl('');
                Toast.show({ type: 'success', text1: 'Recipe Ready!', text2: 'Voice control is now active.' });
              } 
            }
          ]
        );
      } else {
        setActiveRecipe(recipe);
        setUrl('');
        Toast.show({
          type: 'success',
          text1: 'Recipe Ready!',
          text2: 'Voice control is now active.',
        });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.instructionText}>Paste Recipe URL</Text>
        
        <TextInput
          style={styles.urlInput}
          placeholder="https://youtube.com/watch?v=..."
          placeholderTextColor="#666"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={[styles.button, styles.primaryButton, { width: 200, marginTop: 20 }]} 
          onPress={handleExtract}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#000" /> : <Text style={[styles.buttonText, { color: '#000' }]}>EXTRACT RECIPE</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { width: 200, marginTop: 20 }]} 
          onPress={() => setCurrentScreen('pantry')}
        >
          <Text style={styles.buttonText}>MANAGE PANTRY</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1 }]} 
            onPress={() => setCurrentScreen('timers')}
          >
            <Text style={styles.buttonText}>TIMERS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1 }]} 
            onPress={() => setCurrentScreen('nutrition')}
          >
            <Text style={styles.buttonText}>NUTRITION</Text>
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  instructionText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  urlInput: {
    width: '90%',
    backgroundColor: '#111',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: SPACING.md,
  },
  button: {
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.card,
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


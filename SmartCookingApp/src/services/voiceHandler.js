import * as Speech from 'expo-speech';

/**
 * VOICE SERVICE
 * Handles reading instructions aloud to the user.
 */

export const speakInstruction = (text) => {
  Speech.speak(text, {
    language: 'en-US', // Can be changed to 'hi-IN' for Hindi
    pitch: 1.0,
    rate: 0.9, // Slightly slower for better clarity in the kitchen
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};

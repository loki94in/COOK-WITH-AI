import * as Speech from 'expo-speech';
import { ExpoSpeechRecognition } from 'expo-speech-recognition';

/**
 * VOICE SERVICE
 * Handles reading instructions aloud (TTS) and listening for commands (STT).
 */

// --- Text-to-Speech (TTS) ---

export const speakInstruction = (text) => {
  Speech.speak(text, {
    language: 'en-US',
    pitch: 1.0,
    rate: 0.9,
  });
};

export const stopSpeaking = () => {
  Speech.stop();
};

// --- Speech-to-Text (STT) ---

/**
 * Starts continuous listening for commands.
 * @param {Function} onCommandCallback - Called when a keyword is detected.
 */
export const startListening = async (onCommandCallback) => {
  try {
    const result = await ExpoSpeechRecognition.requestPermissionsAsync();
    if (!result.granted) {
      console.error('Microphone permission not granted');
      return;
    }

    ExpoSpeechRecognition.addListener('result', (event) => {
      const transcript = event.results[0].transcript.toLowerCase();
      console.log('Recognized:', transcript);

      // Simple keyword matching for hands-free control
      if (transcript.includes('next') || transcript.includes('forward')) {
        onCommandCallback('next');
      } else if (transcript.includes('back') || transcript.includes('previous')) {
        onCommandCallback('previous');
      } else if (transcript.includes('repeat')) {
        onCommandCallback('repeat');
      }
    });

    await ExpoSpeechRecognition.startAsync({
      lang: 'en-US',
      interimResults: true,
      continuous: true,
    });
    
    console.log('Voice recognition started...');
  } catch (error) {
    console.error('Failed to start listening:', error);
  }
};

export const stopListening = async () => {
  try {
    await ExpoSpeechRecognition.stopAsync();
    ExpoSpeechRecognition.removeAllListeners('result');
    console.log('Voice recognition stopped.');
  } catch (error) {
    console.error('Failed to stop listening:', error);
  }
};

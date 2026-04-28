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

    // Fuzzy Matching Configuration
    const commandAliases = {
      next: ['next', 'forward', 'continue', 'next step', 'go on', 'proceed'],
      previous: ['back', 'previous', 'go back', 'previous step', 'reverse'],
      repeat: ['repeat', 'say again', 'what was that', 'pardon', 'repeat that', 'again'],
      stop: ['stop', 'exit', 'quit', 'cancel', 'done', 'finish'],
      salt: ['salt', 'too much salt', 'salty', 'ruined']
    };

    ExpoSpeechRecognition.addListener('result', (event) => {
      const transcript = event.results[0].transcript.toLowerCase().trim();
      console.log('Recognized:', transcript);

      let matchedCommand = null;
      
      // 1. Exact or partial match check against aliases
      for (const [cmd, aliases] of Object.entries(commandAliases)) {
        if (aliases.some(alias => transcript.includes(alias) || alias.includes(transcript))) {
          matchedCommand = cmd;
          break;
        }
      }

      // 2. Execute command if found
      if (matchedCommand) {
        console.log(`Matched Voice Command: [${matchedCommand}] from transcript: "${transcript}"`);
        onCommandCallback(matchedCommand);
      } else {
        console.log(`No command matched for transcript: "${transcript}"`);
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

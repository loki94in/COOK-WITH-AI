import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { speakInstruction, stopSpeaking, startListening, stopListening } from '../services/voiceHandler';

/**
 * USE COOKING HOOK
 * Coordinates voice commands, timers, and state during cooking.
 */
export const useCooking = () => {
  const { 
    activeRecipe, 
    currentStepIndex, 
    nextStep, 
    prevStep, 
    exitCooking 
  } = useStore();

  const currentStep = activeRecipe?.steps[currentStepIndex];

  // Automatically speak the instruction when the step changes
  useEffect(() => {
    if (currentStep) {
      stopSpeaking();
      speakInstruction(currentStep.instruction);
    }
  }, [currentStepIndex, activeRecipe]);

  // Start continuous listening when cooking starts
  useEffect(() => {
    if (activeRecipe) {
      startListening(handleVoiceCommand);
    }
    return () => {
      stopListening();
    };
  }, [activeRecipe]);

  // Logic to handle voice commands (Mock implementation)
  const handleVoiceCommand = (command) => {
    try {
      const cmd = command.toLowerCase();
      
      if (cmd.includes('next')) {
        nextStep();
      } else if (cmd.includes('previous') || cmd.includes('back')) {
        prevStep();
      } else if (cmd.includes('repeat')) {
        speakInstruction(currentStep?.instruction);
      } else if (cmd.includes('exit') || cmd.includes('stop')) {
        exitCooking();
      } else {
        console.log('Command not recognized:', command);
      }
    } catch (error) {
      console.error('Voice Command Error:', error);
    }
  };

  return {
    currentStep,
    stepNumber: currentStepIndex + 1,
    totalSteps: activeRecipe?.steps.length || 0,
    handleVoiceCommand,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === (activeRecipe?.steps.length || 0) - 1,
  };
};

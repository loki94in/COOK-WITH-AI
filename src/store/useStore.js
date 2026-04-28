import { create } from 'zustand';

/**
 * STATE MANAGEMENT (ZUSTAND)
 * Handles the global state for the active recipe, navigation, and pantry.
 */
export const useStore = create((set, get) => ({
  // --- RECIPE STATE ---
  activeRecipe: null,
  currentStepIndex: 0,
  isCooking: false,

  // --- PANTRY STATE ---
  pantryItems: [],

  // --- ACTIONS ---
  
  // Set the current recipe and reset progress
  setActiveRecipe: (recipe) => set({ 
    activeRecipe: recipe, 
    currentStepIndex: 0, 
    isCooking: true 
  }),

  // Navigation: Go to next step with validation
  nextStep: () => {
    const { activeRecipe, currentStepIndex } = get();
    if (activeRecipe && currentStepIndex < activeRecipe.steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  // Navigation: Go to previous step
  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  // Update pantry list
  setPantry: (items) => set({ pantryItems: items }),

  // End cooking session
  exitCooking: () => set({ isCooking: false, activeRecipe: null, currentStepIndex: 0 }),
}));

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from './src/theme';
import { initDatabase } from './src/services/database';
import { useStore } from './src/store/useStore';
import PantryScreen from './src/screens/PantryScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import TimersScreen from './src/screens/TimersScreen';
import EmergencyFixScreen from './src/screens/EmergencyFixScreen';
import HomeScreen from './src/screens/HomeScreen';
import CookingModeScreen from './src/screens/CookingModeScreen';
import Toast from 'react-native-toast-message';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [mistakeType, setMistakeType] = useState(null);

  const isCooking = useStore(state => state.isCooking);

  useEffect(() => {
    initDatabase();
  }, []);

  if (currentScreen === 'pantry') {
    return (
      <>
        <PantryScreen onBack={() => setCurrentScreen('home')} />
        <Toast />
      </>
    );
  }

  if (currentScreen === 'nutrition') {
    return (
      <>
        <NutritionScreen onBack={() => setCurrentScreen('home')} />
        <Toast />
      </>
    );
  }

  if (currentScreen === 'timers') {
    return (
      <>
        <TimersScreen onBack={() => setCurrentScreen('home')} />
        <Toast />
      </>
    );
  }

  if (currentScreen === 'emergency') {
    return (
      <>
        <EmergencyFixScreen 
          mistakeType={mistakeType} 
          onBack={() => setCurrentScreen('home')} 
        />
        <Toast />
      </>
    );
  }

  if (!isCooking) {
    return <HomeScreen setCurrentScreen={setCurrentScreen} />;
  }

  return (
    <CookingModeScreen 
      onMistake={(type) => {
        setMistakeType(type);
        setCurrentScreen('emergency');
      }} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});


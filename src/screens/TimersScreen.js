import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SPACING, COMMON_STYLES } from '../theme';
import { useStore } from '../store/useStore';

export default function TimersScreen({ onBack }) {
  const activeRecipe = useStore(state => state.activeRecipe);
  const [timers, setTimers] = useState([]);

  // Load timers from recipe on mount
  useEffect(() => {
    if (activeRecipe && activeRecipe.steps) {
      const recipeTimers = activeRecipe.steps
        .filter(step => step.timer && step.timer > 0)
        .map((step, idx) => ({
          id: `step-${idx}`,
          name: `Step ${idx + 1} Timer`,
          duration: step.timer,
          remaining: step.timer,
          isRunning: false
        }));
      setTimers(recipeTimers);
    }
  }, [activeRecipe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(t => {
        if (t.isRunning && t.remaining > 0) {
          return { ...t, remaining: t.remaining - 1 };
        }
        return t;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, isRunning: !t.isRunning } : t));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>KITCHEN TIMERS</Text>
        <TouchableOpacity>
          <Text style={styles.addBtn}>+ NEW</Text>
        </TouchableOpacity>
      </View>

      {!activeRecipe && (
        <View style={{ padding: SPACING.xl, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textSecondary, textAlign: 'center' }}>
            No active recipe. Timers will appear here automatically when you start cooking!
          </Text>
        </View>
      )}

      {activeRecipe && timers.length === 0 && (
        <View style={{ padding: SPACING.xl, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textSecondary, textAlign: 'center' }}>
            This recipe has no step-by-step timers.
          </Text>
        </View>
      )}

      <FlatList
        data={timers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.timerCard, COMMON_STYLES.card]}>
            <View>
              <Text style={styles.timerName}>{item.name}</Text>
              <Text style={styles.timerVal}>{formatTime(item.remaining)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.actionBtn, { borderColor: item.isRunning ? COLORS.error : COLORS.primary }]} 
              onPress={() => toggleTimer(item.id)}
            >
              <Text style={{ color: item.isRunning ? COLORS.error : COLORS.primary, fontWeight: 'bold' }}>
                {item.isRunning ? 'PAUSE' : 'START'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
  },
  title: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  backBtn: { color: COLORS.primary, fontWeight: 'bold' },
  addBtn: { color: COLORS.primary, fontWeight: 'bold' },
  list: { padding: SPACING.md },
  timerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  timerName: { color: COLORS.textSecondary, fontSize: 14, textTransform: 'uppercase' },
  timerVal: { color: COLORS.text, fontSize: 32, fontWeight: 'bold' },
  actionBtn: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  }
});

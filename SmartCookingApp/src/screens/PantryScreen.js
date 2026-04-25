import React, { useState, useEffect, useCallback, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SPACING, COMMON_STYLES } from '../theme';
import { getPantry, updatePantryItem } from '../services/database';
import Toast from 'react-native-toast-message';

// PERFORMANCE: Memoized Item Component to prevent unnecessary re-renders
const PantryItem = memo(({ item }) => (
  <View style={[styles.itemCard, COMMON_STYLES.card]}>
    <View>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQty}>{item.quantity} {item.unit}</Text>
    </View>
    <View style={[styles.statusBadge, { backgroundColor: item.status === 'Missing' ? COLORS.error : COLORS.success }]}>
      <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
    </View>
  </View>
));

export default function PantryScreen({ onBack }) {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'pcs' });

  const loadPantry = useCallback(() => {
    try {
      const data = getPantry();
      setItems(data);
    } catch (error) {
      console.error('Error loading pantry:', error);
    }
  }, []);

  useEffect(() => {
    loadPantry();
  }, [loadPantry]);

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;

    try {
      const item = {
        id: Date.now().toString(),
        name: newItem.name.trim(),
        quantity: parseFloat(newItem.quantity) || 0,
        unit: newItem.unit.trim() || 'pcs',
        status: (parseFloat(newItem.quantity) || 0) > 0 ? 'In Stock' : 'Missing'
      };

      updatePantryItem(item);
      setModalVisible(false);
      setNewItem({ name: '', quantity: '', unit: 'pcs' });
      loadPantry();
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `${item.name} added to pantry!`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack} 
          accessibilityLabel="Back to Home"
          accessibilityRole="button"
        >
          <Text style={styles.backBtn}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY PANTRY</Text>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Add New Ingredient"
          accessibilityRole="button"
        >
          <Text style={styles.addBtn}>+ ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PantryItem item={item} />}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true} // PERFORMANCE: Offscreen items are unmounted
        ListEmptyComponent={<Text style={styles.emptyText}>No ingredients found.</Text>}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, COMMON_STYLES.card]}>
            <Text style={styles.modalTitle}>New Ingredient</Text>
            <TextInput
              style={styles.input}
              placeholder="Name (e.g. Tomato)"
              placeholderTextColor="#777"
              value={newItem.name}
              onChangeText={(text) => setNewItem({...newItem, name: text})}
              autoFocus
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Qty"
                keyboardType="numeric"
                value={newItem.quantity}
                onChangeText={(text) => setNewItem({...newItem, quantity: text})}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Unit"
                value={newItem.unit}
                onChangeText={(text) => setNewItem({...newItem, unit: text})}
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveBtn, COMMON_STYLES.button]} onPress={handleAddItem}>
                <Text style={styles.btnText}>SAVE ITEM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  title: { color: COLORS.text, fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  backBtn: { color: COLORS.primary, fontWeight: 'bold' },
  addBtn: { color: COLORS.primary, fontWeight: 'bold' },
  list: { padding: SPACING.md },
  itemCard: {
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  itemQty: { color: COLORS.textSecondary, fontSize: 14, marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 100 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { padding: SPACING.lg },
  modalTitle: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  row: { flexDirection: 'row', gap: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 },
  cancelBtn: { marginRight: 20 },
  cancelText: { color: COLORS.textSecondary, fontWeight: 'bold' },
  saveBtn: { backgroundColor: COLORS.primary, minWidth: 120 },
  btnText: { color: '#000', fontWeight: 'bold' },
});

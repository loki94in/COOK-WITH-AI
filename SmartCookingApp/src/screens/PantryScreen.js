import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { COLORS, SPACING } from '../theme';
import { getPantry, updatePantryItem } from '../services/database';

export default function PantryScreen({ onBack }) {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'pcs' });

  // Load pantry from SQLite
  const loadPantry = () => {
    try {
      const data = getPantry();
      setItems(data);
    } catch (error) {
      console.error('Error loading pantry:', error);
    }
  };

  useEffect(() => {
    loadPantry();
  }, []);

  // Handle adding a new item
  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      Alert.alert('Error', 'Ingredient name is required');
      return;
    }

    try {
      const item = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItem.name,
        quantity: parseFloat(newItem.quantity) || 0,
        unit: newItem.unit,
        status: 'In Stock'
      };

      updatePantryItem(item);
      setModalVisible(false);
      setNewItem({ name: '', quantity: '', unit: 'pcs' });
      loadPantry(); // Refresh list
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQty}>{item.quantity} {item.unit}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.status === 'Missing' ? COLORS.error : COLORS.success }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY PANTRY</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtn}>+ ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Your pantry is empty. Add some ingredients!</Text>}
      />

      {/* ADD ITEM MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name (e.g. Onion)"
              placeholderTextColor="#777"
              value={newItem.name}
              onChangeText={(text) => setNewItem({...newItem, name: text})}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Qty"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={newItem.quantity}
                onChangeText={(text) => setNewItem({...newItem, quantity: text})}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Unit (kg, g, pcs)"
                placeholderTextColor="#777"
                value={newItem.unit}
                onChangeText={(text) => setNewItem({...newItem, unit: text})}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddItem}>
                <Text style={styles.btnText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  itemCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
  itemQty: { color: COLORS.textSecondary, fontSize: 14 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 50 },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.card, padding: 20, borderRadius: 20 },
  modalTitle: { color: COLORS.primary, fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancelBtn: { padding: 12 },
  saveBtn: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 8, minWidth: 80, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

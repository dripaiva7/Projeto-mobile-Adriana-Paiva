import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddModal({ visible, onClose, onSelectType }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#2C3E21" />
          </TouchableOpacity>

          <Text style={styles.modalTitulo}>ADICIONAR</Text>

          <TouchableOpacity 
            style={styles.modalCardOpcao} 
            onPress={() => onSelectType('tarefa')}
          >
            <Text style={styles.modalOpcaoTitulo}>NOVA TAREFA</Text>
            <Text style={styles.modalOpcaoSub}>Algo pontual para um dia específico.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modalCardOpcao} 
            onPress={() => onSelectType('habito')}
          >
            <Text style={styles.modalOpcaoTitulo}>NOVO HÁBITO</Text>
            <Text style={styles.modalOpcaoSub}>Algo que você deseja repetir.</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FDFBF7',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E21',
    marginBottom: 20,
    letterSpacing: 1,
  },
  modalCardOpcao: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E6CCB2',
  },
  modalOpcaoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E21',
    marginBottom: 4,
  },
  modalOpcaoSub: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AddModal from './componentes/modal-home';
import Saudacao from './componentes/Saudacao';
import SeletorDias from './componentes/SeletorDias';

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Saudacao />
          </View>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarFoto} />
          </View>
        </View>

        {/* Seletor de Dias da Semana */}
        <SeletorDias />

        <Text style={styles.secaoTitulo}>MEU DAILY DE HOJE:</Text>

        {/* Lista de Hábitos em Cards */}
        <View style={styles.tarefaWrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxChecked}>
              <Feather name="check" size={14} color="#556B2F" />
            </View>
          </View>
          <View style={styles.cardTarefa}>
            <View style={[styles.iconeBox, { backgroundColor: '#E1F0F7' }]}>
              <Ionicons name="water-outline" size={22} color="#3498DB" />
            </View>
            <View>
              <Text style={styles.tarefaTitulo}>08:00 - Beber Água</Text>
              <Text style={styles.tarefaSub}>200 ml</Text>
            </View>
          </View>
        </View>

        <View style={styles.tarefaWrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxChecked}>
              <Feather name="check" size={14} color="#556B2F" />
            </View>
          </View>
          <View style={styles.cardTarefa}>
            <View style={[styles.iconeBox, { backgroundColor: '#FADBD8' }]}>
              <MaterialCommunityIcons name="office-building" size={22} color="#C0392B" />
            </View>
            <View>
              <Text style={styles.tarefaTitulo}>09:00 - Reunião</Text>
              <Text style={styles.tarefaSub}>200 ml</Text>
            </View>
          </View>
        </View>

        <View style={styles.tarefaWrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxUnchecked} />
          </View>
          <View style={styles.cardTarefa}>
            <View style={[styles.iconeBox, { backgroundColor: '#FCE4D6' }]}>
              <Feather name="home" size={22} color="#E67E22" />
            </View>
            <View>
              <Text style={styles.tarefaTitulo}>10:00 - Faxina</Text>
              <Text style={styles.tarefaSub}>Cozinha</Text>
            </View>
          </View>
        </View>

        <View style={styles.tarefaWrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxUnchecked} />
          </View>
          <View style={styles.cardTarefa}>
            <View style={[styles.iconeBox, { backgroundColor: '#D4EFDF' }]}>
              <Ionicons name="heart-outline" size={22} color="#27AE60" />
            </View>
            <View>
              <Text style={styles.tarefaTitulo}>12:00 - Almoço</Text>
              <Text style={styles.tarefaSub}>Comer Salada e 120g de proteína</Text>
            </View>
          </View>
        </View>

        <View style={styles.tarefaWrapper}>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxUnchecked} />
          </View>
          <View style={styles.cardTarefa}>
            <View style={[styles.iconeBox, { backgroundColor: '#EBDEF0' }]}>
              <Ionicons name="book-outline" size={22} color="#8E44AD" />
            </View>
            <View>
              <Text style={styles.tarefaTitulo}>14:00 - Estudar</Text>
              <Text style={styles.tarefaSub}>2 horas</Text>
            </View>
          </View>
        </View>

        {/* Botão de Adicionar Flutuante */}
        <TouchableOpacity style={styles.botaoAdicionarFlutuante} 
            onPress={() => setModalVisible(true)}>
                <Text style={styles.sinalMais}>+</Text>
        </TouchableOpacity>

        <Text style={styles.secaoTituloProgresso}>MEU PROGRESSO:</Text>

        {/* Barra de Progresso */}
        <View style={styles.progressoBarraFundo}>
          <View style={styles.progressoBarraPreenchida} />
          <Text style={styles.progressoTextoPorcentagem}>30%</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <AddModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={(tipo) => {
          setModalVisible(false);
          console.log('Tipo selecionado:', tipo);
        }}
      />

      {/* Menu Inferior */}
      <View style={styles.menu}>
        <TouchableOpacity>
          <Ionicons name="home" size={26} color="#D4A373" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="calendar" size={26} color="#D4A373" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="user" size={26} color="#D4A373" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    paddingTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#D4A373',
    borderRadius: 25,
    padding: 2,
  },
  avatarFoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
  },
  secaoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E21',
    marginBottom: 12,
  },
  secaoTituloProgresso: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E21',
    marginTop: 15,
    marginBottom: 10,
  },
  tarefaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkboxChecked: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7F8C8D',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxUnchecked: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7F8C8D',
    backgroundColor: 'transparent',
  },
  cardTarefa: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  iconeBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tarefaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E21',
  },
  tarefaSub: {
    fontSize: 11,
    color: '#95A5A6',
    marginTop: 2,
  },
  botaoAdicionarFlutuante: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#D4A373',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  sinalMais: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  progressoBarraFundo: {
    height: 35,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressoBarraPreenchida: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: '#27AE60',
    borderRadius: 20,
  },
  progressoTextoPorcentagem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E21',
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
    backgroundColor: '#3B4D28',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  
  },
  containerCadastro: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tituloCadastro: {
    fontSize: 24,
    color: '#2C3E21',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  botaoCustomizado: {
    width: '100%',
    backgroundColor: '#3B4D28',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoVoltar: {
    marginTop: 12,
  },
  textoBotaoVoltar: {
    color: '#7F8C8D',
    fontSize: 14,
  },
});
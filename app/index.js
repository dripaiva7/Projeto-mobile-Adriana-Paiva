import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AddModal from '../componentes/modal-home';
import Saudacao from '../componentes/Saudacao';
import SeletorDias from '../componentes/SeletorDias';
import CardTarefa from '../componentes/CardTarefa';
import CardHabito from '../componentes/CardHabito';
import { collection, getDocs,} from 'firebase/firestore';
import { db } from '../firebaseConfig';


export default function App() {
  const router = useRouter();
  
  const [tela, setTela] = useState('inicio');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [habitos, setHabitos] = useState([]);
  const [tipoCadastro, setTipoCadastro] = useState(null);

  const buscarHabitos = async () => {

      const resultado = await getDocs(
        collection(db, 'habitos')
      );

      const listaHabitos = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setHabitos(listaHabitos);
      console.log('Hábitos carregados do Firestore:', listaHabitos);

      const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

      const hoje = new Date();

      const diaAtual = diasDaSemana[hoje.getDay()];

      const habitosDeHoje = listaHabitos.filter((habito) =>
        habito.dias.includes(diaAtual)
      );

      
setHabitos(habitosDeHoje);

      console.log('Dia atual:', diaAtual);
      console.log('Hábitos de hoje:', habitosDeHoje);
    };

    const buscarTarefas = async () => {

    const resultado = await getDocs(
      collection(db, 'tarefas')
    );

    const listaTarefas = resultado.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));

    console.log(
      'Tarefas carregadas do Firestore:',
      listaTarefas
    );

    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    const dataHoje = `${dia}/${mes}/${ano}`;

    const tarefasDeHoje = listaTarefas.filter(
      (tarefa) => tarefa.data === dataHoje
    );

    console.log('Data de hoje:', dataHoje);
    console.log('Tarefas de hoje:', tarefasDeHoje);

    setTarefas(tarefasDeHoje);
  };

    useFocusEffect(
      React.useCallback(() => {
        buscarHabitos();
        buscarTarefas();
      }, [])
    );

    const itensDeHoje = [
      ...habitos.map((habito) => ({
        ...habito,
        tipo: 'habito',
      })),

      ...tarefas.map((tarefa) => ({
        ...tarefa,
        tipo: 'tarefa',
      })),
    ].sort((a, b) =>
      a.horario.localeCompare(b.horario)
    );
      
  return (
    <View  style={[styles.container]}>
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

        {/* Lista de Hábitos em Cards */}

        <Text style={styles.secaoTitulo}>MEU DAILY DE HOJE:</Text>
          {itensDeHoje.map((item) =>
            item.tipo === 'habito' ? (
              <CardHabito
                key={item.id}
                item={item}
              />
            ) : (
              <CardTarefa
                key={item.id}
                item={item}
                onExcluir={(id) => {
                  setTarefas((tarefasAtuais) =>
                    tarefasAtuais.filter(
                      (tarefa) => tarefa.id !== id
                    )
                  );
                }}
              />
            )
          )}
          

         <Text style={styles.secaoTituloProgresso}>MEU PROGRESSO:</Text>

        {/* Barra de Progresso */}
        <View style={styles.progressoBarraFundo}>
          <View style={styles.progressoBarraPreenchida} />
          <Text style={styles.progressoTextoPorcentagem}>30%</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botão de Adicionar Flutuante */}
        <TouchableOpacity style={styles.botaoAdicionarFlutuante} 
            onPress={() => setModalVisible(true)}>
                <Text style={styles.sinalMais}>+</Text>
        </TouchableOpacity>

      <AddModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={(tipo) => {
          setModalVisible(false);

          if (tipo === 'tarefa') {
            router.push('/cadastroTarefa');
          }
          if (tipo === 'habito') {
            router.push('/categoriaHabito');
          }
        }}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    paddingTop: 60,
    paddingBottom: 50,
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
    fontFamily: 'Iowan Old Style',
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
    bottom: 80,
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
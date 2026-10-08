import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,  Keyboard,
  TouchableWithoutFeedback, Alert, ScrollView} from 'react-native';

import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarioData from '../componentes/CalendarioData';
import { collection, addDoc,} from 'firebase/firestore';

import { db } from '../firebaseConfig';

export default function CadastroTarefa() {

  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [data, setData] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  const [horario, setHorario] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());
  const [mostrarHorario, setMostrarHorario] = useState(false);

  const scrollViewRef = useRef(null);

  const salvarTarefa = async () => {
  if (!titulo || !descricao || !data) {
    Alert.alert(
      'Atenção',
      'Preencha o título, a descrição e a data da tarefa.'
    );
    return;
  }

  const novaTarefa = {
    titulo: titulo,
    descricao: descricao,
    data: data,
    horario: horario,
  };

    await addDoc(
      collection(db, 'tarefas'),
      novaTarefa
    );

    console.log('Nova tarefa salva:', novaTarefa);

    Alert.alert(
      'Sucesso!',
      'Sua tarefa foi cadastrada.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (

  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
      >

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.tituloPagina}>
          NOVA TAREFA:
        </Text>

      </View>

      {/* Título */}
      <Text style={styles.label}>
        TÍTULO:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* Descrição */}
      <Text style={styles.label}>
        DESCRIÇÃO:
      </Text>

      <TextInput
        style={styles.inputDescricao}
        placeholder="Digite uma descrição"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* Data */}

      <Text style={styles.label}>
        DATA:
      </Text>

      <TouchableOpacity
        style={styles.inputData}
        onPress={() => setMostrarData(true)}
      >
        <Text style={styles.textoCampo}>
          {data || 'Selecione uma data'}
        </Text>
      </TouchableOpacity>

      <CalendarioData
        visible={mostrarData}
        onClose={() => setMostrarData(false)}
        onConfirmar={(novaData) => {

          setDataSelecionada(novaData);

          const dia = String(
            novaData.getDate()
          ).padStart(2, '0');

          const mes = String(
            novaData.getMonth() + 1
          ).padStart(2, '0');

          const ano = novaData.getFullYear();

          setData(`${dia}/${mes}/${ano}`);

          setMostrarData(false);
        }}
      />

      {/* Horário */}

    <Text style={styles.label}>
      HORÁRIO: <Text style={styles.opcional}>(Opcional)</Text>
    </Text>

    <TouchableOpacity
      style={styles.inputHorario}
      onPress={() => {
        setMostrarHorario(true);

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({
            animated: true,
          });
        }, 100);
      }}
    >
      <Text style={styles.textoCampo}>
        {horario || 'Selecione um horário'}
      </Text>
    </TouchableOpacity>

    {mostrarHorario && (
      <View style={styles.containerHorario}>

        <DateTimePicker
          value={horarioSelecionado}
          mode="time"
          display="spinner"
          onChange={(_, time) => {
            if (time) {
              setHorarioSelecionado(time);

              const hora = String(time.getHours()).padStart(2, '0');
              const minuto = String(time.getMinutes()).padStart(2, '0');

              setHorario(`${hora}:${minuto}`);
            }
          }}
        />

        <TouchableOpacity
          style={styles.botaoOkHorario}
          onPress={() => setMostrarHorario(false)}
        >
          <Text style={styles.confirmarHorario}>
            OK
          </Text>
        </TouchableOpacity>

      </View>
    )}

      {/* Botão salvar */}
      <TouchableOpacity
      style={styles.botaoSalvar}
      onPress={salvarTarefa}
    >
      <Text style={styles.textoSalvar}>
        SALVAR
      </Text>
    </TouchableOpacity>

        </ScrollView>
        
        </View>
      </TouchableWithoutFeedback>
      );
    }

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FDF6EA',
    paddingHorizontal: 21,
    paddingTop: 80,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  voltar: {
    fontSize: 30,
    color: '#2C3E21',
    marginRight: 45,
  },

  tituloPagina: {
    fontSize: 24,
    color: '#2C3E21',
    letterSpacing: 0.5,
    fontFamily: 'Iowan Old Style',
    
  },

  label: {
    fontSize: 16,
    color: '#2C3E21',
    marginBottom: 5,
    marginLeft: 1,
    fontWeight: '500',
  },

  input: {
    height: 38,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 18,
    paddingHorizontal: 14,
    fontSize: 12,
    color: '#2C3E21',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },

  inputDescricao: {
    height: 50,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingTop: 10,
    fontSize: 12,
    color: '#2C3E21',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },

  inputData: {
  width: 150,
  height: 36,
  borderWidth: 1,
  borderColor: '#999999',
  borderRadius: 18,
  justifyContent: 'center',
  paddingHorizontal: 12,
  marginBottom: 12,
  backgroundColor: '#FFFFFF',
},

  inputHorario: {
    width: 150,
    height: 36,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },

  textoCampo: {
    fontSize: 12,
    color: '#2C3E21',
  },

  opcional: {
    color: '#999999',
    fontWeight: 'normal',
  },

  botaoSalvar: {
    width: 200,
    height: 60,
    backgroundColor: '#3B4D28',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 135,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  textoSalvar: {
    color: '#E6CCB2',
    fontSize: 20,
    letterSpacing: 0.5,
    fontFamily: 'Iowan Old Style',
  },

});
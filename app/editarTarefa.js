
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarioData from '../componentes/CalendarioData';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '../firebaseConfig';

export default function EditarTarefa() {
  const router = useRouter();
  const { tarefaId } = useLocalSearchParams();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [data, setData] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  const [horario, setHorario] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());
  const [mostrarHorario, setMostrarHorario] = useState(false);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const scrollViewRef = useRef(null);

  // Carregar tarefa existente
  useEffect(() => {
    const carregarTarefa = async () => {
      try {
        const id = Array.isArray(tarefaId) ? tarefaId[0] : tarefaId;

        if (!id) {
          Alert.alert('Erro', 'Tarefa não encontrada.');
          router.back();
          return;
        }

        const referencia = doc(db, 'tarefas', id);
        const resultado = await getDoc(referencia);

        if (!resultado.exists()) {
          Alert.alert('Erro', 'Esta tarefa não existe mais.');
          router.back();
          return;
        }

        const dados = resultado.data();

        setTitulo(dados.titulo || '');
        setDescricao(dados.descricao || '');
        setData(dados.data || '');
        setHorario(dados.horario || '');

        if (dados.data) {
          const [dia, mes, ano] = dados.data.split('/').map(Number);
          setDataSelecionada(new Date(ano, mes - 1, dia));
        }

        if (dados.horario) {
          const [hora, minuto] = dados.horario.split(':').map(Number);

          const dataHorario = new Date();
          dataHorario.setHours(hora, minuto, 0, 0);

          setHorarioSelecionado(dataHorario);
        }

      } catch (error) {
        console.log('Erro ao carregar tarefa:', error);
        Alert.alert('Erro', 'Não foi possível carregar a tarefa.');
        router.back();
      } finally {
        setCarregando(false);
      }
    };

    carregarTarefa();
  }, [tarefaId]);

  // Atualizar tarefa
  const salvarTarefa = async () => {
    if (!titulo.trim() || !descricao.trim() || !data) {
      Alert.alert(
        'Atenção',
        'Preencha o título, a descrição e a data da tarefa.'
      );
      return;
    }

    try {
      setSalvando(true);

      const id = Array.isArray(tarefaId) ? tarefaId[0] : tarefaId;

      await updateDoc(doc(db, 'tarefas', id), {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        data,
        horario,
      });

      Alert.alert(
        'Sucesso!',
        'Sua tarefa foi atualizada.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );

    } catch (error) {
      console.log('Erro ao atualizar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#40543B" />
      </View>
    );
  }

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
              EDITAR TAREFA:
            </Text>
          </View>

          {/* Título */}
          <Text style={styles.label}>TÍTULO:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            value={titulo}
            onChangeText={setTitulo}
          />

          {/* Descrição */}
          <Text style={styles.label}>DESCRIÇÃO:</Text>

          <TextInput
            style={styles.inputDescricao}
            placeholder="Digite uma descrição"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* Data */}
          <Text style={styles.label}>DATA:</Text>

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

              const dia = String(novaData.getDate()).padStart(2, '0');
              const mes = String(novaData.getMonth() + 1).padStart(2, '0');
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
                <Text style={styles.confirmarHorario}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {horario !== '' && (
            <TouchableOpacity
              onPress={() => setHorario('')}
              style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              <Text style={styles.confirmarHorario}>
                Remover horário
              </Text>
            </TouchableOpacity>
          )}

          {/* Atualizar */}
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvarTarefa}
            disabled={salvando}
          >
            <Text style={styles.textoSalvar}>
              {salvando ? 'ATUALIZANDO...' : 'ATUALIZAR'}
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

  containerCarregando: {
    flex: 1,
    backgroundColor: '#FDF6EA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContainer: {
    paddingBottom: 30,
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

  containerHorario: {
    alignItems: 'center',
    marginTop: 10,
  },

  botaoOkHorario: {
    marginTop: 8,
  },

  confirmarHorario: {
    fontSize: 15,
    color: '#40543B',
    fontWeight: 'bold',
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

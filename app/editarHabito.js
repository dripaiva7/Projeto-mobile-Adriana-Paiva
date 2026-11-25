
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, Alert, ScrollView, ActivityIndicator
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '../firebaseConfig';

export default function EditarHabito() {
  const router = useRouter();
  const { habitoId } = useLocalSearchParams();

  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [todosDias, setTodosDias] = useState(false);

  const [horario, setHorario] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());
  const [mostrarHorario, setMostrarHorario] = useState(false);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const scrollViewRef = useRef(null);

  const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  // Carregar dados do hábito
  useEffect(() => {
    const carregarHabito = async () => {
      try {
        const id = Array.isArray(habitoId) ? habitoId[0] : habitoId;

        if (!id) {
          Alert.alert('Erro', 'Hábito não encontrado.');
          router.back();
          return;
        }

        const referencia = doc(db, 'habitos', id);
        const resultado = await getDoc(referencia);

        if (!resultado.exists()) {
          Alert.alert('Erro', 'Este hábito não existe mais.');
          router.back();
          return;
        }

        const dados = resultado.data();

        setCategoria(dados.categoria || '');
        setTitulo(dados.titulo || '');
        setDescricao(dados.descricao || '');

        const dias = dados.dias || [];
        setDiasSelecionados(dias);
        setTodosDias(dias.length === 7);

        setHorario(dados.horario || '');

        if (dados.horario) {
          const [hora, minuto] = dados.horario.split(':').map(Number);

          const dataHorario = new Date();
          dataHorario.setHours(hora, minuto, 0, 0);

          setHorarioSelecionado(dataHorario);
        }

      } catch (error) {
        console.log('Erro ao carregar hábito:', error);
        Alert.alert('Erro', 'Não foi possível carregar o hábito.');
        router.back();
      } finally {
        setCarregando(false);
      }
    };

    carregarHabito();
  }, [habitoId]);

  // Selecionar dias
  const todosDia = (dia) => {
    let novosDias;

    if (diasSelecionados.includes(dia)) {
      novosDias = diasSelecionados.filter(d => d !== dia);
    } else {
      novosDias = [...diasSelecionados, dia];
    }

    setDiasSelecionados(novosDias);
    setTodosDias(novosDias.length === diasDaSemana.length);
  };

  // Atualizar hábito
  const salvarHabito = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Preencha o título e a descrição do hábito.');
      return;
    }

    if (diasSelecionados.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um dia da semana.');
      return;
    }

    try {
      setSalvando(true);

      const id = Array.isArray(habitoId) ? habitoId[0] : habitoId;

      await updateDoc(doc(db, 'habitos', id), {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        dias: diasSelecionados,
        horario: horario,
      });

      Alert.alert(
        'Sucesso!',
        'Seu hábito foi atualizado.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );

    } catch (error) {
      console.log('Erro ao atualizar hábito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o hábito.');
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
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >

          {/* Cabeçalho */}
          <View style={styles.cabecalho}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.voltar}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.tituloPagina}>
              EDITAR HÁBITO:
            </Text>
          </View>

          {/* Categoria */}
          <Text style={styles.label}>CATEGORIA:</Text>

          <View style={styles.inputDropdown}>
            <Text style={styles.textoCampo}>{categoria}</Text>
          </View>

          {/* Título */}
          <Text style={styles.label}>TÍTULO:</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            placeholderTextColor="#A9A29A"
            value={titulo}
            onChangeText={setTitulo}
          />

          {/* Descrição */}
          <Text style={styles.label}>DESCRIÇÃO:</Text>

          <TextInput
            style={styles.inputDescricao}
            placeholder="Digite uma descrição"
            multiline
            placeholderTextColor="#A9A29A"
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* Frequência */}
          <Text style={styles.label}>
            FREQUÊNCIA: <Text style={styles.opcional}>(quais dias?)</Text>
          </Text>

          <View style={styles.containerDias}>
            {diasDaSemana.map((dia) => {
              const selecionado = diasSelecionados.includes(dia);

              return (
                <TouchableOpacity
                  key={dia}
                  style={[
                    styles.circuloDia,
                    selecionado && styles.circuloDiaSelecionado
                  ]}
                  onPress={() => todosDia(dia)}
                >
                  <Text
                    style={[
                      styles.textoDia,
                      selecionado && styles.textoDiaSelecionado
                    ]}
                  >
                    {dia}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Todos os dias */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => {
              const novoValor = !todosDias;

              setTodosDias(novoValor);
              setDiasSelecionados(
                novoValor ? diasDaSemana : []
              );
            }}
          >
            <View style={styles.checkbox}>
              {todosDias && (
                <Text style={styles.checkTexto}>✓</Text>
              )}
            </View>

            <Text style={styles.textoCampo}>Todos os dias</Text>
          </TouchableOpacity>

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

            <Text style={styles.iconeSeta}>⌄</Text>
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
                onPress={() => setMostrarHorario(false)}
              >
                <Text style={styles.confirmarHorario}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Remover horário */}
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
            onPress={salvarHabito}
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
    borderColor: '#D4C3B3',
    borderRadius: 18,
    paddingHorizontal: 14,
    fontSize: 12,
    color: '#2C3E21',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  inputDropdown: {
    height: 38,
    borderWidth: 1,
    borderColor: '#D4C3B3',
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#E5E5E5',
  },
  inputDescricao: {
    height: 60,
    borderWidth: 1,
    borderColor: '#D4C3B3',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingTop: 8,
    fontSize: 13,
    color: '#2C3E21',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  inputHorario: {
    height: 38,
    borderWidth: 1,
    borderColor: '#D4C3B3',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  containerDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  circuloDia: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4C3B3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  circuloDiaSelecionado: {
    backgroundColor: '#E6CCB2',
    borderColor: '#C2A68D',
  },
  textoDia: {
    fontSize: 10,
    color: '#2C3E21',
    fontWeight: 'bold',
  },
  textoDiaSelecionado: {
    color: '#2C3E21',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D4C3B3',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTexto: {
    color: '#3B4D28',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textoCampo: {
    fontSize: 13,
    color: '#2C3E21',
  },
  iconeSeta: {
    fontSize: 16,
    color: '#2C3E21',
  },
  opcional: {
    color: '#999999',
    fontWeight: 'normal',
    fontSize: 12,
  },
  containerHorario: {
    alignItems: 'center',
    marginTop: 10,
  },
  confirmarHorario: {
    fontSize: 15,
    color: '#40543B',
    fontWeight: 'bold',
    marginTop: 8,
  },
  botaoSalvar: {
    width: 200,
    height: 60,
    backgroundColor: '#3B4D28',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 70,
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

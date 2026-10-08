import React, { useState, useRef } from 'react';
import { 
  View,  Text, StyleSheet, TextInput, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc,} from 'firebase/firestore';

import { db } from '../firebaseConfig';


export default function CadastroHabito() {
  const router = useRouter();

  const { categoria } = useLocalSearchParams();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  
  // Frequência: dias da semana selecionados
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [todosDias, setTodosDias] = useState(false);

  const [horario, setHorario] = useState('08:00');
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const scrollViewRef = useRef(null);

  const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

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

  const salvarHabito = async () => {
  if (!titulo || !descricao) {
    Alert.alert(
      'Atenção',
      'Preencha o título e a descrição do hábito.'
    );
    return;
  }

  if (diasSelecionados.length === 0) {
    Alert.alert(
      'Atenção',
      'Selecione pelo menos um dia da semana.'
    );
    return;
  }

  const novoHabito = {
    categoria: categoria,
    titulo: titulo,
    descricao: descricao,
    dias: diasSelecionados,
    horario: horario,
  };

  await addDoc(
      collection(db, 'habitos'), novoHabito);

    console.log('Novo hábito salvo:', novoHabito);

  Alert.alert(
    'Sucesso!',
    'Seu hábito foi cadastrado.',
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
            NOVO HÁBITO:
          </Text>
        </View>

        {/* Categoria */}
        <Text style={styles.label}>
          CATEGORIA:
        </Text>
        <TouchableOpacity style={styles.inputDropdown}>
          <Text style={styles.textoCampo}>
            {categoria}
          </Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.label}>
          TÍTULO:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título"
          placeholderTextColor="#A9A29A"
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
                style={[styles.circuloDia, selecionado && styles.circuloDiaSelecionado]}
                onPress={() => todosDia(dia)}
              >
                <Text style={[styles.textoDia, selecionado && styles.textoDiaSelecionado]}>
                  {dia}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => {
            const novoValor = !todosDias;

            setTodosDias(novoValor);

            if (novoValor) {
              setDiasSelecionados(diasDaSemana);
            } else {
              setDiasSelecionados([]);
            }
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
      <Text style={styles.confirmarHorario}>
        OK
      </Text>
    </TouchableOpacity>

  </View>
)}

        {/* Botão salvar */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvarHabito}
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
  },
  checkboxMarcado: {
    backgroundColor: '#3B4D28',
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
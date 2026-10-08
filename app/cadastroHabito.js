import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,  
  Keyboard,
  TouchableWithoutFeedback, 
  Alert 
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroHabito() {
  const router = useRouter();

  const { categoria } = useLocalSearchParams();
  const [titulo, setTitulo] = useState('Beber Agua');
  const [descricao, setDescricao] = useState('2 L ao dia.');
  
  // Frequência: dias da semana selecionados
  const [diasSelecionados, setDiasSelecionados] = useState(['QUA']);
  const [todosDias, setTodosDias] = useState(false);

  const [horario, setHorario] = useState('08:00');
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());
  const [mostrarHorario, setMostrarHorario] = useState(false);

  const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const toggleDia = (dia) => {
    if (diasSelecionados.includes(dia)) {
      setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  };

  const salvarHabito = () => {
    if (!titulo || !descricao) {
      Alert.alert(
        'Atenção',
        'Preencha o título e a descrição do hábito.'
      );
      return;
    }

    const novoHabito = {
      categoria,
      titulo,
      descricao,
      frequencia: todosDias ? 'Todos os dias' : diasSelecionados,
      horario,
    };

    console.log('Novo hábito:', novoHabito);

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
          <Text style={styles.textoCampo}>💧 {categoria}</Text>
          <Text style={styles.iconeSeta}>⌄</Text>
        </TouchableOpacity>

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
                onPress={() => toggleDia(dia)}
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
          onPress={() => setTodosDias(!todosDias)}
        >
          <View style={[styles.checkbox, todosDias && styles.checkboxMarcado]} />
          <Text style={styles.textoCampo}>Todos os dias</Text>
        </TouchableOpacity>

        {/* Horário */}
        <Text style={styles.label}>
          HORÁRIO: <Text style={styles.opcional}>(Opcional)</Text>
        </Text>
        <TouchableOpacity
          style={styles.inputHorario}
          onPress={() => setMostrarHorario(true)}
        >
          <Text style={styles.textoCampo}>
            {horario || 'Selecione um horário'}
          </Text>
          <Text style={styles.iconeSeta}>⌄</Text>
        </TouchableOpacity>

        {mostrarHorario && (
          <DateTimePicker
            value={horarioSelecionado}
            mode="time"
            display="spinner"
            onChange={(_, time) => {
              setMostrarHorario(false);
              if (time) {
                setHorarioSelecionado(time);
                const hora = String(time.getHours()).padStart(2, '0');
                const minuto = String(time.getMinutes()).padStart(2, '0');
                setHorario(`${hora}:${minuto}`);
              }
            }}
          />
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

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EA',
    paddingHorizontal: 21,
    paddingTop: 60,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  voltar: {
    fontSize: 30,
    color: '#2C3E21',
    marginRight: 35,
  },
  tituloPagina: {
    fontSize: 22,
    color: '#2C3E21',
    letterSpacing: 0.5,
    fontFamily: 'serif',
  },
  label: {
    fontSize: 14,
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
    fontSize: 13,
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
    backgroundColor: '#FFFFFF',
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
  botaoSalvar: {
    width: 200,
    height: 50,
    backgroundColor: '#3B4D28',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  textoSalvar: {
    color: '#E6CCB2',
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: 'serif',
  },
});
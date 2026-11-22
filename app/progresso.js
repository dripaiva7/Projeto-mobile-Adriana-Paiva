
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebaseConfig';
import CardResumoProgresso from '../componentes/CardResumoProgresso';
import { gerarRegistrosHabitos } from '../servicos/registrosHabitos';
import CardHabitoProgresso from '../componentes/CardHabitoProgresso';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function progresso() {
  const [registros, setRegistros] = useState([]);
  const [habitos, setHabitos] = useState([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('7');
  const [registrosProntos, setRegistrosProntos] = useState(false);

  const [dataInicioPersonalizada, setDataInicioPersonalizada] = useState(new Date());
const [dataFimPersonalizada, setDataFimPersonalizada] = useState(new Date());

const [mostrarSeletorInicio, setMostrarSeletorInicio] = useState(false);
const [mostrarSeletorFim, setMostrarSeletorFim] = useState(false);

  const hoje = new Date();

const inicioPeriodo = new Date(hoje);

inicioPeriodo.setDate(
  hoje.getDate() - (Number(periodoSelecionado) - 1)
);

const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');

  return `${dia}/${mes}`;
};

  useEffect(() => {
  async function prepararRegistros() {
    try {
      // Busca os hábitos cadastrados
      const resultadoHabitos = await getDocs(
        collection(db, 'habitos')
      );

      const listaHabitos = resultadoHabitos.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setHabitos(listaHabitos);

      // Gera as ocorrências que ainda não existem
      await gerarRegistrosHabitos(listaHabitos);

      // Libera a consulta dos registros
      setRegistrosProntos(true);

    } catch (erro) {
      console.log('ERRO AO PREPARAR REGISTROS:', erro);
    }
  }

  prepararRegistros();
}, []);

useEffect(() => {
  if (!registrosProntos) return;

  async function buscarRegistrosDoPeriodo() {
    try {
      const hojeConsulta = new Date();
      hojeConsulta.setHours(0, 0, 0, 0);

      const inicio = new Date(hojeConsulta);
      inicio.setDate(
        hojeConsulta.getDate() - (Number(periodoSelecionado) - 1)
      );

      const formatarDataConsulta = (data) => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
      };

      const dataInicio = formatarDataConsulta(inicio);
      const dataFim = formatarDataConsulta(hojeConsulta);

      const consulta = query(
        collection(db, 'registrosHabitos'),
        where('data', '>=', dataInicio),
        where('data', '<=', dataFim)
      );

      const resultado = await getDocs(consulta);

      const lista = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setRegistros(lista);

      console.log(
        `REGISTROS DOS ÚLTIMOS ${periodoSelecionado} DIAS:`,
        lista
      );
    } catch (erro) {
      console.log('ERRO AO BUSCAR REGISTROS:', erro);
    }
  }

  buscarRegistrosDoPeriodo();
}, [registrosProntos, periodoSelecionado]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>MEU PROGRESSO</Text>

<View style={styles.seletorPeriodo}>
  <TouchableOpacity
    style={[
      styles.botaoPeriodo,
      periodoSelecionado === '7' && styles.botaoPeriodoAtivo,
    ]}
    onPress={() => setPeriodoSelecionado('7')}
  >
    <Text
      style={[
        styles.textoPeriodo,
        periodoSelecionado === '7' && styles.textoPeriodoAtivo,
      ]}
    >
      7 dias
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.botaoPeriodo,
      periodoSelecionado === '30' && styles.botaoPeriodoAtivo,
    ]}
    onPress={() => setPeriodoSelecionado('30')}
  >
    <Text
      style={[
        styles.textoPeriodo,
        periodoSelecionado === '30' && styles.textoPeriodoAtivo,
      ]}
    >
      30 dias
    </Text>
  </TouchableOpacity>
</View>

<CardResumoProgresso
  registros={registros}
  periodo={`${formatarData(inicioPeriodo)} a ${formatarData(hoje)}`}
  periodoDescricao={
    periodoSelecionado === '7'
      ? 'Últimos 7 dias'
      : 'Últimos 30 dias'
  }
/>

<Text style={styles.subtitulo}>Desempenho por hábito</Text>

{habitos.map((habito) => (
  <CardHabitoProgresso
    key={habito.id}
    habito={habito}
    registros={registros}
  />
))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 100,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
  },

  subtitulo: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#40543B',
  fontFamily: 'Iowan Old Style',
  marginTop: 30,
  marginBottom: 5,
},

seletorPeriodo: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 12,
  marginVertical: 16,
},

botaoPeriodo: {
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 20,
  backgroundColor: '#E6CCB2',
},

botaoPeriodoAtivo: {
  backgroundColor: '#40543B',
},

textoPeriodo: {
  color: '#40543B',
  fontWeight: '600',
},

textoPeriodoAtivo: {
  color: '#FFFFFF',
},

});

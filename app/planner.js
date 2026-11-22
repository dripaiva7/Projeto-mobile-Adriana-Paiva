import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect } from 'expo-router';
import CardTarefa from '../componentes/CardTarefa';
import CardHabito from '../componentes/CardHabito';
import {
  gerarRegistrosHabitos,
  atualizarStatusHabito,
} from '../servicos/registrosHabitos';

export default function planner() {

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(
    new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  );

  const [dataSelecionada, setDataSelecionada] = useState(hoje);
const [habitos, setHabitos] = useState([]);
const [registrosHabitos, setRegistrosHabitos] = useState([]);
const [tarefas, setTarefas] = useState([]);

const buscarHabitos = async () => {
  const resultado = await getDocs(collection(db, 'habitos'));

  const listaHabitos = resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

  await gerarRegistrosHabitos(listaHabitos);

  setHabitos(listaHabitos);

  const resultadoRegistros = await getDocs(
    collection(db, 'registrosHabitos')
  );

  const listaRegistros = resultadoRegistros.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

  setRegistrosHabitos(listaRegistros);
};

const alternarConclusaoHabito = async (id, concluido) => {
  try {
    const data = dataSelecionada;

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const dataISO = `${ano}-${mes}-${dia}`;

    await atualizarStatusHabito(id, dataISO, concluido);

  } catch (erro) {
    console.log('Erro ao atualizar conclusão do hábito:', erro);
  }
};

const excluirHabito = async (id) => {
  try {
    await deleteDoc(doc(db, 'habitos', id));

    setHabitos((habitosAtuais) =>
      habitosAtuais.filter((habito) => habito.id !== id)
    );

  } catch (erro) {
    console.log('Erro ao excluir hábito:', erro);
  }
};

const buscarTarefas = async () => {
  const resultado = await getDocs(collection(db, 'tarefas'));

  const listaTarefas = resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

  setTarefas(listaTarefas);
};

useFocusEffect(
  React.useCallback(() => {
    buscarHabitos();
    buscarTarefas();
  }, [])
);

 const mudarMes = (direcao) => {
  const novaData = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth() + direcao,
    1
  );

  setMesAtual(novaData);

  const hoje = new Date();

  if (
    novaData.getMonth() === hoje.getMonth() &&
    novaData.getFullYear() === hoje.getFullYear()
  ) {
    setDataSelecionada(hoje);
  } else {
    setDataSelecionada(novaData);
  }
};

const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const diaSelecionado = diasDaSemana[dataSelecionada.getDay()];

const habitosDoDia = habitos
  .filter((habito) => habito.dias.includes(diaSelecionado))
  .map((habito) => {
    const ano = dataSelecionada.getFullYear();
    const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
    const dia = String(dataSelecionada.getDate()).padStart(2, '0');

    const dataISO = `${ano}-${mes}-${dia}`;

    const registro = registrosHabitos.find(
      (item) =>
        item.habitoId === habito.id &&
        item.data === dataISO
    );

    console.log('CONFERÊNCIA DO HISTÓRICO:', {
  data: dataISO,
  registroEncontrado: registro,
  status: registro?.status,
});

    return {
      ...habito,
      status: registro?.status || 'pendente',
    };
  });

const dia = String(dataSelecionada.getDate()).padStart(2, '0');
const mesSelecionado = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
const anoSelecionado = dataSelecionada.getFullYear();

const dataFormatada = `${dia}/${mesSelecionado}/${anoSelecionado}`;

const tarefasDoDia = tarefas.filter(
  (tarefa) => tarefa.data === dataFormatada
);

const atividadesDoDia = [
  ...habitosDoDia.map((habito) => ({
    ...habito,
    tipo: 'habito',
  })),

  ...tarefasDoDia.map((tarefa) => ({
    ...tarefa,
    tipo: 'tarefa',
  })),
].sort((a, b) => a.horario.localeCompare(b.horario));

const ano = mesAtual.getFullYear();
const mes = mesAtual.getMonth();

const primeiroDia = new Date(ano, mes, 1).getDay();
const diasNoMes = new Date(ano, mes + 1, 0).getDate();

const nomeMes = mesAtual.toLocaleDateString('pt-BR', {
  month: 'long',
});

const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const diasMes = Array.from(
  { length: diasNoMes },
  (_, index) => index + 1
);

  return (
  <ScrollView
  style={styles.container}
  contentContainerStyle={styles.conteudo}>

    <Text style={styles.titulo}>PLANNER</Text>

    <View style={styles.cabecalhoMes}>
  <TouchableOpacity onPress={() => mudarMes(-1)}>
    <Ionicons name="chevron-back" size={24} color="#40543B" />
  </TouchableOpacity>

  <Text style={styles.nomeMes}>
    {nomeMes} {ano}
  </Text>

  <TouchableOpacity onPress={() => mudarMes(1)}>
    <Ionicons name="chevron-forward" size={24} color="#40543B" />
  </TouchableOpacity>
</View>

<View style={styles.linhaDiasSemana}>
  {diasSemana.map((dia) => (
    <Text key={dia} style={styles.textoDiaSemana}>
      {dia}
    </Text>
  ))}
</View>

<View style={styles.gradeCalendario}>
  {Array.from({ length: primeiroDia }).map((_, index) => (
    <View key={`vazio-${index}`} style={styles.celulaDia} />
  ))}

  {diasMes.map((dia) => (
    <TouchableOpacity
      key={dia}
      style={[
  styles.celulaDia,
  dataSelecionada.getDate() === dia &&
  dataSelecionada.getMonth() === mes &&
  dataSelecionada.getFullYear() === ano &&
  styles.diaSelecionado,
]}
      onPress={() =>
        setDataSelecionada(new Date(ano, mes, dia))
      }
    >
      <Text style={styles.textoDia}>{dia}</Text>
    </TouchableOpacity>
  ))}
</View>

<Text style={styles.dataSelecionada}>
  {dataSelecionada.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })}
</Text>

<Text style={styles.tituloAtividades}>
  ATIVIDADES DO DIA
</Text>

{atividadesDoDia.length === 0 ? (
  <Text style={styles.mensagemVazia}>
    Nenhuma atividade programada para este dia.
  </Text>
) : (
  atividadesDoDia.map((item) =>
    item.tipo === 'habito' ? (
      <CardHabito
      key={item.id}
      item={item}
      onAlternarConclusao={alternarConclusaoHabito}
      onExcluir={excluirHabito}
    />
    ) : (
      <CardTarefa
        key={item.id}
        item={item}
        onExcluir={(id) => {
          setTarefas((tarefasAtuais) =>
            tarefasAtuais.filter((tarefa) => tarefa.id !== id)
          );
        }}
        onAlternarConclusao={() => {}}
      />
    )
  )
)}

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
    fontFamily: 'Iowan Old Style',
    color: '#40543B',
  },

  cabecalhoMes: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 25,
  marginBottom: 20,
  paddingHorizontal: 15,
},

nomeMes: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#40543B',
  textTransform: 'capitalize',
},

linhaDiasSemana: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 10,
},

textoDiaSemana: {
  width: '14.28%',
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 'bold',
  color: '#40543B',
},

gradeCalendario: {
  flexDirection: 'row',
  flexWrap: 'wrap',
},

celulaDia: {
  width: '14.28%',
  height: 42,
  justifyContent: 'center',
  alignItems: 'center',
},

textoDia: {
  fontSize: 15,
  color: '#40543B',
},

diaSelecionado: {
  backgroundColor: '#E6CCB2',
  borderRadius: 22,
  fontFamily: 'Iowan Old Style',
},

dataSelecionada: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#40543B',
  textAlign: 'center',
  marginTop: 20,
  marginBottom: 25,
  textTransform: 'capitalize',
  fontFamily: 'Iowan Old Style',
},

tituloAtividades: {
  fontSize: 17,
  fontWeight: 'bold',
  color: '#40543B',
  marginBottom: 15,
},

mensagemVazia: {
  fontSize: 14,
  color: '#8A8A7A',
  textAlign: 'center',
  marginTop: 15,
  marginBottom: 25,
},

});
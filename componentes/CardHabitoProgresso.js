
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardHabitoProgresso({ habito, registros }) {
  const registrosDoHabito = registros.filter(
    (item) => item.habitoId === habito.id
  );

  const concluidos = registrosDoHabito.filter(
    (item) => item.status === 'concluido'
  ).length;

  const naoRealizados = registrosDoHabito.filter(
    (item) => item.status === 'nao_realizado'
  ).length;

  const total = concluidos + naoRealizados;

  const progresso = total > 0
    ? Math.round((concluidos / total) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{habito.titulo}</Text>
      <Text style={styles.categoria}>{habito.categoria}</Text>
     <View style={styles.linhaProgresso}>
  <Text style={styles.percentual}>
    {total > 0 ? `${progresso}%` : '—'}
  </Text>

  <Text style={styles.resultado}>
    {total > 0
      ? `${concluidos} de ${total} concluídos`
      : 'Sem dados ainda'}
  </Text>
</View>

<View style={styles.barraFundo}>
  <View
    style={[
      styles.barraPreenchida,
      { width: `${progresso}%` },
    ]}
  />
</View>

<Text style={styles.naoRealizados}>
  {naoRealizados} não realizados
</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
  },

  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#40543B',
  },

  categoria: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 5,
  },


  linhaProgresso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },

  percentual: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
  },

  resultado: {
    fontSize: 12,
    color: '#8A8A7A',
  },

  barraFundo: {
    height: 9,
    backgroundColor: '#E6CCB2',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },

  barraPreenchida: {
    height: '100%',
    backgroundColor: '#40543B',
    borderRadius: 10,
  },

  naoRealizados: {
    fontSize: 12,
    color: '#C47A65',
    marginTop: 10,
  },

});

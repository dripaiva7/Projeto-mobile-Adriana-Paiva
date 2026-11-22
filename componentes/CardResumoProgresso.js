
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function CardResumoProgresso({
  registros,
  periodo,
  periodoDescricao,
}) {
  const concluidos = registros.filter(
  (item) => item.status === 'concluido'
).length;

const naoRealizados = registros.filter(
  (item) => item.status === 'nao_realizado'
).length;

const totalRealizados = concluidos + naoRealizados;

const progresso = totalRealizados > 0
  ? Math.round((concluidos / totalRealizados) * 100)
  : 0;

  const raio = 65;
  const circunferencia = 2 * Math.PI * raio;

  const preenchimento = circunferencia * (1 - progresso / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo geral</Text>
      <Text style={styles.periodo}>
  {periodoDescricao} · {periodo}
</Text>

      <View style={styles.circuloContainer}>
        <Svg width={160} height={160}>
          <Circle
            cx={80}
            cy={80}
            r={raio}
            stroke="#E6CCB2"
            strokeWidth={12}
            fill="none"
          />

          <Circle
            cx={80}
            cy={80}
            r={raio}
            stroke="#40543B"
            strokeWidth={12}
            fill="none"
            strokeDasharray={circunferencia}
            strokeDashoffset={preenchimento}
            strokeLinecap="round"
            rotation="-90"
            origin="80, 80"
          />
        </Svg>

        <View style={styles.textoCentro}>
  <Text style={styles.percentual}>
    {totalRealizados > 0 ? `${progresso}%` : '—'}
  </Text>

  <Text style={styles.legenda}>
    {totalRealizados > 0 ? 'Concluído' : 'Sem dados ainda'}
  </Text>
</View>
      </View>
      <View style={styles.indicadores}>
        <View style={styles.indicador}>
          <Text style={styles.numeroIndicador}>{totalRealizados}</Text>
          <Text style={styles.legendaIndicador}>Total</Text>
        </View>

        <View style={styles.indicador}>
          <Text style={styles.numeroIndicador}>{concluidos}</Text>
          <Text style={styles.legendaIndicador}>Concluídos</Text>
        </View>

        <View style={styles.indicador}>
          <Text style={styles.numeroIndicador}>{naoRealizados}</Text>
          <Text style={styles.legendaIndicador}>Não realizados</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40543B',
    fontFamily: 'Iowan Old Style',
  },

  circuloContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  textoCentro: {
    position: 'absolute',
    alignItems: 'center',
  },

  percentual: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#40543B',
  },

  legenda: {
    fontSize: 13,
    color: '#8A8A7A',
  },

    indicadores: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0E8DC',
  },

  indicador: {
    alignItems: 'center',
    flex: 1,
  },

  numeroIndicador: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
  },

  legendaIndicador: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 5,
    textAlign: 'center',
  },

  periodo: {
  fontSize: 12,
  color: '#8A8A7A',
  marginTop: 5,
},

});

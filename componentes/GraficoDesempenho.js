
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function GraficoDesempenho({ registros, inicio, fim }) {
  const dados = [];

  const dataAtual = new Date(inicio);
  const dataFinal = new Date(fim);

  while (dataAtual <= dataFinal) {
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    const registrosDoDia = registros.filter(
      (registro) => registro.data === dataFormatada
    );

    const concluidos = registrosDoDia.filter(
      (registro) => registro.status === 'concluido'
    ).length;

    const naoRealizados = registrosDoDia.filter(
      (registro) => registro.status === 'nao_realizado'
    ).length;

    const total = concluidos + naoRealizados;

    dados.push({
      dia: dia,
      percentual: total > 0
        ? Math.round((concluidos / total) * 100)
        : null,
    });

    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  const possuiDados = dados.some((item) => item.percentual !== null);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Evolução diária</Text>
      <Text style={styles.subtitulo}>
        Percentual de hábitos concluídos
      </Text>

      {!possuiDados ? (
        <Text style={styles.mensagem}>
          Ainda não há registros suficientes para exibir o gráfico.
        </Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.grafico}
        >
          {dados.map((item, index) => (
            <View key={index} style={styles.coluna}>
              <Text style={styles.percentual}>
                {item.percentual !== null
                  ? `${item.percentual}%`
                  : '—'}
              </Text>

              <View style={styles.barraFundo}>
                {item.percentual !== null && (
                  <View
                    style={[
                      styles.barraPreenchida,
                      { height: item.percentual },
                    ]}
                  />
                )}
              </View>

              <Text style={styles.dia}>{item.dia}</Text>
            </View>
          ))}
        </ScrollView>
      )}
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
    fontSize: 18,
    fontWeight: '600',
    color: '#40543B',
  },
  subtitulo: {
    fontSize: 13,
    color: '#8A8A7A',
    marginTop: 4,
    marginBottom: 20,
  },
  mensagem: {
    color: '#8A8A7A',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  grafico: {
    alignItems: 'flex-end',
    paddingBottom: 5,
    gap: 12,
  },
  coluna: {
    alignItems: 'center',
    width: 32,
  },
  percentual: {
    fontSize: 10,
    color: '#40543B',
    marginBottom: 6,
  },
  barraFundo: {
    height: 100,
    width: 18,
    backgroundColor: '#F0E9DC',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barraPreenchida: {
    width: '100%',
    backgroundColor: '#40543B',
    borderRadius: 10,
  },
  dia: {
    fontSize: 11,
    color: '#8A8A7A',
    marginTop: 8,
  },
});

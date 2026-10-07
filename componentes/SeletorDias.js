import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SeletorDias() {

  const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const hoje = new Date();

  const diaDaSemanaAtual = hoje.getDay();

  const inicioDaSemana = new Date(hoje);

  inicioDaSemana.setDate(
    hoje.getDate() - diaDaSemanaAtual
  );

  return (
    <View style={styles.diasContainer}>
      {diasDaSemana.map((dia, index) => {

       const dataDoDia = new Date(inicioDaSemana);

          dataDoDia.setDate(
            inicioDaSemana.getDate() + index
          );

        const diaNum = dataDoDia.getDate();
        const isSelected = index === diaDaSemanaAtual;

        return (
          <View key={dia} style={styles.diaItem}>

            <Text style={styles.diaTexto}>
              {dia}
            </Text>

            <View
              style={[
                styles.circuloDia,
                isSelected && styles.circuloSelecionado
              ]}
            >
              <Text
                style={[
                  styles.numeroDiaText,
                  isSelected && styles.numeroSelecionadoText
                ]}
              >
                {diaNum}
              </Text>
            </View>

          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  diaItem: {
    alignItems: 'center',
  },
  diaTexto: {
    fontSize: 10,
    color: '#7F8C8D',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  circuloDia: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4A373',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  circuloSelecionado: {
    backgroundColor: '#E6CCB2',
  },
  numeroDiaText: {
    fontSize: 13,
    color: '#2C3E21',
  },
  numeroSelecionadoText: {
    fontWeight: 'bold',
  },
});
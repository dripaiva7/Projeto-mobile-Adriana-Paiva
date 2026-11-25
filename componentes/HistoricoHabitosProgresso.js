
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoricoHabitosProgresso({ registros }) {
  const registrosOrdenados = [...registros].sort((a, b) => {
    return b.data.localeCompare(a.data);
  });

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const obterStatus = (status) => {
    switch (status) {
      case 'concluido':
        return {
          texto: 'Concluído',
          cor: '#40543B',
        };

      case 'nao_realizado':
        return {
          texto: 'Não realizado',
          cor: '#C47A65',
        };

      default:
        return {
          texto: 'Pendente',
          cor: '#C49A6C',
        };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de ocorrências</Text>

      {registrosOrdenados.length === 0 ? (
        <Text style={styles.mensagem}>
          Nenhuma ocorrência encontrada neste período.
        </Text>
      ) : (
        registrosOrdenados.map((registro) => {
          const status = obterStatus(registro.status);

          return (
            <View key={registro.id} style={styles.registro}>
              <View style={styles.informacoes}>
                <Text style={styles.nomeHabito}>
                  {registro.titulo}
                </Text>

                <Text style={styles.data}>
                  {formatarData(registro.data)}
                </Text>

                {registro.horarioConclusao && (
                  <Text style={styles.horario}>
                    Concluído às {registro.horarioConclusao}
                  </Text>
                )}
              </View>

              <Text style={[styles.status, { color: status.cor }]}>
                {status.texto}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40543B',
    marginBottom: 15,
  },

  registro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E9DC',
  },

  informacoes: {
    flex: 1,
    marginRight: 10,
  },

  nomeHabito: {
    fontSize: 15,
    fontWeight: '600',
    color: '#40543B',
  },

  data: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 4,
  },

  horario: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 3,
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  mensagem: {
    color: '#8A8A7A',
    textAlign: 'center',
    marginVertical: 15,
  },
});

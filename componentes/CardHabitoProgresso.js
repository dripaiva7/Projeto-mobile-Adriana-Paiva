
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function CardHabitoProgresso({
  habito,
  registros,
  onEditar,
  onVerHistorico,
}) {
  const [menuAberto, setMenuAberto] = useState(false);

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
      <View style={styles.cabecalho}>
        <View style={styles.informacoes}>
          <Text style={styles.titulo}>{habito.titulo}</Text>
          <Text style={styles.categoria}>{habito.categoria}</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <Text style={styles.tresPontos}>⋮</Text>
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.opcaoMenu}
            onPress={() => {
              setMenuAberto(false);
              onEditar?.(habito);
            }}
          >
            <Text style={styles.textoOpcao}>Editar hábito</Text>
          </TouchableOpacity>

          <View style={styles.divisorMenu} />

          <TouchableOpacity
            style={styles.opcaoMenu}
            onPress={() => {
              setMenuAberto(false);
              onVerHistorico?.(habito);
            }}
          >
            <Text style={styles.textoOpcao}>Ver histórico</Text>
          </TouchableOpacity>
        </View>
      )}

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
    position: 'relative',
    zIndex: 1,
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  informacoes: {
    flex: 1,
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

  botaoMenu: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    marginTop: -8,
    marginRight: -8,
  },

  tresPontos: {
    fontSize: 27,
    color: '#40543B',
    fontWeight: 'bold',
  },

  menu: {
    position: 'absolute',
    top: 45,
    right: 15,
    width: 155,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 5,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    zIndex: 10,
  },

  opcaoMenu: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  textoOpcao: {
    fontSize: 13,
    color: '#40543B',
  },

  divisorMenu: {
    height: 1,
    backgroundColor: '#F0E9DC',
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

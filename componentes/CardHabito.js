
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardHabito({
  item,
  onAlternarConclusao,
  onExcluir,
  onEditar,
}) {

  const iconesCategoria = {
    'SAÚDE': 'heart-pulse',
    'ESTUDOS': 'book-open-page-variant',
    'TRABALHO': 'briefcase-outline',
    'BEM-ESTAR': 'flower-outline',
    'OUTRA': 'dots-horizontal-circle-outline',
  };

  const coresCategoria = {
    'SAÚDE': '#D98B8B',
    'ESTUDOS': '#7A9CC6',
    'TRABALHO': '#C49A6C',
    'BEM-ESTAR': '#8FAF7B',
    'OUTRA': '#9B8FB5',
  };

  const [concluida, setConcluida] = useState(
    item.status === 'concluido'
  );

  useEffect(() => {
    setConcluida(item.status === 'concluido');
  }, [item.status]);

  const naoRealizada = item.status === 'nao_realizado';

  // Menu de opções
  const abrirMenu = () => {
    Alert.alert(
      'Opções do hábito',
      item.titulo,
      [
        {
          text: 'Editar',
          onPress: () => onEditar(item.id),
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmarExclusao,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  // Confirmar exclusão
  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir hábito',
      'Tem certeza que deseja excluir este hábito?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onExcluir(item.id),
        },
      ]
    );
  };

  return (
    <View style={styles.linha}>

      {/* Checkbox */}
      <TouchableOpacity
        style={[
          styles.check,
          concluida && styles.checkMarcado,
          naoRealizada && styles.checkNaoRealizado,
        ]}
        onPress={() => {
          const novoEstado = !concluida;

          setConcluida(novoEstado);
          onAlternarConclusao(item.id, novoEstado);
        }}
      >
        {concluida && (
          <Text style={styles.checkTexto}>✓</Text>
        )}

        {naoRealizada && (
          <Text style={styles.checkTextoNaoRealizado}>×</Text>
        )}
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>

        {/* Ícone da categoria */}
        <View
          style={[
            styles.iconeContainer,
            {
              backgroundColor:
                coresCategoria[item.categoria] || '#9B8FB5',
            },
          ]}
        >
          <MaterialCommunityIcons
            name={iconesCategoria[item.categoria] || 'dots-horizontal-circle-outline'}
            size={21}
            color="#FFFFFF"
          />
        </View>

        {/* Informações */}
        <View style={styles.conteudo}>

          <Text style={styles.linhaTitulo}>
            {item.horario} - {item.titulo}
          </Text>

          <Text style={styles.descricao}>
            {item.descricao}
          </Text>

        </View>

        {/* Menu de três pontinhos */}
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={abrirMenu}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={23}
            color="#40543B"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 7,
  },

  check: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#6B6175',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  checkTexto: {
    fontSize: 18,
    color: '#FBF9F1',
  },

  checkMarcado: {
    backgroundColor: '#39690b',
    borderColor: '#D4A373',
  },

  checkNaoRealizado: {
    borderColor: '#C47A65',
  },

  checkTextoNaoRealizado: {
    color: '#C47A65',
    fontSize: 24,
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  iconeContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },

  linhaTitulo: {
    fontSize: 14,
    color: '#2C3E21',
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 2,
  },

  botaoMenu: {
    paddingLeft: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

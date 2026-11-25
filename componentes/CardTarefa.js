
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CardTarefa({
  item,
  onExcluir,
  onAlternarConclusao,
  onEditar,
}) {
  const [concluida, setConcluida] = useState(false);

  const alternarConclusao = () => {
    const novoEstado = !concluida;
    setConcluida(novoEstado);

    if (onAlternarConclusao) {
      onAlternarConclusao(item.id, novoEstado);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza de que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: excluirTarefa,
        },
      ]
    );
  };

  const excluirTarefa = async () => {
    try {
      await deleteDoc(doc(db, 'tarefas', item.id));

      if (onExcluir) {
        onExcluir(item.id);
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
    }
  };

  const abrirMenu = () => {
    Alert.alert('Opções da tarefa', item.titulo, [
      {
        text: 'Editar',
        onPress: () => {
          if (onEditar) {
            onEditar(item.id);
          }
        },
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
    ]);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={alternarConclusao}
      >
        <MaterialCommunityIcons
          name={concluida ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={25}
          color={concluida ? '#40543B' : '#A6A6A6'}
        />
      </TouchableOpacity>

      <View style={styles.iconeContainer}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={23}
          color="#40543B"
        />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.linhaTitulo}>
          <Text
            style={[
              styles.horario,
              concluida && styles.textoConcluido,
            ]}
          >
            {item.horario}
          </Text>

          <Text
            style={[
              styles.titulo,
              concluida && styles.textoConcluido,
            ]}
            numberOfLines={1}
          >
            {item.titulo}
          </Text>
        </View>

        {!!item.descricao && (
          <Text
            style={[
              styles.descricao,
              concluida && styles.textoConcluido,
            ]}
            numberOfLines={2}
          >
            {item.descricao}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={abrirMenu}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={23}
          color="#40543B"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  iconeContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E6CCB2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horario: {
    fontSize: 12,
    color: '#40543B',
    fontWeight: '600',
    marginRight: 8,
  },
  titulo: {
    flex: 1,
    fontSize: 14,
    color: '#40543B',
    fontWeight: '600',
  },
  descricao: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#A6A6A6',
  },
  botaoMenu: {
    padding: 5,
    marginLeft: 4,
  },
});

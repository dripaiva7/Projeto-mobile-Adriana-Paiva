import React, { useState,  useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,
  PanResponder, Animated,} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CardTarefa({ item, onExcluir, onAlternarConclusao, }) {

    const [concluida, setConcluida] = useState(false);

  const posicao = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (_, gesture) => {
        return (
          Math.abs(gesture.dx) > 10 &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy)
        );
      },

    onPanResponderMove: (_, gesture) => {
      if (gesture.dx < 0) {
        posicao.setValue(gesture.dx);
      }
    },

    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -30) {
        Alert.alert(
          'Excluir tarefa',
          'Deseja realmente excluir esta tarefa?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => {
                Animated.spring(posicao, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            },
            {
              text: 'Excluir',
              style: 'destructive',
              onPress: async () => {
                try {
                  await deleteDoc(
                    doc(db, 'tarefas', item.id)
                  );

                  console.log('Tarefa excluída:', item.id);

                  onExcluir(item.id);

                } catch (erro) {
                  console.log('Erro ao excluir tarefa:', erro);
                }

                Animated.spring(posicao, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            },
          ]
        );
      } else {
        Animated.spring(posicao, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Animated.View
  style={[
    styles.linha,
    {
      transform: [{ translateX: posicao }],
    },
  ]}
  {...panResponder.panHandlers}
>

        <TouchableOpacity
            style={[
              styles.check,
              concluida && styles.checkMarcado,
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
        </TouchableOpacity>

        <View style={styles.card}>

        {/* Ícone da tarefa */}
        <View style={styles.iconeContainer}>
            <MaterialCommunityIcons
            name="pencil-outline"
            size={21}
            color="#FFFFFF"
            />
        </View>

        {/* Informações da tarefa */}
        <View style={styles.conteudo}>

            <Text style={styles.linhaTitulo}>
              {item.horario} - {item.titulo}
            </Text>

            <Text style={styles.descricao}>
              {item.descricao}
            </Text>

        </View>

        </View>

    </Animated.View>
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
    backgroundColor: '#307c96',
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

});
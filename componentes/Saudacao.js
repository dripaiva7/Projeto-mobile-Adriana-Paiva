
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Saudacao() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  useFocusEffect(
    useCallback(() => {
      const carregarNome = async () => {
        try {
          const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');

          if (nomeSalvo) {
            setNomeUsuario(nomeSalvo);
          }
        } catch (erro) {
          console.log('Erro ao carregar nome:', erro);
        }
      };

      carregarNome();
    }, [])
  );

  const hoje = new Date();

  const diasDaSemana = [
    'Domingo', 'Segunda-Feira', 'Terça-Feira',
    'Quarta-Feira', 'Quinta-Feira', 'Sexta-feira', 'Sábado'
  ];

  const meses = [
    'de Janeiro', 'de Fevereiro', 'de Março', 'de Abril',
    'de Maio', 'de Junho', 'de Julho', 'de Agosto',
    'de Setembro', 'de Outubro', 'de Novembro', 'de Dezembro'
  ];

  const nomeDiasDaSemana = diasDaSemana[hoje.getDay()];
  const diaDoMes = hoje.getDate();
  const nomeDoMes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  const horaAtual = hoje.getHours();

  let textoSaudacao;

  if (horaAtual < 12) {
    textoSaudacao = 'BOM DIA';
  } else if (horaAtual < 18) {
    textoSaudacao = 'BOA TARDE';
  } else {
    textoSaudacao = 'BOA NOITE';
  }

  const dataSaudacao = `${nomeDiasDaSemana}, ${diaDoMes} ${nomeDoMes} de ${ano}`;

  return (
    <View style={style.container}>
      <Text style={style.saudacao}>
        {textoSaudacao}{nomeUsuario ? `, ${nomeUsuario.toUpperCase()}!` : '!'}
      </Text>

      <Text style={style.data}>
        {dataSaudacao}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },

  saudacao: {
    fontSize: 20,
    color: '#2C3E21',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontFamily: 'Iowan Old Style',
  },

  data: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
});

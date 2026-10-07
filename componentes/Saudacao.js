import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Saudacao() {
    const hoje = new Date();

    const diasDaSemana = [
  'Domingo', 'Segunda-Feira', 'Terça-Feira',
  'Quarta-Feira', 'Quinta-Feira', 'Sexta-feira', 'Sábado'
    ];

    const nomeDiasDaSemana = diasDaSemana[hoje.getDay()];

    const diaDoMes = hoje.getDate();

    const meses = [
        'de Janeiro', 'de Fevereiro', 'de Março', 'de Abril',
        'de Maio', 'de Junho', 'de Julho', 'de Agosto',
        'de Setembro', 'de Outubro', 'de Novembro', 'de Dezembro'
        ];

    const nomeDoMes = meses[hoje.getMonth()];

    const ano = hoje.getFullYear();

    const horaAtual = hoje.getHours();

    let textoSaudacao;

    if(horaAtual < 12) {
        textoSaudacao = 'BOM DIA';
    } else if (12 < horaAtual < 18) {
        textoSaudacao = 'BOA TARDE';
    } else {
        textoSaudacao = 'BOA NOITE';
    }

    const dataSaudacao = nomeDiasDaSemana +', '+nomeDoMes + ' de '+ ano;
  return (
    <View style={style.container}>
      <Text style={style.saudacao}>{textoSaudacao}, ADRIANA!</Text>
      <Text style={style.data}>{dataSaudacao}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
    alignItems: 'flex-start',
     },

    saudacao: {
    fontSize: 20,
    color: '#2C3E21',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    },

    data: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },

});

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditarPerfil() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
        const emailSalvo = await AsyncStorage.getItem('emailUsuario');
        let dataSalva = await AsyncStorage.getItem('dataEntrada');

        if (!dataSalva) {
          dataSalva = new Date().toISOString();
          await AsyncStorage.setItem('dataEntrada', dataSalva);
        }

        setNome(nomeSalvo || '');
        setEmail(emailSalvo || '');
        setDataEntrada(dataSalva);
      } catch (erro) {
        console.log('Erro ao carregar dados do perfil:', erro);
      }
    };

    carregarDados();
  }, []);

  const salvarAlteracoes = async () => {
    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim();

    if (!nomeFormatado) {
      Alert.alert('Atenção', 'Informe seu nome para continuar.');
      return;
    }

    if (
      emailFormatado &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado)
    ) {
      Alert.alert('E-mail inválido', 'Confira o endereço informado.');
      return;
    }

    try {
      await AsyncStorage.setItem('nomeUsuario', nomeFormatado);
      await AsyncStorage.setItem('emailUsuario', emailFormatado);

      Alert.alert(
        'Tudo certo!',
        'Suas informações foram atualizadas.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (erro) {
      console.log('Erro ao salvar informações:', erro);
      Alert.alert('Erro', 'Não foi possível salvar suas informações.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* CABEÇALHO */}
        <View style={styles.cabecalho}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#40543B" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Editar informações</Text>

          <View style={styles.espaco} />
        </View>

        <Text style={styles.descricao}>
          Mantenha suas informações pessoais atualizadas.
        </Text>

        {/* DADOS PESSOAIS */}
        <Text style={styles.tituloSecao}>Dados pessoais</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#8A8A7A"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#8A8A7A"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* DATA DE ENTRADA */}
        <Text style={styles.tituloSecao}>Minha jornada</Text>

        <View style={styles.card}>
          <View style={styles.itemData}>
            <Feather name="calendar" size={21} color="#40543B" />

            <View style={styles.itemTexto}>
              <Text style={styles.labelData}>Data de entrada</Text>
              <Text style={styles.descricaoData}>
                {dataEntrada
                  ? new Date(dataEntrada).toLocaleDateString('pt-BR')
                  : 'Carregando...'}
              </Text>
            </View>
          </View>
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvarAlteracoes}
        >
          <Text style={styles.textoBotao}>Salvar alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 100,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  titulo: {
    fontFamily: 'Iowan Old Style',
    fontSize: 25,
    color: '#40543B',
  },

  espaco: {
    width: 24,
  },

  descricao: {
    fontSize: 13,
    color: '#8A8A7A',
    marginBottom: 30,
  },

  tituloSecao: {
    fontFamily: 'Iowan Old Style',
    fontSize: 21,
    color: '#40543B',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FDF6EA',
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#40543B',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FBF9F1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6CCB2',
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#40543B',
    marginBottom: 20,
  },

  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemTexto: {
    marginLeft: 13,
  },

  labelData: {
    fontSize: 14,
    fontWeight: '600',
    color: '#40543B',
  },

  descricaoData: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 4,
  },

  botaoSalvar: {
    backgroundColor: '#40543B',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBotao: {
    color: '#FDF6EA',
    fontSize: 15,
    fontWeight: '600',
  },
});

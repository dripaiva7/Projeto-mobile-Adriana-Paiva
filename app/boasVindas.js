
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../assets/logo-mdb.png');
const fundo = require('../assets/fundo.jpg');

export default function BoasVindas() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [salvando, setSalvando] = useState(false);

  const comecarJornada = async () => {
    const nomeFormatado = nome.trim();

    if (!nomeFormatado) {
      Alert.alert('Ops!', 'Digite seu nome para continuar.');
      return;
    }

    try {
      setSalvando(true);

      await AsyncStorage.setItem('nomeUsuario', nomeFormatado);

      router.replace('/');
    } catch (erro) {
      console.log('Erro ao salvar nome:', erro);
      Alert.alert('Erro', 'Não foi possível salvar seu nome.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={fundo}
        style={styles.container}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.conteudoTeclado}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.conteudo}>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>MY DAILY BLOOM</Text>

            <Text style={styles.subtitulo}>
              Floresça no seu próprio ritmo.
            </Text>

            <View style={styles.areaFormulario}>

              <View style={styles.apresentacao}>
                <Text style={styles.bemVinda}>
                  Seja Bem-Vindo(a)!
                </Text>
              </View>

              <View style={styles.formulario}>
                <Text style={styles.label}>
                  Como podemos chamar você?
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#8A8A7A"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                  returnKeyType="done"
                  onSubmitEditing={comecarJornada}
                  maxLength={40}
                />

                <TouchableOpacity
                  style={[
                    styles.botao,
                    salvando && styles.botaoDesabilitado,
                  ]}
                  onPress={comecarJornada}
                  disabled={salvando}
                >
                  <Text style={styles.textoBotao}>
                    {salvando
                      ? 'Aguarde...'
                      : 'Começar minha jornada'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.rodape}>
          My Daily Bloom • Floresça no seu tempo
        </Text>

      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E21',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 30,
  },

  conteudoTeclado: {
    flex: 1,
    justifyContent: 'center',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },

  titulo: {
    fontFamily: 'Iowan Old Style',
    fontSize: 32,
    color: '#C3A87B',
  },

  subtitulo: {
    fontSize: 13,
    color: '#E6CCB2',
    marginTop: 5,
  },

  apresentacao: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 12,
  },

  areaFormulario: {
    width: '100%',
    backgroundColor: '#C3A87B',
    borderRadius: 24,
    padding: 22,
    marginTop: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 8,
  },

  bemVinda: {
    fontFamily: 'Iowan Old Style',
    fontSize: 26,
    color: '#FDF6EA',
    marginBottom: 12,
  },

  formulario: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#FDF6EA',
    fontWeight: '600',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FDF6EA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6CCB2',
    padding: 16,
    fontSize: 15,
    color: '#40543B',
  },

  botao: {
    backgroundColor: '#2C3E21',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 8,
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#C3A87B',
    fontSize: 15,
    fontWeight: '600',
  },

  rodape: {
    textAlign: 'center',
    color: '#E6CCB2',
    fontSize: 11,
  },
});

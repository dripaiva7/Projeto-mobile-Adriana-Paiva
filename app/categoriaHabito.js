import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoriaHabito() {

  const router = useRouter();

    const categorias = [
  {
    nome: 'SAÚDE',
    icone: 'heart-pulse',
    cor: '#D98B8B',
  },
  {
    nome: 'ESTUDOS',
    icone: 'book-open-page-variant',
    cor: '#7A9CC6',
  },
  {
    nome: 'TRABALHO',
    icone: 'briefcase-outline',
    cor: '#C49A6C',
  },
  {
    nome: 'BEM-ESTAR',
    icone: 'flower-outline',
    cor: '#8FAF7B',
  },
  {
    nome: 'OUTRA',
    icone: 'dots-horizontal-circle-outline',
    cor: '#9B8FB5',
  },
];

  const selecionarCategoria = (categoria) => {
    router.push({
      pathname: '/cadastroHabito',
      params: {
        categoria: categoria,
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.tituloPagina}>
          NOVO HÁBITO
        </Text>

      </View>

      <Text style={styles.titulo}>
        ESCOLHA UMA CATEGORIA
      </Text>

      <View style={styles.listaCategorias}>

        {categorias.map((categoria) => (
  <TouchableOpacity
    key={categoria.nome}
    style={styles.botaoCategoria}
    onPress={() => selecionarCategoria(categoria.nome)}
  >

    <View
        style={[
            styles.iconeCategoria,
            { backgroundColor: categoria.cor }
        ]}
        >
        <MaterialCommunityIcons
            name={categoria.icone}
            size={22}
            color="#FFFFFF"
        />
    </View>

    <Text style={styles.textoCategoria}>
      {categoria.nome}
    </Text>

  </TouchableOpacity>
))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EA',
    paddingHorizontal: 21,
    paddingTop: 80,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
  },

  voltar: {
    fontSize: 30,
    color: '#2C3E21',
    marginRight: 45,
  },

  tituloPagina: {
    fontSize: 24,
    color: '#2C3E21',
    letterSpacing: 0.5,
    fontFamily: 'Iowan Old Style',

  },

  titulo: {
    fontSize: 18,
    color: '#2C3E21',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },

  listaCategorias: {
    gap: 20,
    paddingTop: 40,
  },

  botaoCategoria: {
  height: 55,
  borderRadius: 14,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#D4A373',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
},

  textoCategoria: {
    fontSize: 16,
    color: '#2C3E21',
    letterSpacing: 0.5,
  },

  iconeCategoria: {
  width: 38,
  height: 38,
  borderRadius: 10,
  backgroundColor: '#307C96',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

});
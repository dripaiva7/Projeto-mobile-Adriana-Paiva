
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilUsuario() {
  const router = useRouter();

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Carrega nome e foto sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
          const fotoSalva = await AsyncStorage.getItem('fotoPerfil');

          if (nomeSalvo) {
            setNomeUsuario(nomeSalvo);
          }

          setFotoPerfil(fotoSalva);
        } catch (erro) {
          console.log('Erro ao carregar dados do perfil:', erro);
        }
      };

      carregarDados();
    }, [])
  );

  // Escolhe uma foto da galeria
  const escolherFoto = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para escolher sua foto de perfil.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        const novaFoto = resultado.assets[0].uri;

        await AsyncStorage.setItem('fotoPerfil', novaFoto);
        setFotoPerfil(novaFoto);
      }
    } catch (erro) {
      console.log('Erro ao escolher foto:', erro);

      Alert.alert(
        'Ops!',
        'Não foi possível selecionar a foto. Tente novamente.'
      );
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
          <Text style={styles.titulo}>MEU PERFIL</Text>

          <TouchableOpacity>
            <Feather name="settings" size={23} color="#40543B" />
          </TouchableOpacity>
        </View>

        {/* APRESENTAÇÃO */}
        <View style={styles.apresentacao}>

          <TouchableOpacity
            style={styles.avatar}
            onPress={escolherFoto}
            activeOpacity={0.8}
          >
            {fotoPerfil ? (
              <Image
                source={{ uri: fotoPerfil }}
                style={styles.avatarImagem}
              />
            ) : (
              <Feather name="user" size={42} color="#40543B" />
            )}

            <View style={styles.iconeCamera}>
              <Feather name="camera" size={14} color="#FDF6EA" />
            </View>
          </TouchableOpacity>

          <Text style={styles.textoAlterarFoto}>
            Toque para alterar
          </Text>

          <Text style={styles.nome}>
            Olá, {nomeUsuario || 'Bem-vindo(a)'}!
          </Text>  

          
        </View>

        {/* SOBRE MIM */}
        <Text style={styles.tituloSecao}>Sobre mim</Text>

        <View style={styles.card}>
          <ItemPerfil
            icone="user"
            titulo="Nome"
            descricao={nomeUsuario || 'Carregando...'}
            mostrarSeta={false}
          />

          <View style={styles.divisor} />

          <ItemPerfil
            icone="mail"
            titulo="E-mail"
            descricao="Meu endereço de e-mail"
            mostrarSeta={false}
          />

          <View style={styles.divisor} />

          <ItemPerfil
            icone="calendar"
            titulo="Minha conta"
            descricao="Data de entrada no MDB"
            mostrarSeta={false}
          />

          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => router.push('/editarPerfil')}
          >
            <Feather name="edit-2" size={16} color="#FDF6EA" />
            <Text style={styles.textoBotaoEditar}>
              Editar informações
            </Text>
          </TouchableOpacity>

        </View>

        {/* MINHA EXPERIÊNCIA */}
        <Text style={styles.tituloSecao}>Minha experiência</Text>

        <View style={styles.card}>
          <ItemPerfil
            icone="activity"
            titulo="Minha jornada"
            descricao="Acompanhe sua evolução e seus hábitos"
            onPress={() => router.push('/progresso')}
          />

          <View style={styles.divisor} />

         <ItemPerfil
  icone="bell"
  titulo="Notificações"
  descricao="Gerencie seus lembretes"
  onPress={() => router.push('/notificacoes')}
/>
        </View>

        {/* APLICATIVO */}
        <Text style={styles.tituloSecao}>Aplicativo</Text>

        <View style={styles.card}>
          <ItemPerfil
            icone="info"
            titulo="Sobre o My Daily Bloom"
          />

          <View style={styles.divisor} />

          <ItemPerfil
            icone="shield"
            titulo="Privacidade e termos"
          />

          <View style={styles.divisor} />

          <ItemPerfil
            icone="message-circle"
            titulo="Ajuda e suporte"
          />
        </View>

        {/* SAIR */}
        <TouchableOpacity style={styles.botaoSair}>
          <Text style={styles.textoSair}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          My Daily Bloom • Floresça no seu tempo
        </Text>

      </ScrollView>
    </View>
  );
}

// COMPONENTE DOS ITENS
function ItemPerfil({
  icone,
  titulo,
  descricao,
  mostrarSeta = true,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Feather name={icone} size={21} color="#40543B" />

      <View style={styles.itemTexto}>
        <Text style={styles.itemTitulo}>{titulo}</Text>

        {descricao && (
          <Text style={styles.itemDescricao}>{descricao}</Text>
        )}
      </View>

      {mostrarSeta && (
        <Feather name="chevron-right" size={20} color="#8A8A7A" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    paddingTop: 20,
    paddingBottom: 50,
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 100,
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  titulo: {
    fontFamily: 'Iowan Old Style',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
  },

  apresentacao: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
  width: 88,
  height: 88,
  borderRadius: 44,
  backgroundColor: '#E6CCB2',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5,
  overflow: 'visible',
},

  avatarImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
  },

 iconeCamera: {
  position: 'absolute',
  right: -5,
  bottom: -3,
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#40543B',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 3,
  borderColor: '#FBF9F1',
  zIndex: 2,
},

  textoAlterarFoto: {
    fontSize: 11,
    color: '#8A8A7A',
    marginBottom: 10,
    marginTop: 3,
  },

  nome: {
    fontFamily: 'Iowan Old Style',
    fontSize: 26,
    color: '#40543B',
  },

  frase: {
    fontSize: 13,
    color: '#8A8A7A',
    marginTop: 5,
  },

  etiqueta: {
    backgroundColor: '#E6CCB2',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginTop: 12,
  },

  textoEtiqueta: {
    color: '#40543B',
    fontSize: 12,
    fontWeight: '600',
  },

  tituloSecao: {
    fontFamily: 'Iowan Old Style',
    fontSize: 21,
    color: '#40543B',
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FDF6EA',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 24,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  itemTexto: {
    flex: 1,
    marginLeft: 13,
  },

  itemTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#40543B',
  },

  itemDescricao: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 4,
  },

  divisor: {
    height: 1,
    backgroundColor: '#E6CCB2',
  },

  botaoSair: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  textoSair: {
    color: '#C47A65',
    fontSize: 14,
    fontWeight: '600',
  },

  rodape: {
    textAlign: 'center',
    color: '#8A8A7A',
    fontSize: 11,
    marginTop: 5,
  },

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40543B',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: 18,
  },

  textoBotaoEditar: {
    color: '#FDF6EA',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 9,
  },
});

import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { use, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function App() {

  console.log(auth);

  const [tela, setTela] = useState('inicio');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = () =>{
    createUserWithEmailAndPassword(auth, email,senha)
    .then(() =>{
      console.log('Usuário Cadastrado')
    })
    .catch((error) => {
      console.log(error)
    })
  }


  if (tela === 'cadastro') {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        CRIAR CONTA
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />

      <Button
       
        title="Voltar"
        onPress={() => setTela('inicio')}
      />

    </View>
  );
}

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        BOM DIA!
      </Text>

      <Text style={styles.data}>
        SEG, 23 DE AGOSTO
      </Text>

      <View style={styles.card}>

        <Text style={styles.tituloRotina}>
          SUA ROTINA DE HOJE
        </Text>

        <Text style={styles.habito}>
          ✓ 09:00 - Musculação
        </Text>

        <Text style={styles.habito}>
          ✓ 11:00 - English class
        </Text>

        <Text style={styles.habito}>
          ✓ 12:00 - Almoço
        </Text>

        <Text style={styles.habito}>
          ✓ 13:00 - Trabalho
        </Text>

        <Text style={styles.habito}>
          ✓ 17:30 - Jantar
        </Text>

        <Text style={styles.habito}>
          ○ 19:00 - Faculdade
        </Text>

        <Text style={styles.habito}>
          ○ 22:00 - Ler 15 min
        </Text>

        <Text style={styles.botaoAdicionar}>
          +
        </Text>

      </View>

      <Text style={styles.progressoTitulo}>
        SEU PROGRESSO
      </Text>

      <Text style={styles.progresso}>
        71%
      </Text>

      <Button
        title="Criar conta"
        onPress={() => setTela('cadastro')}
        />

      <View style={styles.menu}>

        <Text>logo</Text>
        <Text>icone</Text>
        <Text>icone</Text>
        <Text>icone</Text>
        <Text>icone</Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F1E3',
    alignItems: 'center',
    paddingTop: 120,
  },

  titulo: {
    fontSize: 32,
    color: '#40543B',
    fontWeight: 'bold',
  },

  data: {
    fontSize: 16,
    marginTop: 5,
  },

  card: {
    width: '85%',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#F9F4E8',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3,
  },

  tituloRotina: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  habito: {
    fontSize: 17,
    marginBottom: 15,
  },

  botaoAdicionar: {
    fontSize: 30,
    color: '#40543B',
    textAlign: 'center',
  },

  progressoTitulo: {
    marginTop: 25,
    fontSize: 18,
    color: '#40543B',
  },

  progresso: {
    fontSize: 40,
    color: '#40543B',
  },

  menu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#40543B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
  width: '85%',
  backgroundColor: '#FFFFFF',
  padding: 15,
  marginTop: 15,
  borderRadius: 10,
},

});


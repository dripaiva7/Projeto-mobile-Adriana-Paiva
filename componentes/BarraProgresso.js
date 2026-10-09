import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BarraProgresso({
porcentagem = 0,
}) {
return (
<View style={styles.container}>
<View style={styles.linhaTexto}>
<Text style={styles.legenda}>
MEU PROGRESSO:
</Text>

    <Text style={styles.porcentagem}>
      {Math.round(porcentagem)}%
    </Text>
  </View>

  <View style={styles.fundo}>
    <View
      style={[
        styles.preenchimento,
        { width: `${porcentagem}%` },
      ]}
    />
  </View>
</View>

);
}

const styles = StyleSheet.create({
container: {
marginTop: 20,
marginBottom: 20,
},

linhaTexto: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 8,
},

legenda: {
fontSize: 14,
fontWeight: 'bold',
color: '#2C3E21',
    fontFamily: 'Iowan Old Style'
},

porcentagem: {
fontSize: 14,
color: '#40543B',
fontWeight: 'bold',
},

fundo: {
height: 25,
backgroundColor: '#E6CCB2',
borderRadius: 10,
overflow: 'hidden',
},

preenchimento: {
height: '100%',
backgroundColor: '#40543B',
borderRadius: 10,
},
});


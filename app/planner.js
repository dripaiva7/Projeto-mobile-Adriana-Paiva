import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function planner() {
  return (
    <View style={ styles.container}>
      <Text style={ styles.titulo}>PLANNER</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
  },
});
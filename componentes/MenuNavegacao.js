import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function MenuNavegacao({
  onInicio,
  onCalendario,
  onProgresso,
  onPerfil,
}) {
  return (
    <View style={styles.menu}>

      <TouchableOpacity onPress={onInicio}>
        <Ionicons
          name="home"
          size={25}
          color="#E6CCB2"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onCalendario}>
        <Ionicons
          name="calendar-outline"
          size={25}
          color="#E6CCB2"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onProgresso}>
        <MaterialCommunityIcons
          name="chart-bar"
          size={25}
          color="#E6CCB2"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPerfil}>
        <Feather
          name="user"
          size={25}
          color="#E6CCB2"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
    backgroundColor: '#3B4D28',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
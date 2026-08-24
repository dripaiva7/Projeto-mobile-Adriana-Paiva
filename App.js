import { View, Text } from 'react-native';

export default function App() {
  return (
    
    <View style={{flex: 1,backgroundColor: '#F7F1E3',alignItems: 'center',paddingTop: 120}}>

      <Text style={{fontSize: 32,color: '#40543B', fontWeight: 'bold'}}>
        BOM DIA!
      </Text>

      <Text style={{fontSize: 16, marginTop: 5}}>
        SEG, 23 DE AGOSTO
      </Text>

    <View style={{width: '85%',marginTop: 30,padding: 20,backgroundColor: '#F9F4E8',borderRadius: 20,
   shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.15,shadowRadius: 4,elevation: 3}}>

      <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center',marginBottom: 20}}>
          SUA ROTINA DE HOJE
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
        ✓ 09:00 - Musculação
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
        ✓ 11:00 - English class
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
        ✓ 12:00 - Almoço
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
      ✓ 13:00 - Trabalho
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
      ✓ 17:30 - Jantar
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
      ○ 19:00 - Faculdade
      </Text>

      <Text style={{ fontSize: 17, marginBottom: 15 }}>
       ○ 22:00 - Ler 15 min
      </Text>

      <Text style={{fontSize: 30, color: '#40543B', textAlign: 'center'}}>+</Text>

    </View>

      <Text style={{marginTop: 25,fontSize: 18,color: '#40543B'}}>SEU PROGRESSO</Text>

      <Text style={{fontSize: 40,color: '#40543B'}}>71%</Text>

    <View style={{position: 'absolute',bottom: 0,width: '100%',height: 70,backgroundColor: '#40543B',flexDirection: 'row',
    justifyContent: 'space-around',alignItems: 'center'}}>
        <Text>logo</Text>
        <Text>icone</Text>
        <Text>icone</Text>
        <Text>icone</Text>
        <Text>icone</Text>
      </View>

    </View>
  );
}
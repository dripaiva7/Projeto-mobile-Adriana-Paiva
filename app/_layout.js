
import { Stack, useRouter, usePathname } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

import MenuNavegacao from '../componentes/MenuNavegacao';

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificarPrimeiroAcesso = async () => {
      try {
        const nomeSalvo = null;

        if (nomeSalvo) {
          router.replace('/');
        } else {
          router.replace('/boasVindas');
        }
      } catch (erro) {
        console.log('Erro ao verificar primeiro acesso:', erro);
        router.replace('/boasVindas');
      } finally {
        setVerificando(false);
      }
    };

    verificarPrimeiroAcesso();
  }, []);

  if (verificando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FBF9F1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color="#40543B" size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      {pathname !== '/boasVindas' && (
        <MenuNavegacao
          onInicio={() => router.push('/')}
          onCalendario={() => router.push('/planner')}
          onProgresso={() => router.push('/progresso')}
          onPerfil={() => router.push('/perfilUsuario')}
        />
      )}
    </>
  );
}

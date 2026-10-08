import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import MenuNavegacao from '../componentes/MenuNavegacao';

export default function Layout() {

  const router = useRouter();

  const [tarefas, setTarefas] = useState([]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <MenuNavegacao
        onInicio={() => router.push('/')}
        onCalendario={() => {}}
        onProgresso={() => {}}
        onPerfil={() => {}}
      />
    </>
  );
}
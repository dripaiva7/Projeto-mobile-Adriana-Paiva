
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Exibição das notificações nos dois sistemas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Configuração específica do Android
export async function configurarNotificacoes() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('mdb-lembretes', {
      name: 'Lembretes do MDB',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#40543B',
    });
  }
}

// Solicita permissão nos dois sistemas
export async function solicitarPermissaoNotificacoes() {
  await configurarNotificacoes();

  const permissaoAtual = await Notifications.getPermissionsAsync();

  if (
    permissaoAtual.granted ||
    permissaoAtual.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const permissao = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: false,
      allowSound: true,
    },
  });

  return (
    permissao.granted ||
    permissao.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

// Agenda lembretes diários
export async function agendarLembreteDiario(tipo, hora, minuto) {
  const mensagens = {
    habitos: {
      title: 'Hora de cuidar de você! 🌱',
      body: 'Não esqueça dos seus hábitos de hoje.',
    },
    tarefas: {
      title: 'Um passo de cada vez! ✨',
      body: 'Confira suas tarefas e organize seu dia.',
    },
  };

  const mensagem = mensagens[tipo];

  if (!mensagem) {
    throw new Error('Tipo de lembrete inválido.');
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: mensagem.title,
      body: mensagem.body,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      ...(Platform.OS === 'android' && {
        channelId: 'mdb-lembretes',
      }),
    },
  });
}

// Cancela um lembrete
export async function cancelarLembrete(id) {
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}

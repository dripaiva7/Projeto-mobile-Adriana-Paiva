
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  solicitarPermissaoNotificacoes,
  agendarLembreteDiario,
  cancelarLembrete,
} from '../servicos/notificacoes';

export default function Notificacoes() {
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);

  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [lembreteHabitos, setLembreteHabitos] = useState(true);
  const [lembreteTarefas, setLembreteTarefas] = useState(true);

  const [horarioHabitos, setHorarioHabitos] = useState('08:00');
  const [horarioTarefas, setHorarioTarefas] = useState('20:00');

  const [idsAgendamentos, setIdsAgendamentos] = useState({
    habitos: null,
    tarefas: null,
  });

  const [tipoHorario, setTipoHorario] = useState(null);
  const [horarioTemporario, setHorarioTemporario] = useState(new Date());

  // Carrega as preferências salvas
  useEffect(() => {
    async function carregarPreferencias() {
      try {
        const ativa = await AsyncStorage.getItem('notificacoesAtivas');
        const habitos = await AsyncStorage.getItem('lembreteHabitos');
        const tarefas = await AsyncStorage.getItem('lembreteTarefas');
        const horaHabitos = await AsyncStorage.getItem('horarioHabitos');
        const horaTarefas = await AsyncStorage.getItem('horarioTarefas');
        const ids = await AsyncStorage.getItem('idsNotificacoes');

        if (ativa !== null) {
          setNotificacoesAtivas(ativa === 'true');
        }

        if (habitos !== null) {
          setLembreteHabitos(habitos === 'true');
        }

        if (tarefas !== null) {
          setLembreteTarefas(tarefas === 'true');
        }

        if (horaHabitos) setHorarioHabitos(horaHabitos);
        if (horaTarefas) setHorarioTarefas(horaTarefas);

        if (ids) setIdsAgendamentos(JSON.parse(ids));
      } catch (erro) {
        console.log('Erro ao carregar notificações:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarPreferencias();
  }, []);

  function converterHorario(horario) {
    const [hora, minuto] = horario.split(':').map(Number);
    return { hora, minuto };
  }

  function formatarHorario(data) {
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    return `${hora}:${minuto}`;
  }

  function criarDataHorario(horario) {
    const { hora, minuto } = converterHorario(horario);
    const data = new Date();
    data.setHours(hora, minuto, 0, 0);
    return data;
  }

  async function salvarIds(novosIds) {
    setIdsAgendamentos(novosIds);
    await AsyncStorage.setItem(
      'idsNotificacoes',
      JSON.stringify(novosIds)
    );
  }

  async function atualizarAgendamento(tipo, ativo, horario) {
    const idAntigo = idsAgendamentos[tipo];

    if (idAntigo) {
      await cancelarLembrete(idAntigo);
    }

    const novosIds = {
      ...idsAgendamentos,
      [tipo]: null,
    };

    if (notificacoesAtivas && ativo) {
      const { hora, minuto } = converterHorario(horario);

      const novoId = await agendarLembreteDiario(
        tipo,
        hora,
        minuto
      );

      novosIds[tipo] = novoId;
    }

    await salvarIds(novosIds);
  }

  // Ativa ou desativa todas as notificações
  async function alterarNotificacoes(ativar) {
    try {
      if (ativar) {
        const permitido = await solicitarPermissaoNotificacoes();

        if (!permitido) {
          Alert.alert(
            'Permissão necessária',
            'Para receber lembretes, autorize as notificações nas configurações do dispositivo.'
          );
          return;
        }

        setNotificacoesAtivas(true);

        await AsyncStorage.setItem('notificacoesAtivas', 'true');

        const novosIds = { ...idsAgendamentos };

        if (lembreteHabitos && !novosIds.habitos) {
          const { hora, minuto } = converterHorario(horarioHabitos);
          novosIds.habitos = await agendarLembreteDiario(
            'habitos',
            hora,
            minuto
          );
        }

        if (lembreteTarefas && !novosIds.tarefas) {
          const { hora, minuto } = converterHorario(horarioTarefas);
          novosIds.tarefas = await agendarLembreteDiario(
            'tarefas',
            hora,
            minuto
          );
        }

        await salvarIds(novosIds);
      } else {
        setNotificacoesAtivas(false);

        await AsyncStorage.setItem('notificacoesAtivas', 'false');

        if (idsAgendamentos.habitos) {
          await cancelarLembrete(idsAgendamentos.habitos);
        }

        if (idsAgendamentos.tarefas) {
          await cancelarLembrete(idsAgendamentos.tarefas);
        }

        await salvarIds({
          habitos: null,
          tarefas: null,
        });
      }
    } catch (erro) {
      console.log('Erro ao alterar notificações:', erro);
      Alert.alert('Ops!', 'Não foi possível atualizar as notificações.');
    }
  }

  // Ativa ou desativa cada tipo de lembrete
  async function alterarLembrete(tipo, ativar) {
    try {
      if (tipo === 'habitos') {
        setLembreteHabitos(ativar);
        await AsyncStorage.setItem('lembreteHabitos', String(ativar));

        await atualizarAgendamento(
          tipo,
          ativar,
          horarioHabitos
        );
      } else {
        setLembreteTarefas(ativar);
        await AsyncStorage.setItem('lembreteTarefas', String(ativar));

        await atualizarAgendamento(
          tipo,
          ativar,
          horarioTarefas
        );
      }
    } catch (erro) {
      console.log('Erro ao atualizar lembrete:', erro);
      Alert.alert('Ops!', 'Não foi possível atualizar esse lembrete.');
    }
  }

  // Abre a seleção de horário
  function abrirSeletorHorario(tipo) {
    const horarioAtual =
      tipo === 'habitos' ? horarioHabitos : horarioTarefas;

    setHorarioTemporario(criarDataHorario(horarioAtual));
    setTipoHorario(tipo);
  }

  async function confirmarHorario() {
    const novoHorario = formatarHorario(horarioTemporario);

    try {
      if (tipoHorario === 'habitos') {
        setHorarioHabitos(novoHorario);
        await AsyncStorage.setItem('horarioHabitos', novoHorario);

        if (lembreteHabitos && notificacoesAtivas) {
          await atualizarAgendamento(
            'habitos',
            true,
            novoHorario
          );
        }
      } else {
        setHorarioTarefas(novoHorario);
        await AsyncStorage.setItem('horarioTarefas', novoHorario);

        if (lembreteTarefas && notificacoesAtivas) {
          await atualizarAgendamento(
            'tarefas',
            true,
            novoHorario
          );
        }
      }

      setTipoHorario(null);
    } catch (erro) {
      console.log('Erro ao alterar horário:', erro);
      Alert.alert('Ops!', 'Não foi possível alterar o horário.');
    }
  }

  function alterarDataHorario(event, dataSelecionada) {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && dataSelecionada) {
        setHorarioTemporario(dataSelecionada);

        const novoHorario = formatarHorario(dataSelecionada);
        const tipo = tipoHorario;

        setTipoHorario(null);

        if (tipo === 'habitos') {
          setHorarioHabitos(novoHorario);
          AsyncStorage.setItem('horarioHabitos', novoHorario);

          if (lembreteHabitos && notificacoesAtivas) {
            atualizarAgendamento('habitos', true, novoHorario);
          }
        } else if (tipo === 'tarefas') {
          setHorarioTarefas(novoHorario);
          AsyncStorage.setItem('horarioTarefas', novoHorario);

          if (lembreteTarefas && notificacoesAtivas) {
            atualizarAgendamento('tarefas', true, novoHorario);
          }
        }
      } else {
        setTipoHorario(null);
      }
    } else if (dataSelecionada) {
      setHorarioTemporario(dataSelecionada);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={23} color="#40543B" />
        </TouchableOpacity>

        <Text style={styles.titulo}>NOTIFICAÇÕES</Text>
      </View>

      <Text style={styles.subtitulo}>
        Organize seus lembretes e cuide da sua rotina com mais tranquilidade.
      </Text>

      <View style={styles.cardPrincipal}>
        <View style={styles.linha}>
          <View style={styles.iconePrincipal}>
            <Feather name="bell" size={23} color="#40543B" />
          </View>

          <View style={styles.textos}>
            <Text style={styles.tituloCard}>Ativar notificações</Text>
            <Text style={styles.descricao}>
              Receba lembretes do My Daily Bloom.
            </Text>
          </View>

          <Switch
            value={notificacoesAtivas}
            onValueChange={alterarNotificacoes}
            disabled={carregando}
            trackColor={{ false: '#D8D4C9', true: '#A8B59A' }}
            thumbColor={notificacoesAtivas ? '#40543B' : '#F5F5F5'}
          />
        </View>
      </View>

      <Text style={styles.tituloSecao}>Seus lembretes</Text>

      <View style={styles.card}>
        <View style={styles.linha}>
          <View style={styles.icone}>
            <Feather name="activity" size={21} color="#40543B" />
          </View>

          <View style={styles.textos}>
            <Text style={styles.tituloCard}>Hábitos</Text>
            <Text style={styles.descricao}>
              Lembretes para manter seus hábitos em dia.
            </Text>
          </View>

          <Switch
            value={lembreteHabitos}
            onValueChange={(valor) => alterarLembrete('habitos', valor)}
            disabled={!notificacoesAtivas || carregando}
            trackColor={{ false: '#D8D4C9', true: '#A8B59A' }}
            thumbColor={lembreteHabitos ? '#40543B' : '#F5F5F5'}
          />
        </View>

        <TouchableOpacity
          style={styles.linhaHorario}
          onPress={() => abrirSeletorHorario('habitos')}
          disabled={!notificacoesAtivas || !lembreteHabitos}
        >
          <Text style={styles.textoHorario}>Horário do lembrete</Text>
          <View style={styles.horario}>
            <Feather name="clock" size={15} color="#40543B" />
            <Text style={styles.valorHorario}>{horarioHabitos}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divisor} />

        <View style={styles.linha}>
          <View style={styles.icone}>
            <Feather name="check-square" size={21} color="#40543B" />
          </View>

          <View style={styles.textos}>
            <Text style={styles.tituloCard}>Tarefas</Text>
            <Text style={styles.descricao}>
              Não deixe suas tarefas importantes para depois.
            </Text>
          </View>

          <Switch
            value={lembreteTarefas}
            onValueChange={(valor) => alterarLembrete('tarefas', valor)}
            disabled={!notificacoesAtivas || carregando}
            trackColor={{ false: '#D8D4C9', true: '#A8B59A' }}
            thumbColor={lembreteTarefas ? '#40543B' : '#F5F5F5'}
          />
        </View>

        <TouchableOpacity
          style={styles.linhaHorario}
          onPress={() => abrirSeletorHorario('tarefas')}
          disabled={!notificacoesAtivas || !lembreteTarefas}
        >
          <Text style={styles.textoHorario}>Horário do lembrete</Text>
          <View style={styles.horario}>
            <Feather name="clock" size={15} color="#40543B" />
            <Text style={styles.valorHorario}>{horarioTarefas}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.aviso}>
        <Feather name="info" size={18} color="#8A806C" />
        <Text style={styles.textoAviso}>
          Os lembretes são enviados diariamente nos horários escolhidos,
          enquanto estiverem ativados.
        </Text>
      </View>

      <Modal
        visible={tipoHorario !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setTipoHorario(null)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Escolher horário</Text>

            <DateTimePicker
              value={horarioTemporario}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={alterarDataHorario}
              is24Hour
              textColor="#40543B"
            />

            {Platform.OS === 'ios' && (
              <View style={styles.botoesModal}>
                <TouchableOpacity
                  onPress={() => setTipoHorario(null)}
                  style={styles.botaoCancelar}
                >
                  <Text style={styles.textoCancelar}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmarHorario}
                  style={styles.botaoConfirmar}
                >
                  <Text style={styles.textoConfirmar}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    paddingTop: 60,
    paddingBottom: 50,
  },
  conteudo: {
    padding: 22,
    paddingBottom: 40,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titulo: {
    fontFamily: 'Iowan Old Style',
    fontSize: 22,
    color: '#40543B',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 21,
    color: '#77776C',
    marginBottom: 25,
  },
  cardPrincipal: {
    backgroundColor: '#E9EDE3',
    borderRadius: 18,
    padding: 17,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE9DE',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconePrincipal: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D9E1D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EEE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textos: {
    flex: 1,
    paddingRight: 8,
  },
  tituloCard: {
    fontSize: 15,
    fontWeight: '600',
    color: '#40543B',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 12,
    lineHeight: 17,
    color: '#858578',
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: '600',
    color: '#40543B',
    marginBottom: 13,
  },
  divisor: {
    height: 1,
    backgroundColor: '#EEE9DE',
    marginVertical: 16,
  },
  linhaHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingLeft: 52,
  },
  textoHorario: {
    fontSize: 12,
    color: '#858578',
  },
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0EEE5',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 12,
  },
  valorHorario: {
    fontSize: 13,
    fontWeight: '600',
    color: '#40543B',
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F1EDE2',
    padding: 15,
    borderRadius: 14,
    gap: 10,
  },
  textoAviso: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#777263',
  },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  conteudoModal: {
    width: '100%',
    backgroundColor: '#FBF9F1',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#40543B',
    marginBottom: 15,
  },
  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 12,
    marginTop: 15,
  },
  botaoCancelar: {
    padding: 12,
  },
  textoCancelar: {
    color: '#77776C',
    fontWeight: '600',
  },
  botaoConfirmar: {
    backgroundColor: '#40543B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  textoConfirmar: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

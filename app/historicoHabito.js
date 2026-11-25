import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebaseConfig';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function HistoricoHabito() {
  const router = useRouter();
  const { habitoId, titulo } = useLocalSearchParams();

  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [visualizacao, setVisualizacao] = useState('mes');
  const [dataReferencia, setDataReferencia] = useState(new Date());

  useEffect(() => {
    async function buscarHistorico() {
      try {
        const consulta = query(
          collection(db, 'registrosHabitos'),
          where('habitoId', '==', habitoId)
        );

        const resultado = await getDocs(consulta);

        const lista = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        lista.sort((a, b) => b.data.localeCompare(a.data));

        setRegistros(lista);
      } catch (erro) {
        console.log('ERRO AO BUSCAR HISTÓRICO:', erro);
      } finally {
        setCarregando(false);
      }
    }

    if (habitoId) {
      buscarHistorico();
    } else {
      setCarregando(false);
    }
  }, [habitoId]);

  const formatarData = (data) => {
    if (!data) return '';

    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarDataISO = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  };

  const obterStatus = (status) => {
    switch (status) {
      case 'concluido':
        return { texto: 'Concluído', cor: '#40543B' };

      case 'nao_realizado':
        return { texto: 'Não realizado', cor: '#C47A65' };

      default:
        return { texto: 'Pendente', cor: '#C49A6C' };
    }
  };

  const obterCorStatus = (status) => {
    switch (status) {
      case 'concluido':
        return '#40543B';

      case 'nao_realizado':
        return '#C47A65';

      case 'pendente':
        return '#C49A6C';

      default:
        return '#F3F0E8';
    }
  };

  // Organiza os registros por data
  const registrosPorData = {};

  registros.forEach((registro) => {
    registrosPorData[registro.data] = registro;
  });

  // Define o início e o fim da semana selecionada
  const inicioSemana = new Date(dataReferencia);
  const diaSemana = (inicioSemana.getDay() + 6) % 7;
  inicioSemana.setDate(inicioSemana.getDate() - diaSemana);
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(fimSemana.getDate() + 6);

  // Define o início e o fim do mês selecionado
  const inicioMes = new Date(
    dataReferencia.getFullYear(),
    dataReferencia.getMonth(),
    1
  );

  const fimMes = new Date(
    dataReferencia.getFullYear(),
    dataReferencia.getMonth() + 1,
    0
  );

  const inicioPeriodo =
    visualizacao === 'semana'
      ? formatarDataISO(inicioSemana)
      : formatarDataISO(inicioMes);

  const fimPeriodo =
    visualizacao === 'semana'
      ? formatarDataISO(fimSemana)
      : formatarDataISO(fimMes);

  const registrosDoPeriodo = registros.filter(
    (registro) => registro.data >= inicioPeriodo && registro.data <= fimPeriodo
  );

  const concluidos = registrosDoPeriodo.filter(
    (item) => item.status === 'concluido'
  ).length;

  const naoRealizados = registrosDoPeriodo.filter(
    (item) => item.status === 'nao_realizado'
  ).length;

  const pendentes = registrosDoPeriodo.filter(
    (item) => item.status === 'pendente'
  ).length;

  // Dias da semana selecionada
  const diasDaSemana = Array.from({ length: 7 }, (_, index) => {
    const data = new Date(inicioSemana);
    data.setDate(data.getDate() + index);

    return {
      data,
      dataISO: formatarDataISO(data),
      numero: data.getDate(),
      registro: registrosPorData[formatarDataISO(data)],
    };
  });

  // Dias do calendário mensal
  const primeiroDiaMes = inicioMes.getDay();
  const espacosIniciais = (primeiroDiaMes + 6) % 7;

  const diasDoMes = Array.from(
    { length: espacosIniciais + fimMes.getDate() },
    (_, index) => {
      if (index < espacosIniciais) {
        return null;
      }

      const numero = index - espacosIniciais + 1;
      const data = new Date(
        dataReferencia.getFullYear(),
        dataReferencia.getMonth(),
        numero
      );

      const dataISO = formatarDataISO(data);

      return {
        data,
        dataISO,
        numero,
        registro: registrosPorData[dataISO],
      };
    }
  );

  while (diasDoMes.length % 7 !== 0) {
    diasDoMes.push(null);
  }

  const mudarPeriodo = (direcao) => {
    const novaData = new Date(dataReferencia);

    if (visualizacao === 'semana') {
      novaData.setDate(novaData.getDate() + direcao * 7);
    } else {
      novaData.setDate(1);
      novaData.setMonth(novaData.getMonth() + direcao);
    }

    setDataReferencia(novaData);
  };

  const tituloPeriodo = () => {
    if (visualizacao === 'semana') {
      return `${formatarDataISO(inicioSemana).split('-').reverse().join('/')} - ${
        formatarDataISO(fimSemana).split('-').reverse().join('/')
      }`;
    }

    return `${MESES[dataReferencia.getMonth()]} de ${dataReferencia.getFullYear()}`;
  };

  const renderizarDia = (dia, pequeno = false) => {
    if (!dia) {
      return <View style={pequeno ? styles.diaVazioMes : styles.espacoVazio} />;
    }

    const cor = obterCorStatus(dia.registro?.status);
    const temRegistro = Boolean(dia.registro);

    return (
      <View
        style={[
          pequeno ? styles.celulaDia : styles.diaSemana,
          { backgroundColor: cor },
        ]}
      >
        <Text
          style={[
            pequeno ? styles.numeroCalendario : styles.numeroSemana,
            temRegistro && styles.numeroComRegistro,
          ]}
        >
          {dia.numero}
        </Text>

        {temRegistro && <View style={styles.marcadorDia} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoVoltar}>‹ Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>HISTÓRICO DO HÁBITO</Text>

        <Text style={styles.nomeHabito}>{titulo || 'Meu hábito'}</Text>

        {/* Alternância entre semana e mês */}
        <View style={styles.seletor}>
          <TouchableOpacity
            style={[
              styles.opcaoSeletor,
              visualizacao === 'semana' && styles.opcaoSelecionada,
            ]}
            onPress={() => setVisualizacao('semana')}
          >
            <Text
              style={[
                styles.textoSeletor,
                visualizacao === 'semana' && styles.textoSelecionado,
              ]}
            >
              Semana
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcaoSeletor,
              visualizacao === 'mes' && styles.opcaoSelecionada,
            ]}
            onPress={() => setVisualizacao('mes')}
          >
            <Text
              style={[
                styles.textoSeletor,
                visualizacao === 'mes' && styles.textoSelecionado,
              ]}
            >
              Mês
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navegação do período */}
        <View style={styles.navegacaoPeriodo}>
          <TouchableOpacity onPress={() => mudarPeriodo(-1)}>
            <Text style={styles.setaPeriodo}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.textoPeriodo}>{tituloPeriodo()}</Text>

          <TouchableOpacity onPress={() => mudarPeriodo(1)}>
            <Text style={styles.setaPeriodo}>›</Text>
          </TouchableOpacity>
        </View>

        {carregando ? (
          <ActivityIndicator
            size="large"
            color="#40543B"
            style={styles.carregando}
          />
        ) : (
          <>
            {/* Calendário semanal */}
            {visualizacao === 'semana' && (
              <View style={styles.cardCalendario}>
                <View style={styles.linhaDiasSemana}>
                  {diasDaSemana.map((dia, index) => (
                    <View key={dia.dataISO} style={styles.colunaSemana}>
                      <Text style={styles.nomeDiaSemana}>
                        {DIAS_SEMANA[index]}
                      </Text>
                      {renderizarDia(dia, false)}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Calendário mensal */}
            {visualizacao === 'mes' && (
              <View style={styles.cardCalendario}>
                <View style={styles.linhaCabecalhoMes}>
                  {DIAS_SEMANA.map((dia) => (
                    <View key={dia} style={styles.colunaMes}>
                      <Text style={styles.nomeDiaMes}>{dia}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.gradeCalendario}>
                  {diasDoMes.map((dia, index) => (
                    <View
                      key={dia?.dataISO || `vazio-${index}`}
                      style={styles.colunaMes}
                    >
                      {renderizarDia(dia, true)}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Legenda */}
            <View style={styles.legenda}>
              <View style={styles.itemLegenda}>
                <View style={[styles.bolinha, { backgroundColor: '#40543B' }]} />
                <Text style={styles.textoLegenda}>Concluído</Text>
              </View>

              <View style={styles.itemLegenda}>
                <View style={[styles.bolinha, { backgroundColor: '#C47A65' }]} />
                <Text style={styles.textoLegenda}>Não realizado</Text>
              </View>

              <View style={styles.itemLegenda}>
                <View style={[styles.bolinha, { backgroundColor: '#C49A6C' }]} />
                <Text style={styles.textoLegenda}>Pendente</Text>
              </View>
            </View>

            {/* Resumo do período */}
            <View style={styles.resumo}>
              <View style={styles.itemResumo}>
                <Text style={styles.numeroResumo}>{concluidos}</Text>
                <Text style={styles.textoResumo}>Concluídos</Text>
              </View>

              <View style={styles.itemResumo}>
                <Text style={[styles.numeroResumo, { color: '#C47A65' }]}>
                  {naoRealizados}
                </Text>
                <Text style={styles.textoResumo}>Não realizados</Text>
              </View>

              <View style={styles.itemResumo}>
                <Text style={[styles.numeroResumo, { color: '#C49A6C' }]}>
                  {pendentes}
                </Text>
                <Text style={styles.textoResumo}>Pendentes</Text>
              </View>
            </View>

            {/* Lista de ocorrências */}
            <Text style={styles.subtitulo}>Ocorrências do período</Text>

            {registrosDoPeriodo.length === 0 ? (
              <Text style={styles.mensagem}>
                Nenhum registro encontrado neste período.
              </Text>
            ) : (
              [...registrosDoPeriodo]
                .sort((a, b) => b.data.localeCompare(a.data))
                .map((registro) => {
                  const status = obterStatus(registro.status);

                  return (
                    <View key={registro.id} style={styles.cardRegistro}>
                      <View style={styles.informacoes}>
                        <Text style={styles.data}>
                          {formatarData(registro.data)}
                        </Text>

                        {registro.horarioConclusao && (
                          <Text style={styles.horario}>
                            Concluído às {registro.horarioConclusao}
                          </Text>
                        )}
                      </View>

                      <Text style={[styles.status, { color: status.cor }]}>
                        {status.texto}
                      </Text>
                    </View>
                  );
                })
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 100,
  },

  botaoVoltar: {
    marginBottom: 25,
  },

  textoVoltar: {
    fontSize: 17,
    color: '#40543B',
    fontWeight: '600',
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#40543B',
    fontFamily: 'Iowan Old Style',
  },

  nomeHabito: {
    fontSize: 18,
    color: '#8A8A7A',
    marginTop: 8,
  },

  seletor: {
    flexDirection: 'row',
    backgroundColor: '#EDE9DF',
    borderRadius: 14,
    padding: 4,
    marginTop: 25,
  },

  opcaoSeletor: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: 11,
  },

  opcaoSelecionada: {
    backgroundColor: '#40543B',
  },

  textoSeletor: {
    color: '#40543B',
    fontSize: 14,
    fontWeight: '600',
  },

  textoSelecionado: {
    color: '#FFFFFF',
  },

  navegacaoPeriodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  setaPeriodo: {
    fontSize: 30,
    color: '#40543B',
    paddingHorizontal: 10,
  },

  textoPeriodo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#40543B',
  },

  cardCalendario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginTop: 5,
  },

  linhaDiasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  colunaSemana: {
    alignItems: 'center',
    flex: 1,
  },

  nomeDiaSemana: {
    fontSize: 11,
    color: '#8A8A7A',
    marginBottom: 10,
  },

  diaSemana: {
    width: 36,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F0E8',
  },

  numeroSemana: {
    fontSize: 13,
    color: '#40543B',
    fontWeight: '600',
  },

  numeroComRegistro: {
    color: '#FFFFFF',
  },

  marcadorDia: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginTop: 3,
  },

  linhaCabecalhoMes: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  gradeCalendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  colunaMes: {
    width: '14.2857%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  nomeDiaMes: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8A7A',
  },

  celulaDia: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F3F0E8',
  },

  numeroCalendario: {
    fontSize: 13,
    color: '#40543B',
    fontWeight: '600',
  },

  diaVazioMes: {
    width: 36,
    height: 44,
  },

  espacoVazio: {
    width: 36,
    height: 48,
  },

  legenda: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 10,
  },

  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bolinha: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 5,
  },

  textoLegenda: {
    fontSize: 10,
    color: '#8A8A7A',
  },

  resumo: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
    justifyContent: 'space-around',
  },

  itemResumo: {
    alignItems: 'center',
  },

  numeroResumo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#40543B',
  },

  textoResumo: {
    fontSize: 11,
    color: '#8A8A7A',
    marginTop: 5,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40543B',
    marginTop: 30,
    marginBottom: 10,
  },

  cardRegistro: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  informacoes: {
    flex: 1,
  },

  data: {
    fontSize: 15,
    fontWeight: '600',
    color: '#40543B',
  },

  horario: {
    fontSize: 12,
    color: '#8A8A7A',
    marginTop: 5,
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  mensagem: {
    color: '#8A8A7A',
    textAlign: 'center',
    marginTop: 25,
  },

  carregando: {
    marginTop: 30,
  },
});
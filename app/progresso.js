
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebaseConfig';
import CardResumoProgresso from '../componentes/CardResumoProgresso';
import CardHabitoProgresso from '../componentes/CardHabitoProgresso';
import { gerarRegistrosHabitos } from '../servicos/registrosHabitos';
import GraficoDesempenho from '../componentes/GraficoDesempenho';
import HistoricoHabitosProgresso from '../componentes/HistoricoHabitosProgresso';
import { useRouter } from 'expo-router';

export default function Progresso() {
  const router = useRouter();
  const [registros, setRegistros] = useState([]);
  const [habitos, setHabitos] = useState([]);

  const [periodoSelecionado, setPeriodoSelecionado] = useState('hoje');
  const [registrosProntos, setRegistrosProntos] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const [mesSelecionado, setMesSelecionado] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [semanaSelecionada, setSemanaSelecionada] = useState(1);

  // Categorias oficiais do aplicativo
  const categorias = [
    { nome: 'Todas', cor: '#40543B' },
    { nome: 'SAÚDE', cor: '#D98B8B' },
    { nome: 'ESTUDOS', cor: '#7A9CC6' },
    { nome: 'TRABALHO', cor: '#C49A6C' },
    { nome: 'BEM-ESTAR', cor: '#8FAF7B' },
    { nome: 'OUTRA', cor: '#9B8FB5' },
  ];

  // Prepara hábitos e ocorrências
  useEffect(() => {
    async function prepararRegistros() {
      try {
        const resultadoHabitos = await getDocs(
          collection(db, 'habitos')
        );

        const listaHabitos = resultadoHabitos.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        setHabitos(listaHabitos);

        await gerarRegistrosHabitos(listaHabitos);

        setRegistrosProntos(true);
      } catch (erro) {
        console.log('ERRO AO PREPARAR REGISTROS:', erro);
      }
    }

    prepararRegistros();
  }, []);

  // Calcula o intervalo escolhido
  const obterIntervalo = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (periodoSelecionado === 'hoje') {
      return {
        inicio: hoje,
        fim: hoje,
      };
    }

    const ano = mesSelecionado.getFullYear();
    const mes = mesSelecionado.getMonth();

    if (periodoSelecionado === 'mes') {
      const ultimoDia = new Date(ano, mes + 1, 0);

      // Não considera dias futuros do mês atual
      if (
        ano === hoje.getFullYear() &&
        mes === hoje.getMonth()
      ) {
        return {
          inicio: new Date(ano, mes, 1),
          fim: hoje,
        };
      }

      return {
        inicio: new Date(ano, mes, 1),
        fim: ultimoDia,
      };
    }

    const primeiroDia = (semanaSelecionada - 1) * 7 + 1;
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

    const inicio = new Date(ano, mes, primeiroDia);
    let fim = new Date(
      ano,
      mes,
      Math.min(primeiroDia + 6, ultimoDiaMes)
    );

    if (inicio > hoje) {
      fim = inicio;
    } else if (fim > hoje) {
      fim = hoje;
    }

    return { inicio, fim };
  };

  const intervalo = obterIntervalo();

  const formatarDataConsulta = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  };

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    return `${dia}/${mes}`;
  };

  const formatarMes = (data) => {
    return data.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Filtra hábitos pela categoria selecionada
  const habitosFiltrados = categoriaSelecionada === 'Todas'
    ? habitos
    : habitos.filter(
        (habito) => habito.categoria === categoriaSelecionada
      );

  // Filtra registros pela categoria selecionada
  const registrosDaCategoria = categoriaSelecionada === 'Todas'
    ? registros
    : registros.filter(
        (registro) => registro.categoria === categoriaSelecionada
      );

  // Busca registros conforme o período
  useEffect(() => {
    if (!registrosProntos) return;

    async function buscarRegistrosDoPeriodo() {
      try {
        const dataInicio = formatarDataConsulta(intervalo.inicio);
        const dataFim = formatarDataConsulta(intervalo.fim);

        const consulta = query(
          collection(db, 'registrosHabitos'),
          where('data', '>=', dataInicio),
          where('data', '<=', dataFim)
        );

        const resultado = await getDocs(consulta);

        const lista = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        setRegistros(lista);

        console.log('REGISTROS DO PERÍODO:', lista);
      } catch (erro) {
        console.log('ERRO AO BUSCAR REGISTROS:', erro);
      }
    }

    buscarRegistrosDoPeriodo();
  }, [
    registrosProntos,
    periodoSelecionado,
    mesSelecionado,
    semanaSelecionada,
  ]);

  const quantidadeSemanas = Math.ceil(
    new Date(
      mesSelecionado.getFullYear(),
      mesSelecionado.getMonth() + 1,
      0
    ).getDate() / 7
  );

  const descricaoPeriodo =
    periodoSelecionado === 'hoje'
      ? 'Hoje'
      : periodoSelecionado === 'semana'
        ? `Semana ${semanaSelecionada}`
        : `Mês de ${formatarMes(mesSelecionado)}`;

  // Verifica se existem hábitos e registros para exibir
  const temRegistrosNaCategoria = registrosDaCategoria.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>MEU PROGRESSO</Text>

      {/* Seleção do período */}
      <View style={styles.seletorPeriodo}>
        {[
          { valor: 'hoje', titulo: 'Hoje' },
          { valor: 'semana', titulo: 'Semana' },
          { valor: 'mes', titulo: 'Mês' },
        ].map((opcao) => (
          <TouchableOpacity
            key={opcao.valor}
            style={[
              styles.botaoPeriodo,
              periodoSelecionado === opcao.valor &&
                styles.botaoPeriodoAtivo,
            ]}
            onPress={() => setPeriodoSelecionado(opcao.valor)}
          >
            <Text
              style={[
                styles.textoPeriodo,
                periodoSelecionado === opcao.valor &&
                  styles.textoPeriodoAtivo,
              ]}
            >
              {opcao.titulo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Seleção do mês */}
      {periodoSelecionado !== 'hoje' && (
        <View style={styles.selecaoMes}>
          <TouchableOpacity
            onPress={() => {
              setMesSelecionado((atual) =>
                new Date(
                  atual.getFullYear(),
                  atual.getMonth() - 1,
                  1
                )
              );
              setSemanaSelecionada(1);
            }}
          >
            <Text style={styles.setaMes}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.textoMes}>
            {formatarMes(mesSelecionado)}
          </Text>

          <TouchableOpacity
            disabled={
              mesSelecionado.getMonth() === new Date().getMonth() &&
              mesSelecionado.getFullYear() === new Date().getFullYear()
            }
            onPress={() => {
              setMesSelecionado((atual) =>
                new Date(
                  atual.getFullYear(),
                  atual.getMonth() + 1,
                  1
                )
              );
              setSemanaSelecionada(1);
            }}
          >
            <Text
              style={[
                styles.setaMes,
                mesSelecionado.getMonth() === new Date().getMonth() &&
                mesSelecionado.getFullYear() === new Date().getFullYear()
                  ? styles.setaDesativada
                  : null,
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Seleção da semana */}
      {periodoSelecionado === 'semana' && (
        <View style={styles.selecaoSemana}>
          <Text style={styles.rotulo}>Semana do mês:</Text>

          <View style={styles.listaSemanas}>
            {Array.from(
              { length: quantidadeSemanas },
              (_, indice) => indice + 1
            ).map((semana) => (
              <TouchableOpacity
                key={semana}
                style={[
                  styles.botaoSemana,
                  semanaSelecionada === semana &&
                    styles.botaoSemanaAtivo,
                ]}
                onPress={() => setSemanaSelecionada(semana)}
              >
                <Text
                  style={[
                    styles.textoSemana,
                    semanaSelecionada === semana &&
                      styles.textoSemanaAtivo,
                  ]}
                >
                  {semana}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Resumo geral */}
      <CardResumoProgresso
        registros={registros}
        periodo={`${formatarData(intervalo.inicio)} a ${formatarData(intervalo.fim)}`}
        periodoDescricao={descricaoPeriodo}
      />

      {periodoSelecionado !== 'hoje' && (
  <GraficoDesempenho
    registros={registrosDaCategoria}
    inicio={intervalo.inicio}
    fim={intervalo.fim}
  />
)}

      {/* Desempenho por hábito */}
      <Text style={styles.subtitulo}>Desempenho por hábito</Text>

      {/* Filtro de categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtroCategorias}
      >
        {categorias.map((categoria) => {
          const selecionada = categoriaSelecionada === categoria.nome;

          return (
            <TouchableOpacity
              key={categoria.nome}
              style={[
                styles.botaoCategoria,
                {
                  backgroundColor: selecionada
                    ? categoria.cor
                    : '#FFFFFF',
                  borderColor: categoria.cor,
                },
              ]}
              onPress={() => setCategoriaSelecionada(categoria.nome)}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  {
                    color: selecionada ? '#FFFFFF' : categoria.cor,
                  },
                ]}
              >
                {categoria.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Hábitos da categoria */}
       {!temRegistrosNaCategoria ? (
        <Text style={styles.mensagemSemRegistros}>
          Nenhum registro encontrado nesta categoria para o período selecionado.
        </Text>
      ) : (
        habitosFiltrados.map((habito) => (
          <CardHabitoProgresso
  key={habito.id}
  habito={habito}
  registros={registros}

  onVerHistorico={(habitoSelecionado) => {
    router.push({
      pathname: '/historicoHabito',
      params: {
        habitoId: habitoSelecionado.id,
        titulo: habitoSelecionado.titulo,
      },
    });
  }}

  onEditar={(habitoSelecionado) => {
    router.push({
      pathname: '/editarHabito',
      params: {
        habitoId: habitoSelecionado.id,
      },
    });
  }}
/>
        ))
      )}

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F1',
    paddingTop: 10,
    paddingBottom: 40,
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 100,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#40543B',
    fontFamily: 'Iowan Old Style',
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40543B',
    fontFamily: 'Iowan Old Style',
    marginTop: 30,
    marginBottom: 5,
  },

  seletorPeriodo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 16,
  },

  botaoPeriodo: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: '#E6CCB2',
  },

  botaoPeriodoAtivo: {
    backgroundColor: '#40543B',
  },

  textoPeriodo: {
    color: '#40543B',
    fontWeight: '600',
  },

  textoPeriodoAtivo: {
    color: '#FFFFFF',
  },

  selecaoMes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  setaMes: {
    fontSize: 30,
    color: '#40543B',
    paddingHorizontal: 15,
  },

  setaDesativada: {
    color: '#C8C8C0',
  },

  textoMes: {
    color: '#40543B',
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  selecaoSemana: {
    marginBottom: 15,
  },

  rotulo: {
    color: '#40543B',
    fontWeight: '600',
    marginBottom: 8,
  },

  listaSemanas: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoSemana: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6CCB2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoSemanaAtivo: {
    backgroundColor: '#40543B',
  },

  textoSemana: {
    color: '#40543B',
    fontWeight: '600',
  },

  textoSemanaAtivo: {
    color: '#FFFFFF',
  },

  filtroCategorias: {
    marginTop: 12,
    marginBottom: 5,
  },

  botaoCategoria: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },

  textoCategoria: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  mensagemSemRegistros: {
    textAlign: 'center',
    color: '#8A8A7A',
    fontSize: 14,
    marginTop: 25,
    marginBottom: 20,
  },
});

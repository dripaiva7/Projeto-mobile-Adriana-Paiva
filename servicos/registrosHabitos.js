
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const formatarData = (data) => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
};

export const gerarRegistrosHabitos = async (habitos) => {
    console.log('GERAÇÃO DE REGISTROS INICIADA:', habitos);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const hojeFormatado = formatarData(hoje);

  for (const habito of habitos) {
    if (!habito.dataCriacao || !Array.isArray(habito.dias)) {
      continue;
    }

    const dataInicio = new Date(habito.dataCriacao);
    dataInicio.setHours(0, 0, 0, 0);

    if (Number.isNaN(dataInicio.getTime())) {
      continue;
    }

    const dataOcorrencia = new Date(dataInicio);

    while (dataOcorrencia <= hoje) {
      const data = formatarData(dataOcorrencia);
      const diaSemana = diasDaSemana[dataOcorrencia.getDay()];

      console.log('VERIFICANDO OCORRÊNCIA:', {
  data,
  diaSemana,
  diasHabito: habito.dias,
  hoje: hojeFormatado,
});

      if (habito.dias.includes(diaSemana)) {
        const idData = data.replace(/-/g, '');

        const referencia = doc(
          db,
          'registrosHabitos',
          `${habito.id}_${idData}`
        );

        console.log('CONSULTANDO DOCUMENTO:', referencia.id);

const registro = await getDoc(referencia);

console.log('DOCUMENTO JÁ EXISTE?', registro.exists());
if (registro.exists()) {
  console.log('STATUS DO REGISTRO:', data, registro.data().status);
}

if (!registro.exists()) {
  await setDoc(referencia, {
            habitoId: habito.id,
            data: data,
            titulo: habito.titulo,
            descricao: habito.descricao,
            categoria: habito.categoria,
            horario: habito.horario,
            status: data < hojeFormatado
              ? 'nao_realizado'
              : 'pendente',
            horarioConclusao: null,
          });

          console.log('REGISTRO CRIADO COM SUCESSO:', referencia.id);

        } else if (
          data < hojeFormatado &&
          registro.data().status === 'pendente'
        ) {
          await setDoc(
            referencia,
            { status: 'nao_realizado' },
            { merge: true }
          );
        }
      }

      dataOcorrencia.setDate(dataOcorrencia.getDate() + 1);
    }
  }
};

export const atualizarStatusHabito = async (habitoId, data, concluido) => {
  const idData = data.replace(/-/g, '');

  const referencia = doc(
    db,
    'registrosHabitos',
    `${habitoId}_${idData}`
  );

  await setDoc(
    referencia,
    {
      status: concluido ? 'concluido' : 'pendente',
      horarioConclusao: concluido
        ? new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : null,
    },
    { merge: true }
  );
};

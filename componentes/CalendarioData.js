import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

export default function CalendarioData({
  visible,
  onClose,
  onConfirmar,
}) {

    const hoje = new Date();

    const [mesAtual, setMesAtual] = useState(new Date());
    const [dataSelecionada, setDataSelecionada] = useState(hoje);

    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();


    const nomesMeses = [
        'JANEIRO',
        'FEVEREIRO',
        'MARÇO',
        'ABRIL',
        'MAIO',
        'JUNHO',
        'JULHO',
        'AGOSTO',
        'SETEMBRO',
        'OUTUBRO',
        'NOVEMBRO',
        'DEZEMBRO',
    ];

    const primeiroDia = new Date(ano, mes, 1).getDay();

    const quantidadeDias = new Date(
        ano,
        mes + 1,
        0
    ).getDate();

    const dias = [];


    for (let i = 0; i < primeiroDia; i++) {
        dias.push(null);
    }

    for (let dia = 1; dia <= quantidadeDias; dia++) {
        dias.push(dia);
    }


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>

                <View style={styles.calendario}>

                    <Text style={styles.titulo}>
                        SELECIONE A DATA
                    </Text>

                    <View style={styles.cabecalhoMes}>

                        <TouchableOpacity
                            onPress={() => {
                                setMesAtual(
                                    new Date(
                                        mesAtual.getFullYear(),
                                        mesAtual.getMonth() - 1,
                                        1
                                    )
                                );
                            }}
                        >
                            <Text style={styles.seta}>‹</Text>
                        </TouchableOpacity>

                        <Text style={styles.mes}>
                            {nomesMeses[mes]} {ano}
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                                setMesAtual(
                                    new Date(
                                        mesAtual.getFullYear(),
                                        mesAtual.getMonth() + 1,
                                        1
                                    )
                                );
                            }}
                        >
                            <Text style={styles.seta}>›</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.diasSemana}>
                        <Text style={styles.diaSemana}>DOM</Text>
                        <Text style={styles.diaSemana}>SEG</Text>
                        <Text style={styles.diaSemana}>TER</Text>
                        <Text style={styles.diaSemana}>QUA</Text>
                        <Text style={styles.diaSemana}>QUI</Text>
                        <Text style={styles.diaSemana}>SEX</Text>
                        <Text style={styles.diaSemana}>SÁB</Text>
                    </View>

                    <View style={styles.grade}>
                        {dias.map((dia, index) => {

                            if (dia === null) {
                                return (
                                    <View
                                        key={index}
                                        style={styles.diaVazio}
                                    />
                                );
                            }

                            return (
                                <TouchableOpacity
                                key={index}
                                style={[
                                    styles.diaCalendario,
                                   dataSelecionada.getDate() === dia &&
                                    dataSelecionada.getMonth() === mes &&
                                    dataSelecionada.getFullYear() === ano
                                    ? styles.diaSelecionado
                                    : null,
                                ]}
                                onPress={() => {
                                    const novaData = new Date(
                                        ano,
                                        mes,
                                        dia
                                    );

                                    setDataSelecionada(novaData);
                                    }}>

                                    <Text
                                    style={[
                                        styles.numeroDia,
                                        dataSelecionada.getDate() === dia &&
                                        dataSelecionada.getMonth() === mes &&
                                        dataSelecionada.getFullYear() === ano
                                        ? styles.numeroDiaSelecionado
                                        : null,
                                    ]}
                                    >
                                    {dia}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.botoes}>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelar}>
                                CANCELAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                const novaData = new Date(
                                mesAtual.getFullYear(),
                                mesAtual.getMonth(),
                                diaSelecionado
                                );

                                onConfirmar(novaData);
                            }}
                            >
                            <Text style={styles.confirmar}>
                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    calendario: {
        width: '88%',
        backgroundColor: '#FDF6EA',
        borderRadius: 20,
        padding: 20,
    },

    titulo: {
        fontSize: 14,
        color: '#2C3E21',
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 15,
    },

    mes: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#40543B',
        textAlign: 'center',
    },

    cabecalhoMes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
        },

    seta: {
        fontSize: 28,
        color: '#40543B',
        paddingHorizontal: 10,
        },

    diasSemana: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    diaSemana: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#7F8C8D',
    },

    grade: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    diaVazio: {
        width: '14.28%',
        height: 38,
    },

    diaCalendario: {
        width: '14.28%',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },

    numeroDia: {
        fontSize: 12,
        color: '#2C3E21',
    },

    botoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 25,
        marginTop: 18,
    },

    cancelar: {
        fontSize: 15,
        color: '#999999',
    },

    confirmar: {
        fontSize: 15,
        color: '#40543B',
        fontWeight: 'bold',
    },
    diaSelecionado: {
    backgroundColor: '#E6CCB2',
    borderRadius: 19,
    },

    numeroDiaSelecionado: {
    fontWeight: 'bold',
    color: '#2C3E21',
    },
});
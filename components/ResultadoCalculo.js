import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ResultadoCalculo = ({ route }) => {
    const { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento, parcelaLabel } = route.params;

    const [modalVisible, setModalVisible] = React.useState(false);
    const [valorReverso, setValorReverso] = React.useState(0);

    const calcularResultado = () => {
        const valorReverso = calcularReverso(valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento);
        setValorReverso(valorReverso);
        setModalVisible(true);
    };

    const calcularReverso = (valor, taxaSelecionada, taxaParcela, taxaPrazo, formaPagamento) => {
        let valorTotal = 0;
        if (formaPagamento === 'debito') {
            valorTotal = parseFloat(valor) / (1 - (parseFloat(taxaSelecionada) / 100));
        } else if (formaPagamento === 'credito') {
            valorTotal = parseFloat(valor) / (1 - ((parseFloat(taxaParcela) + parseFloat(taxaPrazo)) / 100));
        }
        return valorTotal.toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado do Cálculo</Text>
            <Text style={styles.label}>Valor Inserido:</Text>
            <Text style={styles.value}>{valorInput}</Text>
            {formaPagamento === 'debito' ? (
                <>
                    <Text style={styles.label}>Taxa da Forma de Pagamento:</Text>
                    <Text style={styles.value}>{taxaSelecionada}</Text>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Taxa da Parcela:</Text>
                    <Text style={styles.value}>{taxaParcelaSelecionada}</Text>
                    <Text style={styles.label}>Taxa do Prazo:</Text>
                    <Text style={styles.value}>{taxaPrazoSelecionado}</Text>
                    <Text style={styles.label}>Forma de Pagamento:</Text>
                    <Text style={styles.value}>{formaPagamento}</Text>
                    <Text style={styles.label}>Quantidade de Parcelas:</Text>
                    <Text style={styles.value}>{parcelaLabel}</Text>
                </>
            )}
            <Text style={styles.label}>Valor com todas as taxas:</Text>
            <Text style={styles.value}>{valorTotal}</Text>

            <TouchableOpacity onPress={calcularResultado} style={styles.button}>
                <Text style={styles.buttonText}>Quando devo cobrar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Resultado</Text>
                        <Text style={styles.text}>Valor Inserido: {valorInput}</Text>
                        {formaPagamento === 'debito' ? (
                            <Text style={styles.text}>Taxa da Forma de Pagamento: {taxaSelecionada}</Text>
                        ) : (
                            <>
                                <Text style={styles.text}>Taxa da Parcela: {taxaParcelaSelecionada}</Text>
                                <Text style={styles.text}>Taxa do Prazo: {taxaPrazoSelecionado}</Text>
                                <Text style={styles.text}>Forma de Pagamento: {formaPagamento}</Text>
                                <Text style={styles.text}>Quantidade de Parcelas: {parcelaLabel}</Text>
                            </>
                        )}
                        <Text style={styles.text}>O valor que você deve cobrar é: {valorReverso}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
    },
    value: {
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 20,
        paddingVertical: 8,
        marginTop: 20,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    closeButtonText: {
        color: '#aaa',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ResultadoCalculo;

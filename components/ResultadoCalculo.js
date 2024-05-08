import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ResultadoCalculo = ({ route }) => {
    const { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento } = route.params;

    const [modalVisible, setModalVisible] = React.useState(false);
    const [valorReverso, setValorReverso] = React.useState(0);

    const calcularResultado = () => {

        console.log("Entrou aqui", valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento);
        // Lógica do cálculo aqui
        const valor1 = 10;
        const valor2 = 20;
        const resultadoCalculado = valor1 + valor2;

        const valorReverso = calcularReverso(valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento)
        setValorReverso(valorReverso);
    
      };
    
    const calcularReverso = (valor, taxaSelecionada, taxaParcela, taxaPrazo, formaPagamento) => {
        let valorTotal = 0;
        if (formaPagamento == 'debito') {
          valorTotal = parseFloat(valor)/(1 - (parseFloat(taxaSelecionada) / 100));
        } else if (formaPagamento == 'credito') {
          valorTotal = parseFloat(valor)/(1 - ((parseFloat(taxaParcela) + parseFloat(taxaPrazo)) / 100));
        }
        return valorTotal.toFixed(2);
      };
      
    return (
        <View>
            <Text>Valor Inserido: {valorInput}</Text>
            {formaPagamento === 'debito' ? (
                <Text>Taxa da Forma de Pagamento: {taxaSelecionada}</Text>
            ) : (
                <>
                <Text>Taxa da Parcela: {taxaParcelaSelecionada}</Text>
                <Text>Taxa do Prazo: {taxaPrazoSelecionado}</Text>
                <Text>Forma de Pagamento: {formaPagamento}</Text>
                </>
            )}
            <Text>Valor com todas as taxas: {valorTotal}</Text>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        calcularResultado(); // Chama a função de cálculo
                        setModalVisible(true); // Abre o modal
                        }} style={styles.button}>
                    <Text style={styles.buttonText}>Quanto devo cobrar?</Text>
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
                    <Text>Valor Inserido: {valorInput}</Text>
                        {formaPagamento === 'debito' ? (
                            <Text>Taxa da Forma de Pagamento: {taxaSelecionada}</Text>
                        ) : (
                            <>
                            <Text>Taxa da Parcela: {taxaParcelaSelecionada}</Text>
                            <Text>Taxa do Prazo: {taxaPrazoSelecionado}</Text>
                            <Text>Forma de Pagamento: {formaPagamento}</Text>
                            </>
                        )}
                        <Text style={styles.modalText}>O valor que você deve cobrar é: {valorReverso}</Text>
                        <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: '#2196F3' }}
                        onPress={() => setModalVisible(false)}
                        >
                        <Text style={styles.buttonText}>Fechar Modal</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    button: {
      backgroundColor: '#000',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default ResultadoCalculo;
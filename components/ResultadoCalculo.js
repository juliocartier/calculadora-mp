import React from 'react';
import { View, Text } from 'react-native';

const ResultadoCalculo = ({ route }) => {
    const { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento } = route.params;
  
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
        </View>
    );
  };

export default ResultadoCalculo;
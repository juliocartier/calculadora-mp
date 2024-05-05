import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from '@react-navigation/native';

const MaquinaPoint = () => {

  const navigation = useNavigation();

  const [valorInserido, onChangeNumber] = React.useState('');
  const [formaPagamento, setFormaPagamento] = React.useState('');
  const [tipoPagamento, setTipoPagamento] = React.useState('avista');
  const [parcelas, setParcelas] = React.useState('1');
  const [taxa, setTaxa] = React.useState('0%'); // Estado para armazenar a taxa
  const [prazo, setPrazo] = React.useState('Agora'); // Estado para armazenar o prazo
  const [valorTotal, setValorTotal] = React.useState(0);

  const formaPagamentoItems = [
    { label: 'Escolha a Opção', value: '' },
    { label: 'Débito', value: 'debito' },
    { label: 'Crédito', value: 'credito' }
  ];

  const tipoPagamentoItems = {
    debito: [
      { label: 'À vista', value: 'avista', taxa: '1.99' }
    ],
    credito: [
      { label: 'À vista', value: 'avista', taxa: '2' },
      { label: 'Parcelado', value: 'parcelado', taxa: '3' }
    ]
  };

  const parcelasItems = [
    { label: '1', value: '1', taxa: '0' },
    { label: '2', value: '2', taxa: '4.59' },
    { label: '3', value: '3', taxa: '5.97' },
    { label: '4', value: '4', taxa: '7.33' },
    { label: '5', value: '5', taxa: '8.66' },
    { label: '6', value: '6', taxa: '9.96' },
    { label: '7', value: '7', taxa: '11.24' },
    { label: '8', value: '8', taxa: '12.50' },
    { label: '9', value: '9', taxa: '13.73' },
    { label: '10', value: '10', taxa: '14.93' },
    { label: '11', value: '11', taxa: '16.12' },
    { label: '12', value: '12', taxa: '17.28' },
  ];

  const prazoItems = [
    { label: 'Agora', value: 'Agora', taxa: '5.31' },
    { label: '14 dias', value: '14', taxa: '4.36' },
    { label: '30 dias', value: '30', taxa: '3.60' }
  ];


  const handleCalcular = () => {

    let taxaSelecionada = '0';
    let taxaParcelaSelecionada = '0'; // Inicialize com uma taxa padrão para a parcela
    let taxaPrazoSelecionado = '0'; // Taxa do prazo selecionado

    const valorInput = valorInserido;
    
    if (tipoPagamento && tipoPagamentoItems[formaPagamento]) {
      const tipoPagamentoSelecionado = tipoPagamentoItems[formaPagamento].find(item => item.value === tipoPagamento);
      if (tipoPagamentoSelecionado && tipoPagamentoSelecionado.taxa) {
        taxaSelecionada = tipoPagamentoSelecionado.taxa;
      }
    }
  
    if (tipoPagamento === 'parcelado' && parcelas && parcelasItems) {
      const parcelaSelecionada = parcelasItems.find(item => item.value === parcelas);
      if (parcelaSelecionada && parcelaSelecionada.taxa) {
        taxaParcelaSelecionada = parcelaSelecionada.taxa;
      }
    }

      // Obtém a taxa do prazo selecionado
    if (prazo && prazoItems) {
      const prazoSelecionado = prazoItems.find(item => item.value === prazo);
      if (prazoSelecionado && prazoSelecionado.taxa) {
        taxaPrazoSelecionado = prazoSelecionado.taxa;
      }
    }


    // Exibe no console os valores selecionados e as taxas correspondentes
    // console.log("Valor Inserido", valorInput)
    // console.log("Forma de pagamento selecionada:", formaPagamento);
    // console.log("Tipo de pagamento selecionado:", tipoPagamento);
    // console.log("Parcelas selecionadas:", parcelas);
    // console.log("Prazo selecionado:", prazo);
    // console.log("Taxa da forma de pagamento selecionada:", taxaSelecionada);
    // console.log("Taxa da parcela selecionada:", taxaParcelaSelecionada);
    // console.log("Taxa do prazo selecionado:", taxaPrazoSelecionado);

    const valorTotal = calcularValorTotal(valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento);
    setValorTotal(valorTotal);

    // Exibindo o valor total no console
    navigation.navigate('ResultadoCalculo', { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento });
  };

  const calcularValorTotal = (valor, taxaSelecionada, taxaParcela, taxaPrazo, formaPagamento) => {

    let valorTotal = 0;
    if (formaPagamento == 'debito') {
      valorTotal = parseFloat(valor) * (1 - (parseFloat(taxaSelecionada)/100));
    } else if (formaPagamento == 'credito'){
      valorTotal = parseFloat(valor) * (1 - ((parseFloat(taxaParcela) + parseFloat(taxaPrazo))/100));
      console.log(valorTotal)
    }
    return valorTotal;
  };

  return (
    <SafeAreaView>
    <TextInput style={styles.input} onChangeText={onChangeNumber} value={valorInserido}
      placeholder="Digite o Valor." keyboardType="numeric"
    />
    <Text>Selecione a Forma de Pagamento</Text>
    <RNPickerSelect
        onValueChange={(value) => setFormaPagamento(value)}
        value={formaPagamento}
        items={formaPagamentoItems}
        placeholder={{ label: 'Selecione a forma de pagamento', value: '' }}
        style={pickerSelectStyles}
      />
      {formaPagamento && (
        <RNPickerSelect
          onValueChange={(value) => setTipoPagamento(value)}
          value={tipoPagamento}
          items={tipoPagamentoItems[formaPagamento]}
          placeholder={{ label: 'Selecione o tipo de pagamento', value: '' }}
          style={pickerSelectStyles}
        />
      )}
      {formaPagamento && (
        <RNPickerSelect
          onValueChange={(value) => setPrazo(value)}
          value={prazo}
          items={prazoItems}
          placeholder={{ label: 'Selecione o prazo', value: '' }}
          style={pickerSelectStyles}
        />
      )}
      {tipoPagamento === 'parcelado' && (
        <RNPickerSelect
          onValueChange={(value) => setParcelas(value)}
          value={parcelas}
          items={parcelasItems}
          placeholder={{ label: 'Selecione o número de parcelas', value: '' }}
          style={pickerSelectStyles}
        />
      )}
    <Button
      title="Calcular"
      onPress={handleCalcular}
    />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
      fontSize: 26,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default MaquinaPoint;

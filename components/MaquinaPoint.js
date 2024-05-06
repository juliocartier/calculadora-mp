import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, CheckBox } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';

const MaquinaPoint = () => {

  const navigation = useNavigation();

  const [valorInserido, setValorInserido] = React.useState('0,00');
  const [formaPagamento, setFormaPagamento] = React.useState('');
  const [tipoPagamento, setTipoPagamento] = React.useState('avista');
  const [parcelas, setParcelas] = React.useState('1');
  const [taxa, setTaxa] = React.useState('0%'); // Estado para armazenar a taxa
  const [prazo, setPrazo] = React.useState('Agora'); // Estado para armazenar o prazo
  const [valorTotal, setValorTotal] = React.useState(0);
  const [valorNecessario, setValorNecessario] = React.useState(false)

  const [selectedId, setSelectedId] = React.useState();
  const formaPagamentoItems = [
    // { label: 'Escolha a Opção', value: '' },
    { id: 1, label: 'Débito', value: 'debito', color: '#3CB2E5' },
    { id: 2, label: 'Crédito', value: 'credito', color: '#3CB2E5' }
  ];

  const handleValorChange = (text) => {
    // Remova todos os caracteres não numéricos do texto
    const formattedValue = text.replace(/\D/g, '');

    // Se o valor formatado estiver vazio, defina como '0'
    if (formattedValue === '') {
      setValorInserido('0,00');
      return;
    }

    // Converta o valor formatado para um número
    let amount = parseFloat(formattedValue) / 100;

    // Formate o valor como uma string
    const formattedAmount = amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Atualize o estado com o valor formatado
    setValorInserido(formattedAmount);
  };
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
    { label: '1x', value: '1', taxa: '0' },
    { label: '2x', value: '2', taxa: '4.59' },
    { label: '3x', value: '3', taxa: '5.97' },
    { label: '4x', value: '4', taxa: '7.33' },
    { label: '5x', value: '5', taxa: '8.66' },
    { label: '6x', value: '6', taxa: '9.96' },
    { label: '7x', value: '7', taxa: '11.24' },
    { label: '8x', value: '8', taxa: '12.50' },
    { label: '9x', value: '9', taxa: '13.73' },
    { label: '10x', value: '10', taxa: '14.93' },
    { label: '11x', value: '11', taxa: '16.12' },
    { label: '12x', value: '12', taxa: '17.28' },
  ];

  const prazoItems = [
    { label: 'Agora', value: 'Agora', taxa: '5.31' },
    { label: '14 dias', value: '14', taxa: '4.36' },
    { label: '30 dias', value: '30', taxa: '3.60' }
  ];

  const handleFormaPagamentoSelecionada = (formaPagamentoId) => {
    const selectedItem = formaPagamentoItems.find(item => item.id === formaPagamentoId);
    setFormaPagamento(selectedItem.value);
    setSelectedId(selectedItem ? selectedItem.id : undefined);
    console.log(formaPagamento)

  };

  const handleCalcular = () => {
    if (valorInserido === '0,00') {
      setValorNecessario(true);
      return;
    }

    let taxaSelecionada = '0';
    let taxaParcelaSelecionada = '0'; // Inicialize com uma taxa padrão para a parcela
    let taxaPrazoSelecionado = '0'; // Taxa do prazo selecionado

    const valorInput = parseFloat(valorInserido.replace(/\./g, '').replace(',', '.'));

    console.log(parseFloat(typeof valorInserido))

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
    //Exibir valor decimal aredondado p/ 2 casas decimais.
    setValorTotal(valorTotal);
    setValorNecessario(false);
    // Exibindo o valor total no console
    navigation.navigate('ResultadoCalculo', { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento });
  };


  const calcularValorTotal = (valor, taxaSelecionada, taxaParcela, taxaPrazo, formaPagamento) => {

    let valorTotal = 0;
    if (formaPagamento == 'debito') {
      valorTotal = parseFloat(valor) * (1 - (parseFloat(taxaSelecionada) / 100));
    } else if (formaPagamento == 'credito') {
      valorTotal = parseFloat(valor) * (1 - ((parseFloat(taxaParcela) + parseFloat(taxaPrazo)) / 100));
      console.log(valorTotal)
    }
    return valorTotal.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View>
        <View >
          <View style={styles.viewOpcoes}>
            <Text style={styles.textSubLabels}>Como será o pagamento? </Text>
            {<RadioGroup
              radioButtons={formaPagamentoItems}
              onPress={handleFormaPagamentoSelecionada}
              selectedId={selectedId}
              accessibilityLabel='aiai'
              layout='row'
              style={styles.radioButton}
            />}
          </View>
          <View style={styles.viewOpcoes}>
            {formaPagamento && (
              <RNPickerSelect
                onValueChange={(value) => setTipoPagamento(value)}
                value={tipoPagamento}
                items={tipoPagamentoItems[formaPagamento]}
                placeholder={{ label: 'Selecione o tipo de pagamento', value: '' }}
              />
            )}
          </View>
          <View style={styles.viewOpcoes}>
            {formaPagamento && (
              <RNPickerSelect
                onValueChange={(value) => setPrazo(value)}
                value={prazo}
                items={prazoItems}
                placeholder={{ label: 'Selecione o prazo', value: '' }}
              />
            )}
          </View>
          <View style={styles.viewOpcoes}>
            {tipoPagamento === 'parcelado' && (
              <RNPickerSelect
                onValueChange={(value) => setParcelas(value)}
                value={parcelas}
                items={parcelasItems}
                placeholder={{ label: 'Selecione o número de parcelas', value: '' }}
              />
            )}
          </View>
        </View>

        <View>
          <Text style={styles.textSubLabels}>Quanto deseja cobrar? </Text>
          <View style={styles.prefix}>
            <Text>R$</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={handleValorChange}
            value={valorInserido}
          />
          {valorNecessario && (
            <Text style={styles.aviso}>Insira um valor válido.</Text>
          )}
        </View>
        <View style={styles.viewBotao}>
          <TouchableOpacity
            onPress={handleCalcular}
            style={styles.botaoCalcular}
          ><Text style={styles.buttonLabel}>Calcular</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: '#3CB2E5',
    fontSize: 16,
    paddingLeft: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAndroid: {
    fontSize: 26,
    width: 0.3,
    borderWidth: '5px',
    borderColor: 'purple',
  },
  textSubLabels: {
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 5
  },
  prefix: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 5,
  },
  viewOpcoes: {
    paddingBottom: 20
  },
  itemOpcoes: {
    padding: 30,
    paddingVertical: 10
  },
  botaoCalcular: {
    backgroundColor: '#3CB2E5',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewBotao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    borderColor: '#3CB2E5',
    borderSize: 12
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  aviso: {
    color: '#E52207',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 10
  }

});

export default MaquinaPoint;
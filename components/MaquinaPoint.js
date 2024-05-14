import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, CheckBox } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import * as helperVars from '../helpers'

const MaquinaPoint = ({route}) => {
  const { slideItem } = route.params;
  
  const navigation = useNavigation();
  let parcelasItems, prazoItems, prazoItemsAVista, prazoItemsDebito, tipoPagamentoItems;

  const [valorInserido, setValorInserido] = React.useState('0,00');
  const [formaPagamento, setFormaPagamento] = React.useState('');
  const [tipoPagamento, setTipoPagamento] = React.useState('avista');
  const [parcelas, setParcelas] = React.useState('1');
  const [prazo, setPrazo] = React.useState('Agora'); // Estado para armazenar o prazo
  const [valorTotal, setValorTotal] = React.useState(0);
  const [valorNecessario, setValorNecessario] = React.useState(false)

  if (slideItem.id == 1) {
    parcelasItems = helperVars.parcelasItemsPoint;
    prazoItems = helperVars.prazoItemsPoint;
    prazoItemsAVista = helperVars.prazoItemsAVistaPoint;
    prazoItemsDebito = helperVars.prazoItemsDebitoPoint;
    tipoPagamentoItems = helperVars.tipoPagamentoItemsPoint;

  } else if (slideItem.id == 2) {
    parcelasItems = helperVars.parcelasItemsPointTap;
    prazoItems = helperVars.prazoItemsPointTap;
    prazoItemsAVista = helperVars.prazoItemsAVistaPointTap;
    prazoItemsDebito = helperVars.prazoItemsDebitoPointTap;
    tipoPagamentoItems = helperVars.tipoPagamentoItemsPointTap;
  } 

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

    let amount = parseFloat(formattedValue) / 100;

    const formattedAmount = amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Atualize o estado com o valor formatado
    setValorInserido(formattedAmount);
  };

  const handleFormaPagamentoSelecionada = (formaPagamentoId) => {
    const selectedItem = formaPagamentoItems.find(item => item.id === formaPagamentoId);
    console.log(selectedItem)
    setFormaPagamento(selectedItem.value);
    setSelectedId(selectedItem ? selectedItem.id : undefined);

    if (selectedId === 1) {
      setTipoPagamento('avista');
    } else if (selectedId === 2) {
      setTipoPagamento('avista');
      setParcelas('1');
    }

  };

  const getPrazoItems = () => {
    let prazoItemsSelecionado = [];

    const tipoPagamentoSelecionado = tipoPagamentoItems[formaPagamento].find(item => item.value === tipoPagamento);
    if (selectedId === 1 && tipoPagamentoSelecionado) {
      prazoItemsSelecionado = prazoItemsDebito;
    } else if (selectedId === 2 && tipoPagamentoSelecionado.value === 'avista') {
      prazoItemsSelecionado = prazoItemsAVista;
    } else if (selectedId === 2 && tipoPagamentoSelecionado.value === 'parcelado') {
      prazoItemsSelecionado = prazoItems;
    }
  
    return prazoItemsSelecionado;
  };

  const handleCalcular = () => {
    if (valorInserido === '0,00') {
      setValorNecessario(true);
      return;
    }

    let taxaSelecionada = '0';
    let taxaParcelaSelecionada = '0'; // Inicialize com uma taxa padrão para a parcela
    let taxaPrazoSelecionado = '0'; // Taxa do prazo selecionado
    let parcelaLabel = '1x';

    const valorInput = parseFloat(valorInserido.replace(/\./g, '').replace(',', '.'));

    // console.log(parseFloat(typeof valorInserido))

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
        parcelaLabel = parcelaSelecionada.label
      }
    }

    // Obtém a taxa do prazo selecionado
    if (prazo) {
      if (selectedId === 2 && tipoPagamento === 'avista') {
        const prazoSelecionado = prazoItemsAVista.find(item => item.value === prazo);
        if (prazoSelecionado && prazoSelecionado.taxa) {
          taxaPrazoSelecionado = prazoSelecionado.taxa;
        }
      } else if (selectedId === 2 && tipoPagamento === 'parcelado'){
        const prazoSelecionado = prazoItems.find(item => item.value === prazo);
        if (prazoSelecionado && prazoSelecionado.taxa) {
          taxaPrazoSelecionado = prazoSelecionado.taxa;
        }
      } else if (selectedId === 1){
        const prazoSelecionado = prazoItemsDebito.find(item => item.value === prazo);
        if (prazoSelecionado && prazoSelecionado.taxa) {
          taxaPrazoSelecionado = prazoSelecionado.taxa;
        }
      }
    }

    const valorTotal = calcularValorTotal(valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento);
    //Exibir valor decimal aredondado p/ 2 casas decimais.
    setValorTotal(valorTotal);
    setValorNecessario(false);
    // Exibindo o valor total no console
    navigation.navigate('ResultadoCalculo', { valorTotal, valorInput, taxaSelecionada, taxaParcelaSelecionada, taxaPrazoSelecionado, formaPagamento, parcelaLabel });
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
      <Text style={styles.tituloMaquineta}>{slideItem.title}</Text>
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
                placeholder={{ label: 'Selecione o tipo de Pagamento', value: '' }}
              />
            )}
          </View>
          <View style={styles.viewOpcoes}>
            {formaPagamento && (
              <RNPickerSelect
                onValueChange={(value) => setPrazo(value)}
                value={prazo}
                items={getPrazoItems()}
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
  tituloMaquineta: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    paddingTop: 5
  }

});

export default MaquinaPoint;
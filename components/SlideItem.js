import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { objetoEstaNaLista, modelosMaquineta, slides, direitos } from '../helpers';

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const handlePress = (slideItem) => {
    if (objetoEstaNaLista(slides, slideItem)) {
      console.log('render', slideItem.render);
      navigation.navigate(slideItem.render, { slideItem });
    } else {
      console.log('Error: ID not found');
    }
  };

  const handleSaibaMais = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
          <Text style={styles.buttonLabel}>Calcular</Text>
        </TouchableOpacity>
        <View style={styles.viewAvisoDireitos}>
          <Text style={styles.tituloAviso}>
            Este aplicativo não possui vínculo com as empresas de maquinetas de crédito.
            {'\n'}
            <Text style={styles.saibaMais} onPress={handleSaibaMais}>
              Saiba mais
            </Text>
          </Text>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitulo}>Aviso{'\n'}{'\n'}</Text>
              <Text style={styles.modalTexto}>{direitos}</Text>

            </ScrollView>
            <TouchableOpacity style={styles.botaoFechar} onPress={handleCloseModal}>
              <Text style={styles.botaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '85%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginVertical: 12,
    color: '#333',
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 16,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  viewAvisoDireitos: {
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 45,
    paddingRight: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tituloAviso: {
    fontSize: 13,
    color: '#404040',
    textAlign: 'center',
  },
  saibaMais: {
    textDecorationLine: 'underline',
    fontSize: 12,
    color: '#202020',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  botaoFechar: {
    backgroundColor: '#3CB2E5',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  botaoFecharTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

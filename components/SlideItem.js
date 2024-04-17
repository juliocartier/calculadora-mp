import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const idToActionMap = {
  1: 'FormularioInicial',
  2: 'Pagina2',
};

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);
  const navigation = useNavigation();

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const handlePress = () => {
    const action = idToActionMap[item.id];
    if (action) {
      navigation.navigate(action);
    } else {
      console.log('Error: ID not found');
    }
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
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonLabel}>Calcular</Text>
        </TouchableOpacity>
      </View>
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
    paddingLeft: 10,
    paddingRight: 10,
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
});

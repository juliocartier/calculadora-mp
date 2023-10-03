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
  import React from 'react';
  
  const { width, height } = Dimensions.get('screen');

  const idToActionMap = {
    1: 'Pagina1',
    2: 'Pagina2',
  };
  
  const SlideItem = ({ item }) => {
    const translateYImage = new Animated.Value(40);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
                const action = idToActionMap[item.id];
                if (action) {
                //   navigation.navigate(action);
                  console.log(item.id, action)
                } else {
                  console.log('Error: ID not found')
                }
            }}
          >
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
      width: '100%',
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
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
      paddingRight: 10
    },
    price: {
      fontSize: 32,
      fontWeight: 'bold',
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
  
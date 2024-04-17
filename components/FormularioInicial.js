import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FormularioInicial = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a página FormularioInicial</Text>
    </View>
  );
};

export default FormularioInicial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

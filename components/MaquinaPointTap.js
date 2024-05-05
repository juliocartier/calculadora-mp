import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MaquinaPointTap = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a página FormularioInicial</Text>
    </View>
  );
};

export default MaquinaPointTap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

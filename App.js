import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useRef, useState } from 'react';
import Slider from './components/Slider';

export default function App() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Slider ref={sliderRef} onIndexChanged={(newIndex) => setIndex(newIndex)} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

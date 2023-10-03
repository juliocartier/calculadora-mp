import React, { useRef, useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const Slider = ({ onIndexChanged }, ref) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;
  

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const goForward = () => {
    if (index < Slides.length - 1) {
      setIndex(index + 1);
    }
  };

  const goBackward = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (onIndexChanged) {
      onIndexChanged(index);
    }
  }, [index, onIndexChanged]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <SlideItem item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '100%',
  },
});

export default React.forwardRef(Slider);

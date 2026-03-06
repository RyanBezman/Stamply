import React, { useRef } from 'react';
import { Animated, ImageStyle, StyleProp } from 'react-native';

export const FadeInImage = ({
  uri,
  style,
  duration = 220,
}: {
  uri: string;
  style?: StyleProp<ImageStyle>;
  duration?: number;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  return (
    <Animated.Image
      source={{ uri }}
      style={[style, { opacity }]}
      onLoad={() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start();
      }}
    />
  );
};

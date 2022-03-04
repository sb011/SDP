import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default ({ name, minimum, maximum, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
    <Slider
      style={styles.slider}
      minimumValue={minimum}
      maximumValue={maximum}
      onValueChange={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingLeft: 20,
    marginTop: 5
  },
  text: { 
    textAlign: 'center' 
  },
  slider: { 
    width: 150 
  },
});

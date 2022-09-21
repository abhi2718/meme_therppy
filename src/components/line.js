import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Line = ({text = 'OR'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      <View>
        <Text style={{width: 50, textAlign: 'center'}}>{text}</Text>
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
});

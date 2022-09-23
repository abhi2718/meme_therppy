import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, View, Button} from 'react-native';
import Simple from '../components/swiper';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components';
import Share from 'react-native-share';
const stream = require('getstream');
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 30px;
`;
export const HomeScreen = () => {
  const customShare = async () => {
    const shareOptions = {
      message: 'this is a test message',
      url: 'data:image/jpeg;base64,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',
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Simple />
      <Row>
        <Button
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            });
          }}
          title="Upload"
        />
        <Button
          onPress={() => {
            customShare();
          }}
          title="Share"
        />
      </Row>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const client = stream.connect(
//   'umn9bfznh9ay',
//   'ja9qa2ac8tmendx3sn2jfggg9pnfvh7mngk5pr6w9q3dr9e8kmx2946284bd64nz',
//   '1210354',
//   { location: 'Singapore' },
// );
// console.log('client is',client);
// console.log('stream is', stream.connect);

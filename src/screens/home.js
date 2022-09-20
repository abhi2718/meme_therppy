import React,{useEffect} from "react";
import {SafeAreaView,StyleSheet,Image,View,Button} from 'react-native';
import Simple from '../components/swiper';
import ImagePicker from 'react-native-image-crop-picker';
const stream = require('getstream');
export const HomeScreen=()=>{
  useEffect(()=>{
    // const client = stream.connect(
    //   'umn9bfznh9ay',
    //   'ja9qa2ac8tmendx3sn2jfggg9pnfvh7mngk5pr6w9q3dr9e8kmx2946284bd64nz',
    //   '1210354',
    //   { location: 'Singapore' },
    // );
    // console.log('client is',client);
    console.log('stream is',stream.connect);
  });
    return(
      <SafeAreaView style={styles.container}>
      {/* <Simple /> */}
      <Button onPress={()=>{
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
      }} title="Upload" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
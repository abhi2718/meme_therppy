import React from "react";
import {SafeAreaView,StyleSheet,Image} from 'react-native';
export const SplashScreen=()=>{
    return(
      <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/splash.png')} />
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
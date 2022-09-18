import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../../screens/home';
import {SignupScreen} from '../../screens/auth.screens/signup';
import {SignInScreen} from '../../screens/auth.screens/signin';
export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
       options={{headerShown: false}}  
       name="signup" component={SignupScreen} 
       />
      <Stack.Screen 
       options={{headerShown: false}}  
       name="signin" component={SignInScreen} 
       />
       <Stack.Screen 
       options={{headerShown: false}}  
       name="home" component={HomeScreen} 
       />
    </Stack.Navigator>
  );
};
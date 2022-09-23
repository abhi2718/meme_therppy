import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../../screens/home';
import {SignupScreen} from '../../screens/auth.screens/signup';
import {SignInScreen} from '../../screens/auth.screens/signin';
import {BottomTabNavigator} from '../tab_navigators/bottom_tab';
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
       name="home" component={BottomTabNavigator} 
       />
    </Stack.Navigator>
  );
};
//search
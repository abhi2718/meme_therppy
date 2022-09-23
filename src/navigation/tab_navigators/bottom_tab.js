import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();
import {View,Text} from 'react-native';
import {HomeScreen} from '../../screens/home';

const Screen1= ({})=>{
    return(
        <View>
            <Text>Screen 1</Text>
        </View>
    );
}
const Screen2= ({})=>{
    return(
        <View style={{
            flex:1,
           justifyContent:"center",
           alignItems: "center"
           }}>
            <Text>Home Screen</Text>
        </View>
    );
}
const Screen3= ({})=>{
    return(
        <View style={{
            flex:1,
           justifyContent:"center",
           alignItems: "center"
           }}>
            <Text>Chat Screen</Text>
        </View>
    );
}
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TapTab = createMaterialTopTabNavigator();
const HealthScreen = ({})=>{
    return(
        <View style={{
            flex:1,
           justifyContent:"center",
           alignItems: "center"
           }}>
            <Text>Health Screen</Text>
        </View>
    );
}
const FeedScreen = ({})=>{
    return(
        <View style={{
            flex:1,
           justifyContent:"center",
           alignItems: "center"
           }}>
            <Text>Feed Screen</Text>
        </View>
    );
}
const StatsScreen = ({})=>{
    return(
        <View style={{
            flex:1,
           justifyContent:"center",
           alignItems: "center"
           }}>
            <Text>Health Screen</Text>
        </View>
    );
}
const  MyTabs=()=> {
  return (
    <TapTab.Navigator>
      <TapTab.Screen name="My Feed" component={FeedScreen} />
      <TapTab.Screen name="Health" component={HealthScreen} />
      <TapTab.Screen name="Stats" component={StatsScreen} />
    </TapTab.Navigator>
  );
}
const Screen4= ({})=>{
    return(
        <View style={{
            flex:1,
           
           }}>
            <MyTabs/>
        </View>
    );
}
const screenOptions= ({route})=>({
    tabBarShowLabel:false,
    tabBarIcon: ({focused, color, size}) => {
        let iconName, title, labelColor;
        if (route.name === 'screen1') {
          title = 'screen1';
          iconName = focused ? 'grip-horizontal' : 'grip-horizontal';
          labelColor = focused ? 'blue' : 'black';
        } else if (route.name === 'screen2') {
          title = 'screen2';
          iconName = focused ? 'search' : 'search';
          labelColor = focused ? 'blue' : 'black';
        } else if (route.name === 'screen3') {
          title = 'screen3';
          iconName = focused ? 'comment' : 'comment';
          labelColor = focused ? 'blue' : 'black';
        }else if (route.name === 'screen4') {
            title = 'screen4';
            iconName = focused ? 'user' : 'user';
            labelColor = focused ? 'blue' : 'black';
          }
        return  <Icon name={iconName} size={16} color={labelColor} />
      },
});
export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName={"screen2"}>
      <Tab.Screen 
       name="screen1" 
       component={HomeScreen}  
       options={{headerShown: false}}  
      />
      <Tab.Screen 
        name="screen2" 
        component={Screen2} 
        options={{headerShown: false}}  
      />
      <Tab.Screen 
        name="screen3" 
        component={Screen3} 
        options={{headerShown: false}}  
      />
      <Tab.Screen 
        name="screen4" 
        component={Screen4} 
        options={{headerShown: false}}  
      />
    </Tab.Navigator>
  );
};
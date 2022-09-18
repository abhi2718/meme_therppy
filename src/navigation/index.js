import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './stack_navigators/app_navigator';
const Navigator = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
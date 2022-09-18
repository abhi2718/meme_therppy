import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {SplashScreen} from '../../screens/splash';
import {HomeNavigator} from '../stack_navigators/home_navigator';
import {getResourceAction} from '../../store/actions/resource_action/res_action';
export const AppNavigator = () => {
  const {loading} = useSelector(state => state. resourceStore);
  const dispatch = useDispatch();
  useEffect(()=>{
    setTimeout(() => {
        dispatch(getResourceAction(1));
    }, 2000);
  },[])
  if(loading){
    return <SplashScreen/>
  }else{
    return <HomeNavigator/>;
  }
};
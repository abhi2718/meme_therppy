import React,{useEffect,useState} from 'react';
import {StatusBar,SafeAreaView,View,Text,Pressable} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './src/store/reducers/root_reducer/root.reducer';
import Navigator from './src/navigation/index';
const App = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2',{
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        const data = await response.json();
        if(response.statusCode === 200){
           console.log('data is',data);
        }else{
          console.log('data is from else',data);
        }
      } catch (error) {
        alert('Network request failed');
        console.log('error is',error);
        // if (error.message === 'Network request failed') {
        //   // retry or any other handling like showing alert 
        //   alert('Network request failed');
        // } else {
        //   console.log('error',error);
        //   throw e; 
        // }
      }
    }
    fetchData();
  },[])
  return (
    <>
      <StatusBar backgroundColor={'#1481D0'} barStyle={'dark-content'} />
      <Provider store={store}>
      <Navigator/>
      </Provider>
    </>
  );
};

export default App;

 //import {APP_ID} from '@env';
 //const stream = require('getstream');
 // useEffect(()=>{
  //   const client = stream.connect(
  //     'umn9bfznh9ay',
  //   );
  //   console.log('connect with server',APP_ID);
  //   const user =  client.feed('user', 'bylld3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6IioifQ.7EzZBjMj46fSOAlruu7mjiBcekB12PuTYmWUh0zNxfQ');
  //         user.get()
  //         .then((data)=>{
  //           console.log(data);
  //           setFeedArray(data.results)
  //         })
  //         .catch((error)=>{
  //           console.log('error is',error);
  //         });
  // });
/* <SafeAreaView style={{flex:1}}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       {
        feedArray.map((feed)=>{
         return ( 
         <View key={feed.foreign_id}>
          <Text>{feed.foreign_id}</Text>
          <Text>{feed.actor}</Text>
        </View>);
        })
      }
    </View>
</SafeAreaView> */
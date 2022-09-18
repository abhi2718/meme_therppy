import React,{useState} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {LoginManager,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {
    View,
    Text,SafeAreaView,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    Pressable
 } from 'react-native';
import styled from 'styled-components';
import { TextInput,Button } from 'react-native-paper';
import {Spacer}  from '../../components/spacer';
import {Line} from '../../components/line';
const Container = styled.View`
padding:10px;
flex:1;
width:${()=>`${Dimensions.get('window').width}px`}
`;
const Body=styled.View`
flex:0.9;
padding:16px;
`;
const Footer=styled.View`
flex:0.1;
justify-content:center;
align-items:center;
`;
const Heading=styled.Text`
text-align:center;
color:blue;
font-size:20px;
`;
const Row=styled.View`
flex-direction:row;
justify-content:center;
`;
const FieldContainer=styled.View`
padding-top:20px;
`;
const BtnConatiner=styled.View`
padding-top:20px;
flex-direction:row;
justify-content:center;
align-items:center;
`; 
const LineConatiner=styled.View`
width:200px;
`;
export const SignInScreen=({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFbLogIn= async()=>{
      try{
         await fbLogin(responseInfoCallback);
      }catch(e){
         console.log('error: ' + e);
      }
  }
  const fbLogin=(resCallback)=>{
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email','public_profile']).then(result=>{
      console.log('result is: ' + result);
      if(result.declinedPermissions && result.declinedPermissions.includes('email')){
         resCallback('Email is required');
      }
      if(result.isCancelled){
        console.log('error')
      }else{
       const infoRequest= new GraphRequest(
        '/me?fields=email,name,picture',
        null,
        resCallback
       );
       new GraphRequestManager().addRequest(infoRequest).start();
      }
    },(error)=> {
      console.log("Login fail with error: " + error);
    })
    }
  const responseInfoCallback = async(error,result)=>{
     if(error){
      console.log('error: ' + error);
     }else{
      const userData = result;
      setEmail(userData.email);
      console.log('user data: ',{
        name: userData.name.split(' ')[0],
        email: userData.email,
        picture:userData.picture,
      });
     }
  };
    return(
        <SafeAreaView style={styles.container}> 
            <Container>
                <Heading>Signin to Your Account </Heading>
                <Body>
                    <FieldContainer>
                     <TextInput
                      label="Email"
                      value={email}
                      mode='outlined'
                      onChangeText={text => setEmail(text)}
                     />
                   </FieldContainer>   
                   <FieldContainer>
                     <TextInput
                      label="Password"
                      value={password}
                      mode='outlined'
                      onChangeText={text => setPassword(text)}
                     />
                   </FieldContainer>  
                   <BtnConatiner>
                   <Button 
                    mode="contained"
                    style={{backgroundColor: 'green'}}
                    contentStyle={styles.btnStyle}
                    onPress={() => console.log('Pressed')}>
                    Sign In
                    </Button>
                   </BtnConatiner>
                   <Spacer
                    position={'top'}
                    size={'40'}
                   />
                    <Row>
                      <LineConatiner>
                       <Line />
                      </LineConatiner>
                    </Row>
                    <Spacer
                    position={'top'}
                    size={'10'}
                    />
                    <Button 
                    mode="contained"
                    style={styles.btnColor}
                    contentStyle={styles.btnStyle}
                    onPress={() => onFbLogIn()}>
                    Sign in with facebook
                    </Button>
                    <Spacer
                    position={'top'}
                    size={'20'}
                   />
                   <Button 
                    mode="contained"
                    style={styles.btnColor}
                    contentStyle={styles.btnStyle}
                    onPress={() => console.log('Pressed')}>
                    sign in with google
                   </Button>
                    <Spacer
                    position={'top'}
                    size={'40'}
                    />
                    <Row>
                    <Text>
                        Don't have Account ? 
                    </Text>
                    <Pressable onPress={()=>{
                        navigation.navigate('signup');
                    }}>
                      <Text style={styles.signInText}> Register</Text>
                    </Pressable>
                    </Row>
                </Body>
            </Container>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFFFFF',
    },
    signInText:{color: 'blue'},
    btnStyle:{
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnColor:{
        backgroundColor: 'blue',
    }
  });
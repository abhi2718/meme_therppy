import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {LoginManager,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
    View,
    Text,SafeAreaView,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    Pressable,
    Modal,
 } from 'react-native';
import styled from 'styled-components';
import SelectDropdown from 'react-native-select-dropdown';
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
const Label =styled.Text`
 font-size:16px;
 padding:10px;
`;

export const SignupScreen=({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [agegroup, setAgeGroup] = useState("");
    const [gender,setGender] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const ageGroup = ["10 - 15", "25 -45", "50 -55", "55 -80"];
    const genderList = ["Male", "Female"];
    useEffect(()=>{
      GoogleSignin.configure();
    },[]);
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
    const onFbLogIn= async()=>{
        try{
           await fbLogin(responseInfoCallback);
        }catch(e){
           console.log('error: ' + e);
        }
    }
    const responseInfoCallback = async(error,result)=>{
       if(error){
        console.log('error: ' + error);
       }else{
        const userData = result;
        setEmail(userData.email);
        setFirstName(userData.name.split(' ')[0]);
        setLastName(userData.name.split(' ')[1]);
        setModalVisible(true); 
        console.log('user data: ',{
          name: userData.name.split(' ')[0],
          email: userData.email,
          picture:userData.picture,
        });
       }
    };
    const googleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo.user);
        setEmail(userInfo.user.email);
        setFirstName(userInfo.user.givenName);
        setLastName(userInfo.user.familyName);
        setModalVisible(true);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log(error);
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          console.log(error);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log(error);
        } else {
          // some other error happened
          console.log(error);
        }
      }
    };
    const signUp = ()=>{
        if(email === '' || email === undefined){
            return;
        }
        if(password === '' || password === undefined){
            return;
        }
        auth().createUserWithEmailAndPassword(email,password)
        .then((data) => {
          console.log('User account created & signed in!',data.user);
          setEmail(data.user.email);
        })
        .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
         console.error(error);
        });
        setModalVisible(true); 
    }
    return(
        <SafeAreaView style={styles.container}> 
            <Container>
                <Heading>Sign up </Heading>
                <Body>
                    <Row>
                    <Text>
                        Already a member ? 
                    </Text>
                    <Pressable onPress={()=>{
                        navigation.navigate('signin');
                    }}>
                      <Text style={styles.signInText}> Sign in</Text>
                    </Pressable>
                    </Row>
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
                    onPress={() => {
                        signUp();
                    }}>
                    Continue
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
                    onPress={onFbLogIn}>
                    Sign up with facebook
                    </Button>
                    <Spacer
                    position={'top'}
                    size={'20'}
                   />
                    <Button 
                    mode="contained"
                    style={styles.btnColor}
                    contentStyle={styles.btnStyle}
                    onPress={() => googleSignIn()}>
                    sign up with google
                    </Button>
                </Body>
               <Footer>
                <Row>
                 <Pressable onPress={()=>{alert("Please");}}>
                    <Text style={styles.signInText}> Terms & Condations ?</Text>
                 </Pressable>
                </Row>
               </Footer>
               <Modal
                animationType="slide"
                visible={modalVisible}
                >
                    <SafeAreaView style={styles.container}>
                        <Container>
                        <Heading>Tell us a little about you</Heading>
                        <Body>
                         <FieldContainer>
                           <Label>First Name</Label>
                          <TextInput
                           label="First Name"
                           value={firstName}
                           mode='outlined'
                           onChangeText={text => setFirstName(text)}
                          />
                         </FieldContainer>
                         <FieldContainer>
                         <Label>Last Name</Label>
                          <TextInput
                            label="Last Name"
                            value={lastName}
                            mode='outlined'
                            onChangeText={text => setLastName(text)}
                          />
                        </FieldContainer>
                        <Label>Age Group</Label>
                        <SelectDropdown
	                       data={ageGroup}
	                       onSelect={(selectedItem, index) => {
                               setAgeGroup(selectedItem);
	                         }}
	                        buttonTextAfterSelection={(selectedItem, index) => {
		                    return selectedItem
	                        }}
	                        rowTextForSelection={(item, index) => {
	                	    return item
	                      }}
                         />
                         <Label>Gender</Label>
                        <SelectDropdown
	                       data={genderList}
	                       onSelect={(selectedItem, index) => {
                               setGender(selectedItem);
	                         }}
	                        buttonTextAfterSelection={(selectedItem, index) => {
		                    return selectedItem
	                        }}
	                        rowTextForSelection={(item, index) => {
	                	    return item
	                      }}
                         />
                         <BtnConatiner>
                         <Button 
                          mode="contained"
                          style={{backgroundColor: 'green'}}
                          contentStyle={styles.btnStyle}
                          onPress={() => {
                           navigation.navigate('home');
                           setModalVisible(false);
                          }}>
                          Continue
                         </Button>
                         </BtnConatiner>
                        </Body>
                        </Container>
                    </SafeAreaView>
                </Modal>
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
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import {TextInput, Button} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Spacer} from '../../components/spacer';
import {Line} from '../../components/line';
const Container = styled.View`
  padding: 10px;
  flex: 1;
  width: ${() => `${Dimensions.get('window').width}px`};
`;
const Body = styled.View`
  flex: 0.9;
  padding: 16px;
`;
const Footer = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
`;
const Heading = styled.Text`
  text-align: center;
  color: blue;
  font-size: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const FieldContainer = styled.View`
  padding-top: 20px;
`;
const BtnConatiner = styled.View`
  padding-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LineConatiner = styled.View`
  width: 200px;
`;
export const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const onFbLogIn = async () => {
    try {
      await fbLogin(responseInfoCallback);
    } catch (e) {
      console.log('error: ' + e);
    }
  };
  const fbLogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('result is: ' + result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback('Email is required');
        }
        if (result.isCancelled) {
          console.log('error');
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('error: ' + error);
    } else {
      const userData = result;
      setEmail(userData.email);
      console.log('user data: ', {
        name: userData.name.split(' ')[0],
        email: userData.email,
        picture: userData.picture,
      });
      navigation.navigate('home');
    }
  };
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo are',userInfo.user);
      navigation.navigate('home');
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
  const signIn = () => {
    if (email === '' || email === undefined) {
      return;
    }
    if (password === '' || password === undefined) {
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('User account created & signed in!', data.user);
        setEmail(data.user.email);
        navigation.navigate('home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('Please enter a valid email address');
        }
        if(error.code === 'auth/wrong-passwor') {
          console.log('invalid password');
          alert('Please enter a valid password');
        }if(error.code === 'auth/user-not-found'){
          console.log('user not found!');
          alert('user not found!');
        }
        console.error(error);
      });
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Heading>Signin to Your Account </Heading>
        <Body>
          <FieldContainer>
            <TextInput
              label="Email"
              value={email}
              mode="outlined"
              onChangeText={text => setEmail(text)}
            />
          </FieldContainer>
          <FieldContainer>
            <TextInput
              label="Password"
              value={password}
              mode="outlined"
              onChangeText={text => setPassword(text)}
            />
          </FieldContainer>
          <BtnConatiner>
            <Button
              mode="contained"
              style={{backgroundColor: 'green'}}
              contentStyle={styles.btnStyle}
              onPress={() => {
                //signIn();
                navigation.navigate('home');
              }}>
              Sign In
            </Button>
          </BtnConatiner>
          <Spacer position={'top'} size={'40'} />
          <Row>
            <LineConatiner>
              <Line />
            </LineConatiner>
          </Row>
          <Spacer position={'top'} size={'10'} />
          <Button
            mode="contained"
            style={styles.btnColor}
            contentStyle={styles.btnStyle}
            onPress={() => {
              onFbLogIn();
            }}>
            Sign in with facebook
          </Button>
          <Spacer position={'top'} size={'20'} />
          <Button
            mode="contained"
            style={styles.btnColor}
            contentStyle={styles.btnStyle}
            onPress={() => {
              googleSignIn();
            }}>
            sign in with google
          </Button>
          <Spacer position={'top'} size={'40'} />
          <Row>
            <Text>Don't have Account ?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('signup');
              }}>
              <Text style={styles.signInText}> Register</Text>
            </Pressable>
          </Row>
        </Body>
      </Container>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  signInText: {color: 'blue'},
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnColor: {
    backgroundColor: 'blue',
  },
});

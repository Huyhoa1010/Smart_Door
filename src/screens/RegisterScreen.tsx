/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {images, colors} from '../constants';
import {
  isValidEmail,
  isValidPassword,
} from '../services/Validations/Validation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegisterScreen = ({navigation}: any) => {
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false);
    });
  });

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidationLogin = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) === true &&
    isValidPassword(password) === true;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const [retypePassword, setRetypePassword] = useState('');

  // const handleRegister = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await register(email, password);
  //     await AsyncStorage.setItem('token', response.token);
  //     setLoading(false);
  //     Alert.alert(
  //       'Registration Successful',
  //       'You have been registered successfully.',
  //     );
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     setLoading(false);
  //     if (error instanceof Error) {
  //       Alert.alert('Registration Error', error.message);
  //     } else {
  //       Alert.alert('Registration Error', 'An unexpected error occurred');
  //     }
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 100,
        backgroundColor: '#CEF3F9',
      }}>
      <View
        style={{
          flex: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            width: '50%',
          }}>
          Create your account
        </Text>
        <Image
          source={images.mainscreen}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          flex: 60,
          backgroundColor: 'white',
          padding: 15,
          margin: 15,
          borderRadius: 15,
        }}>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Email:
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) === true
                  ? ''
                  : 'Email not in correct format',
              );
              setEmail(text);
            }}
            style={{
              color: 'black',
            }}
            placeholder="Enter your email here"
            placeholderTextColor={colors.placeholder}
          />
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'black',
              marginBottom: 5,
              marginHorizontal: 20,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 10,
              color: 'red',
            }}>
            {errorEmail}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Password:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              onChangeText={text => {
                setErrorPassword(
                  isValidPassword(text) === true
                    ? ''
                    : 'Password contain at least 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.',
                );
                setPassword(text);
              }}
              style={{
                color: 'black',
              }}
              secureTextEntry={passwordVisible ? false : true}
              placeholder="Enter your password here"
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}>
              {passwordVisible ? (
                <Icon
                  name="eye-slash"
                  size={20}
                  style={{
                    color: 'black',
                  }}
                />
              ) : (
                <Icon
                  name="eye"
                  size={20}
                  style={{
                    color: 'black',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'black',
              marginBottom: 5,
              marginHorizontal: 20,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 10,
              color: 'red',
            }}>
            {errorPassword}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Retype Password:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              onChangeText={text => {
                setRetypePassword(text);
              }}
              style={{
                color: 'black',
              }}
              secureTextEntry={retypePasswordVisible ? false : true}
              placeholder="Re-Enter your password here"
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity
              onPress={() => {
                setRetypePasswordVisible(!retypePasswordVisible);
              }}>
              {retypePasswordVisible ? (
                <Icon
                  name="eye-slash"
                  style={{
                    color: 'black',
                    fontSize: 20,
                  }}
                />
              ) : (
                <Icon
                  name="eye"
                  style={{
                    color: 'black',
                    fontSize: 20,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'black',
              marginBottom: 5,
              marginHorizontal: 20,
              alignSelf: 'center',
            }}
          />
        </View>
        {keyboardIsShown === false && (
          <View
            style={{
              justifyContent: 'flex-start',
              marginTop: 20,
            }}>
            <TouchableOpacity
              disabled={isValidationLogin() === false || loading}
              onPress={() => navigation.navigate('Login')}
              //handleRegister
              style={{
                backgroundColor:
                  isValidationLogin() === true ? 'red' : colors.inactive,
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                alignSelf: 'center',
                borderRadius: 30,
              }}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    padding: 10,
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Register
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 20,
        }}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: 'black',
            }}
          />
          <Text
            style={{
              padding: 8,
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              alignSelf: 'center',
              marginHorizontal: 5,
            }}>
            Use other methods?
          </Text>
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: 'black',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Image
            source={images.facebook}
            style={{marginStart: 10, marginEnd: 5, width: 35, height: 35}}
          />
          <Image
            source={images.google}
            style={{marginStart: 10, marginEnd: 5, width: 35, height: 35}}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegisterScreen;

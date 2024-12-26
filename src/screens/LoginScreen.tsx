/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {images, colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {login} from '../APIServices/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false);
    });
  });

  // State to store email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login(email, password);
      console.log('data:', data);
      if (data.status === 'fail') {
        setLoading(false);
        Alert.alert('Login Error', data.message);
      } else {
        await AsyncStorage.setItem('token', data.data.token);
        setLoading(false);
        navigation.navigate('UITab');
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
        Alert.alert('Login Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 100,
        backgroundColor: '#CEF3F9',
      }}>
      <View
        style={{
          flex: 30,
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
          Already have an Account?
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
          flex: 30,
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
            Username:
          </Text>
          <TextInput
            onChangeText={text => setEmail(text)}
            style={{
              color: 'black',
            }}
            placeholder="Enter your email/username here"
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
              onChangeText={text => setPassword(text)}
              style={{
                color: 'black',
              }}
              secureTextEntry={!passwordVisible}
              placeholder="Enter your password here"
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
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
        </View>
      </View>
      {keyboardIsShown === false && (
        <View
          style={{
            flex: 20,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              padding: 5,
            }}>
            <Text
              style={{
                padding: 10,
                fontSize: 10,
                color: 'black',
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                fontStyle: 'italic',
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              alignSelf: 'center',
              borderRadius: 30,
            }}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text
                style={{
                  padding: 10,
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              padding: 5,
            }}>
            <Text
              style={{
                padding: 10,
                fontSize: 10,
                color: 'black',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Not now? Register now
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {keyboardIsShown === false && (
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
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

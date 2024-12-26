/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({navigation}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 100,
      }}>
      <ImageBackground
        source={images.background_smartdoor}
        resizeMode="cover"
        style={{
          flex: 100,
          width: null,
          height: null,
        }}>
        <View
          style={{
            flex: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={images.mainscreen}
              style={{
                marginStart: 10,
                marginEnd: 5,
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                color: 'black',
              }}>
              HELLO!
            </Text>
            <View style={{flex: 1}} />
            <Icon
              name={'question-circle'}
              style={{
                fontSize: 20,
                width: 20,
                height: 20,
                marginEnd: 15,
                color: 'black',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              marginBottom: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Smart Home App!
          </Text>
        </View>
        <View
          style={{
            flex: 40,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              height: 45,
              borderRadius: 20,
              marginHorizontal: 20,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                padding: 10,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              height: 45,
              borderRadius: 20,
              marginHorizontal: 20,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                padding: 10,
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 20,
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

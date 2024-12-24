/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {colors} from '../constants';
import {UIButton} from '../components';

const ChooseGateway = ({navigation}: any) => {
  const [Gateways, setGateways] = useState([
    {
      name: 'Gateway 1',
      isSelected: true,
    },
    {
      name: 'Gateway 2',
      isSelected: false,
    },
    {
      name: 'Gateway 3',
      isSelected: false,
    },
    {
      name: 'Gateway 4',
      isSelected: false,
    },
    {
      name: 'Gateway 5',
      isSelected: false,
    },
  ]);
  return (
    <View
      style={{
        flex: 100,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.font,
          }}>
          Choose Gateway to use
        </Text>
      </View>
      <View
        style={{
          flex: 65,
        }}>
        {Gateways.map(Gateway => (
          <UIButton
            onPress={() => {
              let newGateways = Gateways.map(eachGateway => {
                return {
                  ...eachGateway,
                  isSelected: eachGateway.name == Gateway.name,
                };
              });
              setGateways(newGateways);
            }}
            title={Gateway.name}
            isSelected={Gateway.isSelected}
          />
        ))}
      </View>
      <View
        style={{
          flex: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UITab')}
          style={{
            backgroundColor: '#56e02f',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            alignSelf: 'center',
            borderRadius: 30,
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: 13,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('X');
          }}
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
              fontStyle: 'italic',
            }}>
            Use other Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChooseGateway;

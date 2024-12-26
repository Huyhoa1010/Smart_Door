/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants';

interface UIHeaderProps {
  navigation: any;
  title: string;
}

const UIHeader = ({navigation, title}: UIHeaderProps) => {
  return (
    <View
      style={{
        height: 70,
        backgroundColor: colors.font,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name={'angle-left'}
          style={{
            color: colors.primary,
            fontSize: 30,
            marginLeft: 20,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};
export default UIHeader;

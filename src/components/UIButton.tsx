/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, ColorValue} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants';

interface UIButtonProps {
  onPress: () => void;
  title: string;
  isSelected: boolean;
}

function UIButton(props: UIButtonProps) {
  const {onPress, isSelected} = props;

  const backgroundColor: ColorValue | undefined = isSelected
    ? '#56e02f'
    : 'white';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: 'white',
        borderWidth: 1,
        height: 45,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
      }}>
      {isSelected && (
        <Icon
          name={'check-circle'}
          style={{
            color: 'green',
            fontSize: 20,
            position: 'absolute',
            left: 10,
            top: 10,
          }}
        />
      )}
      <Text
        style={{
          color: isSelected ? colors.primary : 'black',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default UIButton;

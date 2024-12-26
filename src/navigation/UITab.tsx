/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  AccountInformation,
  MainScreen,
  //ScanDevice,
  ManageCardsScreen,
  DoorControlScreen,
  ManageImageScreen,
} from '../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialBottomTabNavigator();

function UITab() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const isAdminValue = await AsyncStorage.getItem('isAdmin');
      setIsAdmin(isAdminValue ? JSON.parse(isAdminValue) : null);
    };

    fetchIsAdmin();
  }, []);

  if (isAdmin === null) {
    return null; // or a loading spinner
  }

  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor={colors.primary}
      inactiveColor={colors.inactive}
      barStyle={{backgroundColor: colors.font}}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={20}
              color={focused ? colors.font : colors.inactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ManageDevices"
        component={ManageCardsScreen}
        options={{
          tabBarLabel: 'Manage Cards',
          tabBarIcon: ({focused}) => (
            <Icon
              name="address-card"
              size={20}
              color={focused ? colors.font : colors.inactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DoorControl"
        component={DoorControlScreen}
        options={{
          tabBarLabel: 'Door Control',
          tabBarIcon: ({focused}) => (
            <Icon
              name="door-open"
              size={20}
              color={focused ? colors.font : colors.inactive}
            />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="ManageImages"
          component={ManageImageScreen}
          options={{
            tabBarLabel: 'Manage Images',
            tabBarIcon: ({focused}) => (
              <Icon
                name="image"
                size={20}
                color={focused ? colors.font : colors.inactive}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Account"
        component={AccountInformation}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused}) => (
            <Icon
              name="user-alt"
              size={20}
              color={focused ? colors.font : colors.inactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default UITab;

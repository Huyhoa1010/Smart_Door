import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AccountInformation,
  ChooseGateway,
  HomeScreen,
  LoginScreen,
  MainScreen,
  RegisterScreen,
  ScheduleDevice,
  ScriptScreen,
  NewPage,
  EditPage,
  ManageDevicesScreen,
  ScanDevice,
  UpdateProfileScreen,
  ManageUsersScreen,
  ManageImageScreen,
  VoiceTest,
} from './src/screens';
import UITab from './src/navigation/UITab';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="Gateway"
          component={ChooseGateway}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UITab"
          component={UITab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={AccountInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleDevice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Script"
          component={ScriptScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="New Page"
          component={NewPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Page"
          component={EditPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage Devices"
          component={ManageDevicesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scan Device"
          component={ScanDevice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update Profile"
          component={UpdateProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage Users"
          component={ManageUsersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage Images"
          component={ManageImageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Voice Chatbot"
          component={VoiceTest}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //<ChooseGateway />
    //<LoginScreen />
    //<MainScreen />
    //<AccountInformation />
    //<RegisterScreen />
    //<UITab />
  );
};

export default App;

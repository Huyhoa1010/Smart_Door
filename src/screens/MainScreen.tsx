/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants';
import {getAllLogs} from '../APIServices/API';
import {Image} from 'react-native';

const MainScreen = ({navigation, route}: any) => {
  const [logs, setLogs] = useState<any[]>([]);
  const {devices} = route.params || {devices: []};

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAllLogs();
        console.log('data:', data);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <ScrollView style={{flex: 100}}>
      <View
        style={{
          flex: 10,
          backgroundColor: colors.font,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>
            MainScreen
          </Text>
        </View>
        <Icon.Button
          onPress={() => navigation.navigate('Account')}
          name={'bars'}
          backgroundColor={colors.font}
          iconStyle={{color: colors.primary, fontSize: 20, marginRight: 20}}
          style={{padding: 0}}
        />
      </View>
      <View
        style={{
          flex: 10,
          height: 50,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 15, paddingStart: 10}}>Logs</Text>
      </View>
      <ScrollView style={{flex: 80, padding: 10}}>
        {logs.map((log: any, index: any) => (
          <View
            key={index}
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <Text>Card Number: {log.card_number}</Text>
            <Text>Action Type: {log.action_type}</Text>
            <Text>Status: {log.status}</Text>
            <Text>Time: {log.timestamp}</Text>
            <Image
              source={{uri: log.image}}
              style={{width: 150, height: 150}}
            />
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default MainScreen;

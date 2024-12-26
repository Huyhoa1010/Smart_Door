/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants';
import {getAllLogs} from '../APIServices/API';

const MainScreen = ({navigation}: any) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchLogs = async () => {
    try {
      const data = await getAllLogs();
      console.log('data:', data);
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
  };

  const handleNullData = (data: any, defaultValue: any) => {
    return data !== null && data !== undefined ? data : defaultValue;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}h ${minutes}p ${seconds}s`;
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <View
        style={{
          flex: 0.13,
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
          flex: 0.1,
          height: 50,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 15, paddingStart: 10}}>Logs</Text>
      </View>
      <ScrollView
        style={{flex: 0.7, padding: 10, backgroundColor: colors.primary}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {logs.map((log: any, index: any) => (
          <View
            key={index}
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Card Number:</Text>{' '}
                {handleNullData(log.card_number, 'N/A')}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Action Type:</Text>{' '}
                {handleNullData(log.action_type, 'N/A')}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Status:</Text>{' '}
                {handleNullData(log.status, 'N/A')}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Time:</Text>{' '}
                {formatTimestamp(handleNullData(log.timestamp, 'N/A'))}
              </Text>
            </View>
            {log.image ? (
              <Image
                source={{uri: log.image}}
                style={{width: '45%', height: '100%', borderRadius: 10}}
              />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainScreen;

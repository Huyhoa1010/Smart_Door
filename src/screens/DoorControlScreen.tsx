/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';
import {openDoor} from '../APIServices/API';

const DoorControlScreen = ({navigation}: any) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  const toggleDoor = async () => {
    try {
      if (!isDoorOpen) {
        await openDoor();
        setIsDoorOpen(true);
        Alert.alert('Door Control', 'Door is now open');
        setTimeout(async () => {
          setIsDoorOpen(false);
          Alert.alert('Door Control', 'Door is now closed');
        }, 5000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to control door');
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Door Control" />
      <View style={styles.body}>
        <Text
          style={[
            styles.statusText,
            {color: isDoorOpen ? '#4CAF50' : '#f44336'},
          ]}>
          Door is {isDoorOpen ? 'Open' : 'Closed'}
        </Text>
        <TouchableOpacity
          onPress={toggleDoor}
          style={[
            styles.switchButton,
            {backgroundColor: isDoorOpen ? '#4CAF50' : '#f44336'},
          ]}>
          <View style={styles.switchInner}>
            <View style={styles.switchLine} />
            <Text style={styles.roundButtonText}>
              {isDoorOpen ? 'ON' : 'OFF'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoorControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  switchButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  switchInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  switchLine: {
    width: 8,
    height: 80,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
  },
  roundButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 60,
  },
});

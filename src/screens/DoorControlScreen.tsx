import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';
import {openDoor, closeDoor} from '../APIServices/API'; // <-- Import APIs

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
        }, 5000); // Close the door after 5 seconds
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to control door');
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        navigation={navigation}
        title="Door Control"
        goBackScreen="Main"
      />
      <View style={styles.body}>
        <Text style={styles.statusText}>
          Door is {isDoorOpen ? 'Open' : 'Closed'}
        </Text>
        <TouchableOpacity onPress={toggleDoor} style={styles.button}>
          <Text style={styles.buttonText}>Open Door</Text>
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
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

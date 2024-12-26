import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';

const ScriptScreen: React.FC = ({navigation}: any) => {
  const [scheduleName, setScheduleName] = useState('');
  const [relayCount, setRelayCount] = useState(0);
  const [ledCount, setLedCount] = useState(0);

  const handleAddSchedule = () => {
    Alert.alert('Kịch bản đã được thêm.');
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Script" />
      <View style={styles.body}>
        <Text style={styles.label}>Kịch bản</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên kịch bản"
          value={scheduleName}
          onChangeText={setScheduleName}
        />
        <View style={styles.deviceContainer}>
          <Text style={styles.label}>Chọn thiết bị</Text>
          <View style={styles.deviceButtonsContainer}>
            <TouchableOpacity
              style={[styles.deviceButton, styles.relayButton]}
              onPress={() => setRelayCount(relayCount + 1)}>
              <Text style={styles.deviceButtonText}>Rơ-le: {relayCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deviceButton, styles.ledButton]}
              onPress={() => setLedCount(ledCount + 1)}>
              <Text style={styles.deviceButtonText}>LED: {ledCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button title="Lưu" onPress={handleAddSchedule} color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  deviceContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deviceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deviceButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  relayButton: {
    backgroundColor: '#007AFF',
    marginRight: 8,
  },
  ledButton: {
    backgroundColor: '#FF9500',
  },
  deviceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScriptScreen;

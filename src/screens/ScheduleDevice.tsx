import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';

const ScheduleDeviceScreen: React.FC = ({navigation}: any) => {
  const [scheduleName, setScheduleName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [relayCount, setRelayCount] = useState(0);
  const [ledCount, setLedCount] = useState(0);

  const handleAddSchedule = () => {
    // Logic để thêm lịch thiết bị
    Alert.alert('Lịch thiết bị đã được thêm.');
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Schedule Devices" />
      <ScrollView style={styles.body}>
        <Text style={styles.label}>Lập Lịch</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên lịch"
          value={scheduleName}
          onChangeText={setScheduleName}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Thời gian</Text>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="Bắt đầu"
              value={startTime}
              onChangeText={setStartTime}
            />
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="Kết thúc"
              value={endTime}
              onChangeText={setEndTime}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => {}}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.deviceContainer}>
          <Text style={styles.label}>Thiết bị</Text>
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
        <View style={styles.repeatContainer}>
          <Text style={styles.label}>Lặp lại</Text>
          {[
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
            'Chủ nhật',
          ].map(day => (
            <View key={day} style={styles.repeatItem}>
              <Text style={styles.repeatText}>{day}</Text>
              <TextInput style={styles.repeatCheckbox} />
            </View>
          ))}
        </View>
        <Button title="Lưu" onPress={handleAddSchedule} />
      </ScrollView>
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
  timeContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    height: 40,
    width: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  deviceContainer: {
    marginBottom: 16,
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
  repeatContainer: {
    marginBottom: 16,
  },
  repeatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  repeatText: {
    fontSize: 16,
  },
  repeatCheckbox: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default ScheduleDeviceScreen;

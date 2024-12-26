import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';
import {getAllUsers, deleteUser, addUsers} from '../APIServices/API';

const ManageUsersScreen: React.FC = ({navigation}: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passdoor, setPassdoor] = useState('');
  const [ten, setTen] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      Alert.alert('Success', 'User deleted successfully');
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleAddUser = async () => {
    try {
      await addUsers(username, password, passdoor, ten);
      Alert.alert('Success', 'User added successfully');
      setUsername('');
      setPassword('');
      setPassdoor('');
      setTen('');
      setShowModal(false);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UIHeader
        navigation={navigation}
        title="Manage Users"
        goBackScreen="Account"
      />

      {/* Add User button at the top */}
      <View style={styles.addButtonContainer}>
        <Button title="Add User" onPress={() => setShowModal(true)} />
      </View>

      <ScrollView style={styles.body}>
        {users.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <Text style={styles.userName}>Name: {user.ten}</Text>
            <Text style={styles.userEmail}>Username: {user.user}</Text>
            <Text style={styles.userRole}>Role: {user.role}</Text>
            <View style={styles.centeredDeleteButton}>
              <Button
                title="Delete"
                onPress={() => handleDelete(user.user)}
                color="red"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for adding user */}
      <Modal visible={showModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New User</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
            <TextInput
              placeholder="Passdoor"
              value={passdoor}
              onChangeText={setPassdoor}
              style={styles.input}
            />
            <TextInput
              placeholder="Ten"
              value={ten}
              onChangeText={setTen}
              style={styles.input}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddUser}>
                <Text style={styles.confirmButton}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  addButtonContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  userItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  userRole: {
    fontSize: 16,
    color: '#555',
  },
  centeredDeleteButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    color: 'red',
    marginRight: 10,
    fontWeight: 'bold',
  },
  confirmButton: {
    color: 'green',
    fontWeight: 'bold',
  },
});

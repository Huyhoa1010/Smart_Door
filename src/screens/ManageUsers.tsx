import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import {colors} from '../constants';
import {UIHeader} from '../components';
import {getAllUsers, deleteUser, addUsers} from '../APIServices/API';

const ManageUsersScreen: React.FC = ({navigation}: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passdoor, setPassdoor] = useState('');
  const [ten, setTen] = useState('');

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

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
      <UIHeader navigation={navigation} title="Manage Users" />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}>
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {users.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <Text style={styles.userName}>
              Name: <Text style={styles.normalText}>{user.ten}</Text>
            </Text>
            <Text style={styles.userEmail}>
              Username: <Text style={styles.normalText}>{user.user}</Text>
            </Text>
            <Text style={styles.userRole}>
              Role: <Text style={styles.normalText}>{user.role}</Text>
            </Text>
            <View style={styles.centeredDeleteButton}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(user.user)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
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
              placeholder="Name"
              value={ten}
              onChangeText={setTen}
              style={styles.input}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonAdd}
                onPress={handleAddUser}>
                <Text style={styles.confirmButtonText}>Add</Text>
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
  addButton: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 16,
  },
  userItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredDeleteButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.primary,
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
    borderColor: colors.placeholder,
    borderWidth: 1,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButtonCancel: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  modalButtonAdd: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

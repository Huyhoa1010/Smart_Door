import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import {UIHeader} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountInformation = ({navigation}: any) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    const fetchIsAdmin = async () => {
      const isAdminValue = await AsyncStorage.getItem('isAdmin');
      setIsAdmin(isAdminValue ? JSON.parse(isAdminValue) : null);
    };

    fetchIsAdmin();
  }, []);

  if (isAdmin === null) {
    return null;
  }
  const handleSignOut = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('User signed out');
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Settings" />
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Account</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Update Profile')}>
          <View style={styles.menuItem}>
            <Icon name="address-card" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Personal information</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="mail-bulk" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Send support request</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="lock" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Change Password</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Manage Users')}>
          {isAdmin && (
            <View style={styles.menuItem}>
              <Icon name="users" size={20} style={styles.menuIcon} />
              <Text style={styles.menuText}>Manage Users</Text>
              <View style={styles.menuSpacer} />
              <Icon name="angle-right" size={20} style={styles.menuArrow} />
            </View>
          )}
        </TouchableOpacity>
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Gateway</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Gateway')}>
          <View style={styles.menuItem}>
            <Icon name="door-closed" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Gateway management</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Gateway')}>
          <View style={styles.menuItem}>
            <Icon name="exchange-alt" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Change Gateway</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="qrcode" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Scan Gateway code</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity> */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Devices</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <View style={styles.menuItem}>
            <Icon name="calendar-alt" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Schedule</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Script')}>
          <View style={styles.menuItem}>
            <Icon name="calendar-day" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Script</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="book" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Control rules</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Scan Device')}>
          {isAdmin && (
            <View style={styles.menuItem}>
              <Icon name="camera" size={20} style={styles.menuIcon} />
              <Text style={styles.menuText}>Capture Images</Text>
              <View style={styles.menuSpacer} />
              <Icon name="angle-right" size={20} style={styles.menuArrow} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>More</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="language" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Language</Text>
            <View style={styles.menuSpacer} />
            <Text style={styles.menuLanguage}>English</Text>
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menuItem}>
            <Icon name="bell" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Notification</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.menuItem}>
            <Icon name="sign-out-alt" size={20} style={styles.menuIcon} />
            <Text style={styles.menuText}>Sign out</Text>
            <View style={styles.menuSpacer} />
            <Icon name="angle-right" size={20} style={styles.menuArrow} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: colors.primary,
  },
  sectionHeader: {
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: 'red',
    fontSize: 15,
    paddingStart: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  menuIcon: {
    color: 'black',
    paddingStart: 10,
  },
  menuText: {
    color: 'black',
    fontSize: 15,
    paddingStart: 20,
  },
  menuSpacer: {
    flex: 1,
  },
  menuArrow: {
    color: 'black',
    paddingEnd: 10,
  },
  menuLanguage: {
    color: 'black',
    fontSize: 15,
    paddingEnd: 10,
  },
});

export default AccountInformation;

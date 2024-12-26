/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TextInput,
  RefreshControl,
} from 'react-native';
import {colors} from '../constants';
import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} from '../APIServices/API';
import CustomAlertBoxNew from '../components/CustomAlertBoxNew';
import UIHeader from '../components/UIHeader';

const ManageCardsScreen = ({navigation}: any) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [showAlertNew, setShowAlertNew] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllCards();
      setFetchedData(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewPress = () => {
    setShowAlertNew(true);
  };

  const unShowBoxCancel = () => {
    setShowAlertNew(false);
    setShowAlertEdit(false);
  };

  const GoNew = async () => {
    try {
      await createCard(newCardName, newCardNumber);
      Alert.alert('Success', 'Card created successfully');
      setShowAlertNew(false);
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to create card');
    }
  };

  const GoEdit = async () => {
    try {
      await updateCard(selectedCard.id, newCardName, newCardNumber);
      Alert.alert('Success', 'Card updated successfully');
      setShowAlertEdit(false);
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update card');
    }
  };

  const onDeleteCard = async () => {
    try {
      await deleteCard(selectedCard.id);
      Alert.alert('Success', 'Card deleted successfully');
      setShowAlertEdit(false);
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete card');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}h${date.getMinutes()}p${date.getSeconds()}s`;
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Manage Cards" />

      <View style={styles.newButtonContainer}>
        <TouchableOpacity style={styles.newButton} onPress={handleNewPress}>
          <Text style={styles.newButtonText}>New Card</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        indicatorStyle="black"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {fetchedData.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text style={styles.boldText}>
              ID: <Text style={styles.normalText}>{item.id}</Text>
            </Text>
            <Text style={styles.boldText}>
              Name: <Text style={styles.normalText}>{item.ten}</Text>
            </Text>
            <Text style={styles.boldText}>
              Card ID: <Text style={styles.normalText}> {item.id_the}</Text>
            </Text>
            <Text style={styles.boldText}>
              Card Number:{' '}
              <Text style={styles.normalText}>{item.card_number}</Text>
            </Text>
            <Text style={styles.boldText}>
              Time:{' '}
              <Text style={styles.normalText}>{formatDate(item.ngaytao)}</Text>
            </Text>
            {item.image && (
              <Image source={{uri: item.image}} style={styles.image} />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCard(item);
                  setNewCardName(item.ten);
                  setNewCardNumber(item.id_the);
                  setShowAlertEdit(true);
                }}
                style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCard(item);
                  onDeleteCard();
                }}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {showAlertNew && (
        <CustomAlertBoxNew
          visible={showAlertNew}
          message={
            <View>
              <Text style={{fontWeight: 'bold'}}>Enter Card Name:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                  marginTop: 5,
                }}
                value={newCardName}
                onChangeText={setNewCardName}
              />
              <Text style={{fontWeight: 'bold'}}>Enter Card Number:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                  marginTop: 5,
                }}
                value={newCardNumber}
                onChangeText={setNewCardNumber}
              />
            </View>
          }
          onCancel={unShowBoxCancel}
          onConfirm={GoNew}
          confirmButtonText="Add"
          cancelButtonText="Cancel"
          showCancelButton
        />
      )}

      {showAlertEdit && selectedCard && (
        <CustomAlertBoxNew
          visible={showAlertEdit}
          message={
            <View>
              <Text style={{fontWeight: 'bold'}}>Edit Card Name:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                  marginTop: 5,
                }}
                value={newCardName}
                onChangeText={setNewCardName}
              />
              <Text style={{fontWeight: 'bold'}}>Edit Card Number:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                  marginTop: 5,
                }}
                value={newCardNumber}
                onChangeText={setNewCardNumber}
              />
            </View>
          }
          onCancel={unShowBoxCancel}
          onConfirm={GoEdit}
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          showCancelButton
        />
      )}
    </View>
  );
};

export default ManageCardsScreen;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  newButton: {
    width: 150,
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    marginBottom: 20,
    paddingHorizontal: 10,
    maxHeight: windowHeight - 150,
  },
  cardContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
});

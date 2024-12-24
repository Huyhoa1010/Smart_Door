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
} from 'react-native';
import {colors} from '../constants';
import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} from '../APIServices/API';
import CustomAlertBoxNew from '../components/CustomAlertBoxNew';

const ManageCardsScreen = () => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [showAlertNew, setShowAlertNew] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCards();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
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
      // Refresh the card list
      const data = await getAllCards();
      setFetchedData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to create card');
    }
  };

  const GoEdit = async () => {
    try {
      await updateCard(selectedCard.id, newCardName, newCardNumber);
      Alert.alert('Success', 'Card updated successfully');
      setShowAlertEdit(false);
      // Refresh the card list
      const data = await getAllCards();
      setFetchedData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to update card');
    }
  };

  const onDeleteCard = async () => {
    try {
      await deleteCard(selectedCard.id);
      Alert.alert('Success', 'Card deleted successfully');
      setShowAlertEdit(false);
      // Refresh the card list
      const data = await getAllCards();
      setFetchedData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete card');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Manage Cards</Text>
      </View>

      <TouchableOpacity style={styles.newButton} onPress={handleNewPress}>
        <Text style={styles.newButtonText}>New Card</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} indicatorStyle="black">
        {fetchedData.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.ten}</Text>
            <Text>Card ID: {item.id_the}</Text>
            <Text>Card Number: {item.card_number}</Text>
            <Text>Time: {item.ngaytao}</Text>
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

            {/* <TouchableOpacity
              onPress={() => handleOptionPressRond(index)}
              style={styles.touchable}>
              {selectedOption === index ? (
                <View style={styles.largeCircle}>
                  <View style={styles.roundContainer}>
                    {[...Array(3)].map((_, optionIndex) => (
                      <View
                        key={optionIndex}
                        style={[
                          styles.optionDot,
                          selectedOption === index && styles.selectedOptionDot,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.largeCircle}>
                  <View style={styles.roundContainer}>
                    {[...Array(3)].map((_, optionIndex) => (
                      <View key={optionIndex} style={styles.optionDot} />
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity> */}
          </View>
        ))}
      </ScrollView>

      {showAlertNew && (
        <CustomAlertBoxNew
          visible={showAlertNew}
          message={
            <View>
              <Text>Enter Card Name:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                value={newCardName}
                onChangeText={setNewCardName}
              />
              <Text>Enter Card Number:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
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
              <Text>Edit Card Name:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                value={newCardName}
                onChangeText={setNewCardName}
              />
              <Text>Edit Card Number:</Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginBottom: 10,
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
  newButton: {
    width: 100,
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
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
  touchable: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 30,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  selectedOptionDot: {
    backgroundColor: colors.primary,
  },
});

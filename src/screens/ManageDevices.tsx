/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ThemedText} from '../components/ThemedText';
import CustomAlertBoxNew from '../components/CustomAlertBoxNew';
import CustomAlertBoxEdit from '../components/CustomAlertBoxEdit';
import {useFocusEffect} from '@react-navigation/native';
import {handleDeleteRequest} from '../APIServices/delete';
import {handleGetRequest} from '../APIServices/get';
import {colors} from '../constants';
import UIHeader from '../components/UIHeader';

const windowHeight = Dimensions.get('window').height;

const ManageDevicesScreen = ({navigation}: any) => {
  const [showAlertNew, setShowAlertNew] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [idData, setId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const GoEdit = () => {
    navigation.navigate('Edit Page', {rectangle: selectedRectangle});
    setShowAlertEdit(false);
  };

  const GoNew = () => {
    navigation.navigate('New Page');
    setShowAlertNew(false);
  };

  const unShowBoxCancel = () => {
    console.log('Cancel button pressed');
    setShowAlertNew(false);
    setShowAlertEdit(false);
  };

  const unShowBoxEdit = () => {
    console.log('Delete pressed');
    handleDeleteRequest(idData);
    setShowAlertEdit(false);
    getUpdate();
  };

  const handleNewPress = () => {
    console.log('New pressed');
    setSelectedRectangle(null);
    setShowAlertNew(true);
  };

  const getUpdate = async () => {
    try {
      await handleGetRequest(setFetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUpdate();
      console.log('Data updated');
    }, []),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUpdate();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleOptionPressRond = (index: number, item: any, id: number) => {
    setSelectedRectangle(item);
    setId(id);
    setShowAlertEdit(true);
  };

  return (
    <View style={styles.container}>
      <UIHeader
        navigation={navigation}
        title="Manage Devices"
        goBackScreen="Main"
      />
      <View style={styles.body}>
        <View style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.centeredTextSub}>
            Devices
          </ThemedText>
        </View>
        <View style={styles.scrollContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNewPress}>
            <ThemedText style={styles.buttonText}>New</ThemedText>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView} indicatorStyle="black">
            {fetchedData.map((item, index) => (
              <View key={index} style={styles.rectangle}>
                <View style={{alignItems: 'flex-start', right: 10}}>
                  <ThemedText style={styles.rectangleText}>
                    <ThemedText style={styles.rectangleTextBold}>
                      name:{' '}
                    </ThemedText>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.rectangleText}>
                    <ThemedText style={styles.rectangleTextBold}>
                      mac:{' '}
                    </ThemedText>
                    {item.mac}
                  </ThemedText>
                  <ThemedText style={styles.rectangleText}>
                    <ThemedText style={styles.rectangleTextBold}>
                      status:{' '}
                    </ThemedText>
                    {item.status.toString()}
                  </ThemedText>
                </View>

                <TouchableOpacity
                  onPress={() => handleOptionPressRond(index, item, item.id)}
                  style={styles.touchable}>
                  {selectedOption === index && (
                    <View style={styles.largeCircle}>
                      <View style={styles.roundContainer}>
                        {[...Array(3)].map((_, optionIndex) => (
                          <View
                            key={optionIndex}
                            style={[
                              styles.optionDot,
                              selectedOption === index &&
                                styles.selectedOptionDot,
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  )}
                  {selectedOption !== index && (
                    <View style={styles.largeCircle}>
                      <View style={styles.roundContainer}>
                        {[...Array(3)].map((_, optionIndex) => (
                          <View key={optionIndex} style={[styles.optionDot]} />
                        ))}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {showAlertNew && (
          <CustomAlertBoxNew
            visible={showAlertNew}
            message={<Text>Do you want to create new data?</Text>}
            onCancel={unShowBoxCancel}
            onConfirm={GoNew}
            confirmButtonText={'New'}
            cancelButtonText={'Cancel'}
            showCancelButton={true}
          />
        )}
        {showAlertEdit && selectedRectangle && (
          <CustomAlertBoxEdit
            visible={showAlertEdit}
            message={
              <View>
                <Text>Do you want to update data?</Text>
              </View>
            }
            onCancel={unShowBoxCancel}
            onDelete={unShowBoxEdit}
            onEdit={GoEdit}
            editButtonText={'Edit'}
            deleteButtonText={'Delete'}
            cancelButtonText={'Cancel'}
            showCancelButton={true}
            showExtraButton={true}
          />
        )}
      </View>
    </View>
  );
};

export default ManageDevicesScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF',
  },
  stepContainer: {
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    paddingTop: 20,
  },
  centeredTextSub: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: colors.font,
    width: 80,
    height: 25,
    position: 'absolute',
    right: 20,
    top: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rectangle: {
    width: 320,
    height: 68,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
    borderRadius: 10,
  },
  rectangleText: {
    color: '#000000',
    fontSize: 12,
    left: 22,
  },
  rectangleTextBold: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    maxHeight: windowHeight - 315,
  },
  scrollContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: colors.primary,
  },
  roundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginVertical: 3,
  },
  selectedOptionDot: {
    backgroundColor: '#ffffff',
  },
  largeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: -15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF1A',
  },
  touchable: {
    position: 'absolute',
    right: 7,
    top: '10%',
  },
});

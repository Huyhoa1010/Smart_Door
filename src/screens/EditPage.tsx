import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {ThemedText} from '../components/ThemedText';
import CustomAlertBoxNew from '../components/CustomAlertBoxNew';
import {Switch} from 'react-native-switch';
import {handlePutRequest} from '../APIServices/put';
import {colors} from '../constants';
import {UIHeader} from '../components';

const EditPage = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [mac, setMac] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [id, setId] = useState(0);
  const [isSend, setIsSend] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // const newData = {
  //   name: name,
  //   mac: mac,
  //   status: toggleValue,
  // };

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleSave = async () => {
    try {
      await handlePutRequest(name, mac, toggleValue, id);
      setIsSend(true);
      setShowAlert(true);
    } catch (error) {
      console.error('Error while saving:', error);
      setIsSend(false);
      setShowAlert(true);
    }
  };

  const BackHome = () => {
    setShowAlert(false);
    navigation.navigate('Manage Devices');
  };

  const handleToggleChange = (val: any) => {
    setToggleValue(val);
  };

  return (
    <View style={styles.container}>
      <UIHeader
        navigation={navigation}
        title="Edit Devices"
        goBackScreen="Manage Devices"
      />
      <View style={styles.body}>
        <View style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.centeredTextSub}>
            Edit
          </ThemedText>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Name :</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#828282"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>MAC :</Text>
            <TextInput
              style={styles.input}
              placeholder="MAC Address"
              placeholderTextColor="#828282"
              value={mac}
              onChangeText={text => setMac(text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Status :</Text>
            <View style={styles.toggleContainer}>
              <Switch
                value={toggleValue}
                onValueChange={handleToggleChange}
                disabled={false}
                activeText={'ON'}
                inActiveText={'OFF'}
                circleSize={50}
                barHeight={50}
                circleBorderWidth={0}
                backgroundActive={'#D9D9D9'}
                backgroundInactive={'#D9D9D9'}
                circleActiveColor={colors.font}
                circleInActiveColor={'red'}
                renderInsideCircle={() => (
                  <Text style={styles.activeText}>
                    {toggleValue ? 'ON' : 'OFF'}
                  </Text>
                )}
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={1.6}
                switchRightPx={1.6}
                switchWidthMultiplier={2}
                switchBorderRadius={25}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={BackHome}>
            <ThemedText style={styles.buttonText}>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleSave}>
            <ThemedText style={styles.buttonText}>Save</ThemedText>
          </TouchableOpacity>
        </View>
        <CustomAlertBoxNew
          visible={showAlert}
          message={
            <Text>
              {isSend
                ? 'Changes applied successfully.'
                : 'Unable to apply changes.'}
            </Text>
          }
          onCancel={handleCancel}
          onConfirm={BackHome}
          confirmButtonText="OK"
        />
      </View>
    </View>
  );
};

export default EditPage;

const styles = StyleSheet.create({
  activeText: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'absolute',
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  stepContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
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
    color: '#933434',
    fontSize: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#AAB565',
    width: 85,
    height: 65,
    left: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  confirmButton: {
    backgroundColor: colors.font,
  },
  inputContainer: {
    flexDirection: 'column',
    paddingTop: 50,
  },
  label: {
    flex: 1,
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    width: '90%',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  toggleContainer: {
    flex: 2,
    marginLeft: 0,
    alignItems: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    right: 110,
    paddingTop: 50,
    justifyContent: 'space-between',
    marginRight: 70,
  },
});

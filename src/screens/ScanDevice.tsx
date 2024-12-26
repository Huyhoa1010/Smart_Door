/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {colors} from '../constants';
import {UIHeader} from '../components';
import {uploadImage} from '../APIServices/API';

const ScanDevice = ({navigation}: any) => {
  const cameraRef = useRef<RNCamera>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.front);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      handleUploadImage(data.uri);
    }
  };

  const handleUploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await uploadImage(formData);
      if (response.success) {
        Alert.alert('Success', 'Image uploaded successfully');
        navigation.navigate('Manage Images');
      } else {
        Alert.alert('Error', 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const toggleCameraType = () => {
    setCameraType((prevType: any) =>
      prevType === RNCamera.Constants.Type.front
        ? RNCamera.Constants.Type.back
        : RNCamera.Constants.Type.front,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <UIHeader navigation={navigation} title="Capture Image" />
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Text style={styles.buttonText}>CAPTURE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleCameraType}
          style={styles.switchButton}>
          <Text style={styles.buttonText}>SWITCH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: colors.primary,
  },
  captureButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  switchButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanDevice;

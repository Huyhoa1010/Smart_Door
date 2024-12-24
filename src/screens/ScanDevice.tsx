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
      } else {
        Alert.alert('Error', 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const toggleCameraType = () => {
    setCameraType(prevType =>
      prevType === RNCamera.Constants.Type.front
        ? RNCamera.Constants.Type.back
        : RNCamera.Constants.Type.front,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <UIHeader
        navigation={navigation}
        title="Capture Image"
        goBackScreen="Main"
      />
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType} style={styles.capture}>
          <Text style={{fontSize: 14}}> SWITCH </Text>
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
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ScanDevice;

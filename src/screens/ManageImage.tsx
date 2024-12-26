import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import UIHeader from '../components/UIHeader';
import {getAllImages, deleteImage, uploadImage} from '../APIServices/API';
import {colors} from '../constants';
import FastImage from 'react-native-fast-image';
const ManageImageScreen = ({navigation}: any) => {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getAllImages();
      console.log('Fetched images:', data); // Log the fetched images
      setImages(data);
    } catch (error) {
      console.error('Fetch Images Error:', error); // Improved error logging
      Alert.alert('Error', 'Cannot fetch images');
    }
  };

  const handleDelete = async imageUrl => {
    try {
      await deleteImage(imageUrl);
      Alert.alert('Success', 'Image deleted');
      fetchImages();
    } catch (error) {
      console.error('Delete Image Error:', error);
      Alert.alert('Error', 'Cannot delete image');
    }
  };

  const pickAndUploadImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
          Alert.alert('Error', 'Image picker error');
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          try {
            // Resize the image
            const resizedImage = await ImageResizer.createResizedImage(
              asset.uri,
              800, // max width
              800, // max height
              'PNG', // compress format
              80, // quality
            );

            const formData = new FormData();
            formData.append('file', {
              uri: resizedImage.uri,
              type: 'image/jpeg',
              name: resizedImage.name || 'photo.jpg',
            });

            await uploadImage(formData);
            Alert.alert('Success', 'Image uploaded');
            fetchImages();
          } catch (error) {
            console.error('Upload Image Error:', error); // Improved error logging
            Alert.alert('Error', 'Cannot upload image');
          }
        }
      },
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchImages()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  const renderItem = ({item}: any) => (
    <View style={styles.imageContainer}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onError={e => console.log('Error loading image:', e.nativeEvent.error)}
      />
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleDelete(item.url)}
        accessibilityLabel="Delete Image"
        accessibilityHint="Deletes the selected image">
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const keyExtractor = (item: any, index: any) => `${item.url}-${index}`;

  return (
    <View style={styles.container}>
      <UIHeader
        navigation={navigation}
        title="Manage Images"
        goBackScreen="Main"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          onPress={pickAndUploadImage}>
          <Text style={styles.buttonText}>Pick & Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.captureButton]}
          onPress={() => navigation.navigate('Scan Device')}>
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.noImagesText}>No images available</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#28a745',
  },
  captureButton: {
    backgroundColor: '#ff6347',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#e1e4e8',
  },
  noImagesText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ManageImageScreen;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {colors} from '../constants';

interface CustomAlertBoxProps {
  visible: boolean;
  message: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const CustomAlertBoxNew: React.FC<CustomAlertBoxProps> = ({
  visible,
  message,
  onCancel,
  onConfirm,
  showCancelButton = false,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Add',
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmButtonText}</Text>
            </TouchableOpacity>
            {showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}>
                <Text style={styles.buttonText}>{cancelButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface Styles {
  overlay: ViewStyle;
  absolute: ViewStyle;
  container: ViewStyle;
  message: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  cancelButton: ViewStyle;
  confirmButton: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#C94A4A',
  },
  confirmButton: {
    backgroundColor: '#65B56D',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomAlertBoxNew;

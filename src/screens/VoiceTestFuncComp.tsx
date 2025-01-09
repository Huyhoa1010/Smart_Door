import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {UIHeader} from '../components';
import {colors} from '../constants';

const VoiceTest = ({navigation}: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsRecording(true);
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    if (e.value && e.value.length > 0) {
      setResults(e.value);
      setTranscribedText(e.value[0]);
    }
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const startRecording = async () => {
    try {
      await Voice.start('vi-VN');
      setError('');
      setResults([]);
    } catch (e) {
      console.error('startRecording error:', e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('stopRecording error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Voice Recognition" />
      <View style={styles.content}>
        <View style={styles.transcriptionContainer}>
          <Text style={styles.transcriptionLabel}>Văn bản chuyển đổi:</Text>
          <Text style={styles.transcriptionText}>
            {transcribedText || 'Bấm nút để bắt đầu nói...'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording ? styles.recordingButton : null,
          ]}
          onPress={isRecording ? stopRecording : startRecording}>
          <Image
            source={require('../services/access/button.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>
            {isRecording ? 'Dừng' : 'Bấm để nói'}
          </Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  transcriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  transcriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  transcriptionText: {
    fontSize: 18,
    color: '#007AFF',
    textAlign: 'center',
    minHeight: 50,
    paddingVertical: 10,
  },
  recordButton: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordingButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default VoiceTest;

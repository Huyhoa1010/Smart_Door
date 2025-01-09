import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);
  const [canStartRecording, setCanStartRecording] = useState(true);

  useEffect(() => {
    const initVoice = async () => {
      try {
        await Voice.destroy();
        await Voice.start('vi-VN');
      } catch (e) {
        console.error('Error initializing Voice:', e);
      }
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    console.log('Speech started');
    setIsRecording(true);
    setCanStartRecording(false);
    setError('');
  };

  const onSpeechEnd = async () => {
    console.log('Speech ended');
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice:', e);
      setCanStartRecording(true);
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults:', e);
    if (e.value && e.value.length > 0) {
      setResults(e.value);
      setTranscribedText(e.value[0]);
      setCanStartRecording(true);
    }
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error('Speech error:', e);
    setError(e.error?.message || 'Lỗi không xác định');
    setIsRecording(false);
    setCanStartRecording(true);
  };

  const resetState = () => {
    setTranscribedText('');
    setResults([]);
    setError('');
  };

  const startRecording = async () => {
    if (!canStartRecording) {
      return;
    }
    try {
      await Voice.destroy();
      await Voice.start('vi-VN');
      setIsRecording(true);
      setError('');
    } catch (e) {
      console.error('Error starting recording:', e);
      setError('Không thể bắt đầu ghi âm');
      setIsRecording(false);
      setCanStartRecording(true);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) {
      return;
    }
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error('Error stopping recording:', e);
      setError('Không thể dừng ghi âm');
      setCanStartRecording(true);
    }
  };

  const handleRecordPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else if (canStartRecording) {
      await startRecording();
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetState();
    setCanStartRecording(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <UIHeader navigation={navigation} title="Voice Recognition" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
              !canStartRecording && !isRecording
                ? styles.processingButton
                : null,
            ]}
            onPress={handleRecordPress}
            disabled={!canStartRecording && !isRecording}
            activeOpacity={0.7}>
            <Image
              source={require('../services/access/button.png')}
              style={[
                styles.buttonImage,
                !canStartRecording && !isRecording
                  ? styles.disabledImage
                  : null,
              ]}
            />
            <Text style={styles.buttonText}>
              {isRecording
                ? 'Dừng'
                : canStartRecording
                ? 'Bấm để nói'
                : 'Đang xử lý...'}
            </Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {
    flexGrow: 1,
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
  processingButton: {
    backgroundColor: '#cccccc',
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  disabledImage: {
    opacity: 0.5,
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

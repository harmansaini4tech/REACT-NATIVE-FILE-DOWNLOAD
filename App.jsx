import React from 'react';
import {View, Button, Alert, Platform, PermissionsAndroid} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';

const App = () => {
  const downloadFile = async () => {
    const fileUrl =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const {config, fs} = RNBlobUtil;
    const date = new Date();

    // Use Downloads folder
    const isAndroid11OrAbove =
      Platform.OS === 'android' && Platform.Version >= 30;
    const fileDir = fs.dirs.DownloadDir;
    const filePath = `${fileDir}/sample_${date.getTime()}.pdf`;

    try {
      // Ask permission for Android < 11
      if (Platform.OS === 'android' && Platform.Version < 30) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download the file',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
          return;
        }
      }

      // File download
      config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading file...',
          mediaScannable: true,
          mime: 'application/pdf',
        },
      })
        .fetch('GET', fileUrl)
        .then(res => {
          Alert.alert('Download Success', `File saved to:\n${res.path()}`);
        })
        .catch(err => {
          console.log('Download error:', err);
          Alert.alert('Download Failed', 'Could not download file.');
        });
    } catch (error) {
      console.log('Permission error:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
      }}>
      <Button title="Download PDF File" onPress={downloadFile} />
    </View>
  );
};

export default App;

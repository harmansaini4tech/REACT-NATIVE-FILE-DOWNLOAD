for file downlaod functionality you have to do some steps for this :- 

1. add this three permission in 'android/app/src/main/AndroidManifest.xml' :- 

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

    <application
    android:requestLegacyExternalStorage="true"
    /></application>

2. install the given package :- 

    npm install react-native-blob-util




import {GoogleSignin} from 'react-native-google-signin';

export async function _signIn() {
  var cId =
    '190356971199-98i597ooijfo0afa6mbsmn4bitqe05j3.apps.googleusercontent.com';
  GoogleSignin.configure({
    webClientId: cId, // '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
}

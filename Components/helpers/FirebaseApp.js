import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCyyDgsPQX-Hfi6aSrArhwUcVMKZHHyknU',
  authDomain: 'hassantbuilderapplication.firebaseapp.com',
  databaseURL: 'https://hassantbuilderapplication.firebaseio.com',
  projectId: 'hassantbuilderapplication',
  storageBucket: 'hassantbuilderapplication.appspot.com',
  messagingSenderId: '190356971199',
  appId: '1:190356971199:web:c8b7503fa0481a8ce5700a',
  measurementId: 'G-8CM1HD7DD8',
};
// Initialize Firebase
var FirebaseApp = firebase.initializeApp(firebaseConfig);

export default FirebaseApp;

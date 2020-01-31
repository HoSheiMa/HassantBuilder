/**
 * @format
 */

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
import {_retrieveData, _storeData} from './Components/helpers/Functions';
import {getUserData} from './Components/helpers/userData';
import PushNotification from 'react-native-push-notification';

import BackgroundJob from 'react-native-background-job';
import FirebaseApp from './Components/helpers/FirebaseApp';

// global.PaymentRequest = require('react-native-payments').PaymentRequest;

async function Id() {
  var userId = await getUserData('id');

  var U_ref = FirebaseApp.firestore()
    .collection('users')
    .doc(userId);
  U_ref.get()
    .then(snaps => {
      console.log(':SShere');
      console.log(snaps);
    })
    .catch(e => console.log(e));
}

const backgroundJob = {
  jobKey: 'myJob',
  job: () => {
    console.log('here from back end.');
    Id();
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  },
};

BackgroundJob.register(backgroundJob);

var backgroundSchedule = {
  jobKey: 'myJob',
};

BackgroundJob.schedule(backgroundSchedule)
  .then(() => console.log('Success'))
  .catch(err => console.err(err));
BackgroundJob.register(backgroundJob);

AppRegistry.registerComponent(appName, () => App);

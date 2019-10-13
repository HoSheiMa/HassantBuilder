import FirebaseApp from './FirebaseApp';
import {AsyncStorage} from 'react-native';

export async function _storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
}

export async function _retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Error retrieving data
  }
}

export function AddFunc(
  collection = null,
  Data = {},
  SuccessFunc = () => {},
  ErrorFunc = () => {},
  CheckAnyOneHaveSame = false,
  CheckAnyOneHaveSameProp = null, // [] => 0 => prop name, 1 => type of filter, 2 => prop value
  CheckAnyOneHaveSameTRUEfunc = () => {},
  CheckAnyOneHaveSameFALSEfunc = () => {},
) {
  window.XMLHttpRequest = window.tempXMLHttpRequest;

  if (collection == null) return;

  if (CheckAnyOneHaveSame == true && CheckAnyOneHaveSameProp != null) {
    IsNormalPersonEmailExist(collection, CheckAnyOneHaveSameProp, state => {
      if (state === true) {
        AddNew(collection, Data, SuccessFunc, ErrorFunc);
        CheckAnyOneHaveSameFALSEfunc();
      } else {
        CheckAnyOneHaveSameTRUEfunc();
      }
    });

    return;
  }

  AddNew(collection, Data, SuccessFunc, ErrorFunc);
}

function AddNew(collection, data, SuccessFunc, ErrorFunc) {
  var app = FirebaseApp.firestore();

  app
    .collection(collection)
    .add(data)
    .then(d => SuccessFunc(d))
    .catch(e => ErrorFunc(e));
}

export function IsNormalPersonEmailExist(collection, check_DATA, thenFunc) {
  var app = FirebaseApp.firestore();

  app
    .collection(collection)
    .where(check_DATA[0], check_DATA[1], check_DATA[2])
    .onSnapshot(data => {
      thenFunc == null ? '' : thenFunc(data.empty);
    });

  return;
}

export function Log(
  collection,
  check_DATA_USER,
  check_DATA_PASSWORD,
  thenFunc,
) {
  var app = FirebaseApp.firestore();

  app
    .collection(collection)
    .where(check_DATA_USER[0], check_DATA_USER[1], check_DATA_USER[2])
    .where(
      check_DATA_PASSWORD[0],
      check_DATA_PASSWORD[1],
      check_DATA_PASSWORD[2],
    )
    .onSnapshot(data => {
      thenFunc == null ? '' : thenFunc(data);
    });
}

export function Firebase_Update(
  collection,
  filter,
  DATA,
  SuccesFun = () => {},
  ErrorFun = () => {},
) {
  FirebaseApp.firestore()
    .collection(collection)
    .where(filter[0], filter[1], filter[2])
    .get()
    .then(d => {
      id = d.docs[0].id;
      FirebaseApp.firestore()
        .collection(collection)
        .doc(id)
        .update(DATA)
        .then(d => SuccesFun(d))
        .catch(e => ErrorFun(e));
    });
}

export function uploadImage(
  uri,
  type,
  fileName,
  SuccessFun = () => {},
  ErrorFunc = () => {},
) {
  typeimage = type.split('/')[1];

  // let filePath = uri;
  // let rnfbURI = RNFetchBlob.wrap(filePath);
  // // create Blob from file path
  // Blob
  // .build(rnfbURI, { type : type})
  // .then((blob__) => {
  //     console.log('Here')
  //     console.log(blob__)
  //   // upload image using Firebase SDK

  // var ref = FirebaseApp.storage()
  //   .ref();

  //     ref.child(`${fileName}.${typeimage}`)
  //     .put(blob__)
  //     .then((d) =>  SuccessFun(d)).catch((e) => ErrorFunc(e));

  //   });
}

export function FirebaseFileUrl(fileName) {
  return `https://firebasestorage.googleapis.com/v0/b/pro3day.appspot.com/o/${fileName}?alt=media&token=0a24dd5b-93e2-4787-b282-a492526434ce`;
}

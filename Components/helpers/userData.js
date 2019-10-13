import {_retrieveData} from './Functions';

export async function getUserData(needed) {
  // you can use multi needed like [name, profileImage] or name (!for single request)

  data = await _retrieveData('userData');

  data = JSON.parse(data);

  data = data.user;

  if (typeof needed == 'object') {
    var neededSend = {};
    for (i in needed) {
      neededSend[needed[i]] = data[needed[i]];
    }
    return neededSend;
  } else {
    return data[needed];
  }
}

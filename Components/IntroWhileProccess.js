import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-navigation';
import {_retrieveData, _storeData} from '../Components/helpers/Functions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

export default class IntroWhileProccess extends Component {
  constructor() {
    super();
    this.state = {
      errorLocation: false,
    };
  }
  async componentDidMount() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(async r => {
      switch (r) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
            async result => {
              if (result === 'granted') {
                var token = 'Not Yet!';

                Geolocation.getCurrentPosition(data => {
                  var loc = {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude,
                  };
                  Geocoder.geocodePosition(loc)
                    .then(async res => {
                      // res is an Array of geocoding object (see below)
                      await _storeData(
                        'countryInfo',
                        JSON.stringify({
                          location: data,
                          location_: res,
                          token: token,
                        }),
                      );

                      // check if log in or not
                      // we look for asyncStore 'logIn'
                      var logIn = await _retrieveData('logIn');
                      if (logIn !== 'true') {
                        // if not log in before
                        setTimeout(() => {
                          this.props.navigation.navigate('Sign');
                        }, 1000);
                      } else {
                        this.props.navigation.navigate('Home');
                      }
                    })
                    .catch(err => console.log(err));
                });
              }
            },
          );
          break;
        case RESULTS.GRANTED:
          // if not log in before
          // check if log in or not
          // we look for asyncStore 'logIn'
          var logIn = await _retrieveData('logIn');
          if (logIn !== 'true') {
            // if not log in before
            setTimeout(() => {
              this.props.navigation.navigate('Sign');
            }, 1000);
          } else {
            this.props.navigation.navigate('Home');
          }
          break;
        case RESULTS.BLOCKED:
          this.setState({
            errorLocation: true,
          });
          break;
      }
    });
  }

  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <SafeAreaView
        style={{
          width: fw,
          height: fh,
        }}
        forceInset={{
          top: 'always',
          bottom: 'always',
        }}>
        {this.state.errorLocation ? (
          <View style={style.messageCover}>
            <View style={style.message}>
              <ImageBackground
                // eslint-disable-next-line react-native/no-inline-styles
                style={{height: 30, width: 30}}
                source={require('../assets/warning-icons-143676-4978403.png')}
              />
              <Text style={style.messageText}>
                Please help us to get info about your location to help you find
                best events
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View style={style.Container}>
          <ImageBackground
            source={require('../assets/Sign-bg.jpg')}
            style={style.cover}
          />

          <View style={style.overflowBackground} />
        </View>
        <View style={style.LoadingCover}>
          <ImageBackground
            style={style.Loading}
            source={require('../assets/loading.gif')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  Container: {
    width: fw,
    height: fh,
    position: 'absolute',
  },
  cover: {
    width: fw,
    height: fh,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overflowBackground: {
    width: fw,
    height: fh,
    backgroundColor: '#FF8865',
    opacity: 0.4,
    position: 'absolute',
  },

  messageCover: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    width: fw,
    // height: fh
  },
  message: {
    backgroundColor: '#fff',
    width: fw * 0.9,
    borderRadius: 4,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    flexDirection: 'row',
  },
  messageText: {
    width: '90%',
    textAlign: 'center',
    color: '#ffbb33',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, .4)',
    textShadowRadius: 1,
  },
  LoadingCover: {
    width: fw,
    height: fh,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 50,
  },
  Loading: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 300,
  },
});

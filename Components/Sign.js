import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {_storeData, _retrieveData} from './helpers/Functions';
import FirebaseApp from './helpers/FirebaseApp';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

// Create a graph request asking for user information with a callback to handle the response.
export default class Sign extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    paddingLoadPage: false,
    LocationData: null,
    formErrors: [],
    Email: null,
    Password: null,
    FirstName: null,
    SecondName: null,
    FormSign: null,
    FormSignUp: true,
    topAnim: new Animated.Value(fh),
  };

  async componentWillMount() {
    var Ldata = await _retrieveData('countryInfo');
    if (Ldata != null) {
      Ldata = JSON.parse(Ldata);
      this.setState({
        LocationData: Ldata,
      });
    }
  }

  SignUpDataToCache = async data => {
    try {
      data = JSON.stringify(data); // we return data to string to can save it

      await _storeData('userData', data);

      await _storeData('logIn', 'true');

      this.props.navigation.navigate('Home');
    } catch ({message}) {
      this.setState({
        paddingLoadPage: false,
      });
      console.log('GoogleSignIn.initAsync(): ' + message);
    }
  };

  _SignFirebase = (userId, data) => {
    var U_ref = FirebaseApp.firestore()
      .collection('users')
      .doc(userId);
    U_ref.get()
      .then(snaps => {
        console.log('here');
        if (snaps.exists !== true) {
          // sign in before
          var _daa = {
            email: data['user']['email'],
            ...data,
            ...this.state.LocationData,
          };
          U_ref.set(_daa)
            .then(() => {
              this.SignUpDataToCache(data);
            })
            .catch(e => console.log(e));
        } else {
          // no sign in before
          this.SignUpDataToCache(data);
        }
      })
      .catch(e => console.log(e));
  };
  _EmailSignIn = async (user, pass) => {
    this.state.formErrors = [];
    var Errors = this.state.formErrors;

    var U_ref = FirebaseApp.firestore()

      .collection('users')
      .where('email', '==', user)
      .get()
      .then(snaps => {
        console.log('here', snaps);
        if (!snaps.empty) {
          // sign in before
          var data = snaps.docs[0].data();
          if (data.user.pass == undefined) return; // this way using a signed email(G,FB) but this emails not use a password and this make error then we return null
          if (data.user.pass == pass) {
            this.SignUpDataToCache(data);
          } else {
            Errors.push('Password is not correct');
          }
        } else {
          Errors.push('Email is not correct');
          // no sign in before
        }
        this.setState({
          formErrors: Errors,
        });
      });
  };
  _signIn = async () => {
    var cId =
      '190356971199-98i597ooijfo0afa6mbsmn4bitqe05j3.apps.googleusercontent.com';
    GoogleSignin.configure({
      webClientId: cId, // '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    try {
      await GoogleSignin.hasPlayServices();
      var data = await GoogleSignin.signIn();
      var userId = data.user.id;
      // we set a data to str.json
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this._SignFirebase(userId, data);
    } catch (error) {
      console.log(':', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      this.setState({
        paddingLoadPage: false,
      });
    }
  };

  renderBtnSignEmail() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.state.paddingLoadPage === false) {
            this.setState({
              paddingLoadPage: true,
            });
            Animated.timing(this.state.topAnim, {
              duration: 200,
              toValue: this.state.paddingLoadPage == true ? fh : 0,
            }).start();
          }
        }}>
        {this.state.paddingLoadPage === false ? (
          <View
            style={{
              width: 160,
              height: 50,

              margin: 5,
              backgroundColor: '#fff',
              elevation: 4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 999,
            }}>
            <Text style={Sign_style.GoogleText}>Sign With Account</Text>
          </View>
        ) : (
          <View
            style={{
              width: 160,
              height: 50,

              margin: 5,
              backgroundColor: '#fff',
              elevation: 4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 999,
            }}>
            <ImageBackground
              style={Sign_style.loadingImage}
              source={require('../assets/loading.gif')}
            />
          </View>
        )}
      </TouchableWithoutFeedback>
    );
  }

  renderBtnSignGoogle() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.state.paddingLoadPage === false) {
            this.setState({
              paddingLoadPage: true,
            });
            this._signIn();
          }
        }}>
        {this.state.paddingLoadPage === false ? (
          <View style={Sign_style.GoogleBtn}>
            <ImageBackground
              style={Sign_style.GoogleIcon}
              source={require('../assets/new-google-favicon-512.png')}
            />
          </View>
        ) : (
          <View style={Sign_style.GoogleBtn}>
            <ImageBackground
              style={Sign_style.loadingImage}
              source={require('../assets/loading.gif')}
            />
          </View>
        )}
      </TouchableWithoutFeedback>
    );
  }
  renderSignWithEmal() {
    return (
      <Animated.View
        style={{
          width: fw,
          height: fh,
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,.4)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: this.state.topAnim,
          left: 0,
        }}>
        <KeyboardAvoidingView behavior={'position'}>
          <View
            style={{
              width: 320,
              minHeight: fh * 0.6,
              backgroundColor: '#fff',
              borderRadius: 22,
              alignItems: 'center',
              padding: 15,
              marginBottom: 5,
            }}>
            <ScrollView>
              <Text
                style={{
                  fontSize: 32,
                  marginBottom: 10,
                  color: '#393e46',
                  width: '100%',
                  textAlign: 'center',
                }}>
                Sign {this.state.FormSignUp ? 'Up' : 'In'}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#aaa',
                  marginBottom: 10,
                }}>
                Join for more fun? Sign up to create commitments, make a friend,
                or manage your accound
              </Text>
              <View
                style={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderRadius: 22,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({FormSignUp: !this.state.FormSignUp})
                  }
                  style={{
                    width: '50%',
                    height: '100%',
                    borderRadius: 22,
                    backgroundColor: this.state.FormSignUp
                      ? '#FF8865'
                      : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: this.state.FormSignUp ? '#fff' : '#000',
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({FormSignUp: !this.state.FormSignUp})
                  }
                  style={{
                    borderRadius: 22,
                    backgroundColor: !this.state.FormSignUp
                      ? '#FF8865'
                      : 'transparent',
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: !this.state.FormSignUp ? '#fff' : '#000',
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  width: '100%',
                  marginBottom: 10,
                  color: '#fa163f',
                }}>
                {this.state.formErrors.map(v => {
                  return v + '\n';
                })}
              </Text>
              <TextInput
                onChange={d => {
                  this.setState({
                    Email: d.nativeEvent.text,
                  });
                }}
                style={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: '100%',
                  borderRadius: 22,
                  marginBottom: 5,
                }}
                placeholder="Email"
              />
              <TextInput
                onChange={d => {
                  this.setState({
                    Password: d.nativeEvent.text,
                  });
                }}
                style={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: '100%',
                  borderRadius: 22,
                  marginBottom: 5,
                }}
                placeholder="Password"
              />
              {this.state.FormSignUp ? (
                <View>
                  <TextInput
                    onChange={d => {
                      this.setState({
                        FirstName: d.nativeEvent.text,
                      });
                    }}
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'rgba(0,0,0,.2)',
                      width: '100%',
                      marginBottom: 5,

                      borderRadius: 22,
                    }}
                    placeholder="Frist name"
                  />
                  <TextInput
                    onChange={d => {
                      this.setState({
                        SecondName: d.nativeEvent.text,
                      });
                    }}
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'rgba(0,0,0,.2)',
                      width: '100%',
                      marginBottom: 5,

                      borderRadius: 22,
                    }}
                    placeholder="Second name"
                  />
                </View>
              ) : (
                <View />
              )}
              <TouchableOpacity
                onPress={() => {
                  // checking Form

                  this.state.formErrors = [];

                  var Errors = this.state.formErrors;
                  var e = this.state.Email;
                  var p = this.state.Password;
                  var f = this.state.FirstName;
                  var s = this.state.SecondName;
                  if (
                    e == null ||
                    !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e)
                  ) {
                    Errors.push('Email is not valid');
                    this.setState({
                      formErrors: Errors,
                    });
                  }
                  if (p == null || p.length <= 7) {
                    Errors.push(
                      'Password is not valid, Should more than 7 letters',
                    );
                    this.setState({
                      formErrors: Errors,
                    });
                  }
                  if (this.state.FormSignUp == false) {
                    this._EmailSignIn(this.state.Email, this.state.Password);
                    return;
                  }

                  if (f == null || f.length <= 4) {
                    Errors.push(
                      'First name is not valid, Should more than 4 letters',
                    );
                    this.setState({
                      formErrors: Errors,
                    });
                  }

                  if (s == null || s.length <= 4) {
                    Errors.push(
                      'Second name is not valid, Should more than 4 letters',
                    );
                    this.setState({
                      formErrors: Errors,
                    });
                  }
                  if (this.state.formErrors.length != 0) return;
                  var _id = 'id__' + e + Math.random() * 9999999;
                  this._SignFirebase(_id, {
                    user: {
                      id: _id,
                      email: e,
                      familyName: f,
                      givenName: s,
                      name: f + ' ' + s,
                      pass: p,
                      photo:
                        'https://s3.amazonaws.com/rdcms-cfma/files/production/public/images/assets/user-ico-bl.png',
                    },
                  });
                }}
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#FF8865',
                    width: '100%',
                    marginTop: 5,
                    borderRadius: 22,
                    padding: 15,
                    alignItems: 'center',
                  }}
                  placeholder="Secand name">
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                    }}>
                    Sign {this.state.FormSignUp ? 'Up' : 'In'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    paddingLoadPage: false,
                  });
                  Animated.timing(this.state.topAnim, {
                    duration: 200,
                    toValue: fh,
                  }).start();
                }}
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#fa163f',
                    width: '100%',
                    marginTop: 5,
                    borderRadius: 22,
                    padding: 15,
                    alignItems: 'center',
                  }}
                  placeholder="Secand name">
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                    }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }

  // Start the graph request.
  renderFbButton() {
    var _responseInfoCallback = (error, result) => {
      if (error) {
        console.log('Error fetching data: ' + error.toString());
      } else {
        // success

        var FBUSERDATA = {
          id: result.id,
          email: result.email,
          name: result.name,
          givenName: result.first_name,
          familyName: result.last_name,
          photo: result.picture.data.url,
        };
        this._SignFirebase(result.id, {user: FBUSERDATA});
      }
    };

    //Create response callback.
    var infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,id,name,first_name,last_name,picture',
          },
        },
      },
      _responseInfoCallback,
    );

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('here');
          if (this.state.paddingLoadPage === false) {
            this.setState({
              paddingLoadPage: true,
            });
          } else {
            return;
          }
          LoginManager.logInWithPermissions([
            'public_profile',
            'email',
            'user_friends',
          ]).then((result, error) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          });
        }}>
        {!this.state.paddingLoadPage ? (
          <ImageBackground
            imageStyle={{
              borderRadius: 999,
            }}
            source={require('./../assets/fb.jpg')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              elevation: 4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 999,
            }}>
            <ImageBackground
              style={Sign_style.loadingImage}
              source={require('../assets/loading.gif')}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={{
          width: fw,
          height: fh,
        }}>
        <ImageBackground
          source={require('../assets/Sign-bg.jpg')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={Sign_style.overflowBackground} />
          <View style={Sign_style.SectionTop}>
            <Text style={Sign_style.bigTitle}>Welcome To Hasanat Bulider</Text>
          </View>
          <View style={Sign_style.SectionBottom}>
            <Text style={Sign_style.SectionBottomTitle}>
              You Can Sign In With.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {this.renderBtnSignEmail()}
              {this.renderBtnSignGoogle()}
              {this.renderFbButton()}
            </View>
          </View>
        </ImageBackground>

        {this.renderSignWithEmal()}
      </View>
    );
  }
}

const Sign_style = StyleSheet.create({
  overflowBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF8865',
    opacity: 0.4,
    position: 'absolute',
  },
  bigTitle: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,.16)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
  SectionTop: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60%',
  },
  SectionBottom: {
    alignItems: 'center',
    width: '100%',
    height: '40%',
  },
  SectionBottomTitle: {
    color: '#fff',
    marginBottom: 30,
  },
  GoogleBtn: {
    width: 50,
    height: 50,
    marginRight: 5,
    backgroundColor: '#fff',
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 999,
  },
  GoogleIcon: {
    width: 40,
    height: 40,
  },
  GoogleText: {
    color: '#000',
  },
  loadingImage: {
    width: 30,
    height: 30,
  },
});

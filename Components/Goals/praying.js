/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {BoxShadow} from 'react-native-shadow';

import * as Animatable from 'react-native-animatable';

import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

import Store from '../helpers/store/store';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {_storeData, _retrieveData} from '../helpers/Functions';
export default class Praying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Goal title 1',
      titleError: false,
      donation: 5,
      scrollView: null,
      step: 1,
      date: null, // from
      FinshAfter: 5, // to
      RefereeOnHonor: false,
      RefereeEmail: null,
      showPickDate: false,
      renderPickRefereePopUp: false,
      PickDated: null, // day of start
    };
  }
  nextStep = () => {
    var n = this.state.step + 1;
    this.setState({
      step: n,
    });
    if (n == 2) {
      setTimeout(() => {
        this.state.scrollView.scrollToEnd({animated: true});
        this.nextStep();
      }, 400);
    }
    if (n == 3) {
      setTimeout(() => {
        this.state.scrollView.scrollToEnd({animated: true});
      }, 1000);
    }
    if (n == 4) {
      this.setState({
        renderPickRefereePopUp: false,
      });
      setTimeout(() => {
        this.state.scrollView.scrollToEnd({animated: true});
      }, 400);
    }
    if (n == 5) {
      setTimeout(() => {
        this.state.scrollView.scrollToEnd({animated: true});
      }, 400);
    }
  };
  SaveGoal = async () => {
    if (this.state.titleError) {
      return;
    }

    var id = 'id_' + Math.random() * 99999 + '' + this.state.date;

    var Info = {
      title: this.state.title, // string
      type: this.state.type, // string
      donation: this.state.donation, // int
      date: this.state.date, // string
      FinshAfter: this.state.FinshAfter, // int
      RefereeOnHonor: this.state.RefereeOnHonor, // bool
      RefereeEmail: this.state.RefereeEmail, // string | null
      Goaltype: 'Praying', // string
      SuccessProgress: [], // array
      FailedProgress: [], // array
      isFinshed: false, // bool
      id: id, // string
    };

    var GJson = await _retrieveData('Goals');

    if (!GJson) {
      GJson = '[]';
    }

    GJson = JSON.parse(GJson);

    GJson.push(Info);

    GJson = JSON.stringify(GJson);

    await _storeData('Goals', GJson);

    Store.getState().AppSetState.HomeForceUpdate();

    this.props.navigation.pop();
  };

  PickDate = date => {
    console.log(date);
    var d = new moment(date.dateString, 'YYYY-MM-DD').format('DD-MM-YYYY');
    var day = new moment(date.dateString, 'YYYY-MM-DD').format('dddd');

    this.setState({
      showPickDate: !this.state.showPickDate,
      date: d,
      PickDated: day,
    });
    this.nextStep();
  };

  showPickDate = () => {
    this.setState({
      showPickDate: !this.state.showPickDate,
    });
  };

  renderCalenderPicker() {
    return (
      <View
        style={{
          flex: 1,
          width: fw,
          height: fh,
          backgroundColor: 'rgba(0, 0, 0, .4)',
          position: 'absolute',
          zIndex: 99,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 8,
            width: fw * 0.8,
          }}>
          <Calendar
            onDayPress={this.PickDate}
            // Initially visible month. Default = Date()
            current={moment().format('YYYY-MM-DD')}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={moment().format('YYYY-MM-DD')}
          />
        </View>
      </View>
    );
  }

  renderGoalTitle() {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -50,
        }}>
        <View>
          <Text
            style={{
              color: '#aaa',
            }}>
            Goal title
          </Text>
          <TextInput
            defaultValue={this.state.title}
            onChange={t => {
              var t = t.nativeEvent.text;
              if (t.length > 4) {
                this.setState({
                  title: t,
                  titleError: false,
                });
              } else {
                this.setState({
                  title: t,
                  titleError: true,
                });
              }
            }}
            maxLength={12}
            style={{
              height: 80,
              borderWidth: this.state.titleError ? 2 : 0,
              borderColor: this.state.titleError ? '#ff4444' : '#eee',
              backgroundColor: '#f8f6fa',
              borderRadius: 8,
              textAlign: 'center',
              width: fw * 0.8,
              fontSize: 25,
            }}
          />
        </View>
      </View>
    );
  }

  renderOverflowBackgroundImage() {
    return (
      <ImageBackground
        source={require('../../assets/praying.jpg')}
        style={{
          width: fw,
          flex: 1,
          height: fh * 0.6,
        }}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#000', 'transparent']}>
          <Text
            style={{
              color: '#fff',
              marginLeft: 25,
              marginTop: 25,

              fontFamily:
                Platform.OS === 'android' ? 'sans-serif-light' : undefined,

              fontSize: 48,
            }}>
            Praying
          </Text>
          <Text
            style={{
              color: '#fff',
              marginLeft: 25,
              fontWeight: 'bold',
              fontFamily:
                Platform.OS === 'android' ? 'sans-serif-light' : undefined,

              fontSize: 48,
            }}>
            For Allah
          </Text>
          <Text
            style={{
              color: '#fff',
              marginTop: 50,
              marginLeft: 25,

              fontFamily:
                Platform.OS === 'android' ? 'sans-serif-light' : undefined,
              fontSize: 19,
              fontWeight: '400',
              width: '90%',
            }}>
            Salat is the obligatory Muslim prayers, performed five times each
            day by Muslims. It is the second Pillar of Islam Praying to allah is
            the important think in the world should any muslim do it.
          </Text>
        </LinearGradient>
      </ImageBackground>
    );
  }

  renderTimePicker() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 32,
            fontFamily:
              Platform.OS === 'android' ? 'sans-serif-light' : undefined,
          }}>
          Plan your
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}>
          Commitment
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 25,
            width: fw * 0.9,
            justifyContent: 'space-evenly',
          }}>
          <BoxShadow
            setting={{
              width: 150,
              height: 85,
              color: '#000',
              border: 12,
              radius: 3,
              opacity: 0.1,
              x: 0,
              y: 3,
            }}>
            <View
              style={{
                width: 150,
                height: 85,
                borderRadius: 9,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 15,
                  }}>
                  DURATION
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    fontSize: 18,
                  }}
                  onChange={d => {
                    this.setState({
                      FinshAfter: d.nativeEvent.text,
                    });
                  }}
                  keyboardType="number-pad"
                  defaultValue={`${this.state.FinshAfter}`}
                  maxLength={2}
                />
                <Text>week(s)</Text>
              </View>
            </View>
          </BoxShadow>
          <BoxShadow
            setting={{
              width: 150,
              height: 85,
              color: '#000',
              border: 12,
              radius: 3,
              opacity: 0.1,
              x: 0,
              y: 3,
            }}>
            <TouchableOpacity onPress={this.showPickDate}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 150,
                  height: 85,
                  borderRadius: 9,
                  elevation: 2,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 15,
                    }}>
                    DURATION
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    {this.state.PickDated == null
                      ? 'Press'
                      : this.state.PickDated}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </BoxShadow>
        </View>
      </View>
    );
  }

  renderInfoAboutTime() {
    return (
      <View
        style={{
          marginTop: 50,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            width: '80%',
            fontSize: 17,
            textAlign: 'center',
          }}>
          We will report You every{' '}
          {this.state.PickDated == null ? 'Day' : this.state.PickDated} To check
          your progress
        </Text>
        <Text
          style={{
            width: '80%',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 5,
          }}>
          until
        </Text>

        <Text
          style={{
            width: '80%',
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 5,
          }}>
          {this.state.date == null
            ? ''
            : moment(this.state.date, 'DD-MM-YY')
                .add(this.state.FinshAfter, 'w')
                .format('MMMM, DD, YYYY')}
        </Text>
      </View>
    );
  }

  renderPushment() {
    return (
      <View>
        <View
          style={{
            padding: 8,
            marginTop: 25,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 36,
              fontFamily:
                Platform.OS === 'android' ? 'sans-serif-light' : undefined,
            }}>
            Set a
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
              }}>
              {' '}
              Stakes
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: '80%',
              fontSize: 17,
              textAlign: 'center',
            }}>
            if you failed in goal you will punishment your self, Donate to
            Charity foundations, help other people like poor people & more
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 25,
          }}>
          <TextInput
            maxLength={8}
            onSubmitEditing={() => this.nextStep()}
            keyboardType="number-pad"
            defaultValue={`${this.state.donation}`}
            onChange={t => {
              var t = t.nativeEvent.text;
              t = parseInt(t);
              this.setState({
                donation: t,
              });
            }}
            style={{
              borderRadius: 8,
              width: '40%',
              fontSize: 24,
              textAlign: 'center',
              backgroundColor: '#f6f8fa',
            }}
          />
          <Text
            style={{
              fontSize: 24,
              marginLeft: 5,
              textAlign: 'center',
            }}>
            Dollar
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 5,
            textAlign: 'center',
          }}>
          <Text
            style={{
              width: '69%',
            }}>
            You will Donate {this.state.donation}.0 to Charity foundations if
            you failed.
          </Text>
        </View>
      </View>
    );
  }

  renderButtons() {
    return (
      <View
        style={{
          width: '100%',
          marginTop: 25,

          height: '100%',
          justifyContent: 'space-evenly',
          // alignItems: 'flex-end',
          padding: 8,
          flexDirection: 'row-reverse',
          // position: 'absolute',
        }}>
        <AwesomeButtonRick
          type="secondary"
          width={fw * 0.4}
          progress
          disabled={this.state.notfTimeError && this.state.titleError}
          backgroundColor="transparent"
          backgroundActive="transparent"
          backgroundProgress="transparent"
          backgroundPlaceholder="transparent"
          backgroundShadow="transparent"
          activityColor="transparent"
          borderColor="#00C851"
          backgroundDarker="transparent"
          textColor="#2E2E2E"
          onPress={next => {
            /** Do Something **/

            this.SaveGoal();

            next();
          }}>
          Ok!
        </AwesomeButtonRick>
        <AwesomeButtonRick
          type="secondary"
          backgroundColor="transparent"
          backgroundDarker="transparent"
          backgroundActive="transparent"
          backgroundProgress="transparent"
          backgroundPlaceholder="transparent"
          borderColor="transparent"
          backgroundShadow="transparent"
          activityColor="transparent"
          width={fw * 0.4}
          progress
          textColor="#CC0000"
          onPress={next => {
            this.props.navigation.pop();
            next();
          }}>
          Cancel!
        </AwesomeButtonRick>
      </View>
    );
  }

  renderPickReferee() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 32,
          }}>
          <Text
            style={{
              fontSize: 32,
            }}>
            Who will
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            {' '}
            hold
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 42,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            you accountable?
          </Text>
        </View>
        {this.state.step == 3 ? (
          <LinearGradient
            style={{
              height: 160,
            }}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ff9068', '#ff9068']}>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <View>
                <View
                  style={{
                    borderRadius: 999,
                    backgroundColor: '#ff9068',
                    width: 90,
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: -28,
                    left: 20,
                  }}>
                  <ImageBackground
                    source={require('./../../assets/plus.png')}
                    style={{
                      width: 20,
                      height: 20,
                      zIndex: 99,
                      position: 'absolute',
                      top: 6,
                      left: 6,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 999,
                      padding: 5,
                      width: 80,
                      height: 80,
                      position: 'absolute',
                      top: 6,
                      left: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.step == 3) {
                          this.setState({
                            renderPickRefereePopUp: true,
                          });
                        }
                      }}>
                      <ImageBackground
                        source={require('./../../assets/profile.png')}
                        style={{width: 60, height: 60}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                  marginLeft: 35,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 19}}>
                  Pick a
                  <Text style={{fontWeight: 'bold', color: '#fff'}}>
                    {' '}
                    Referee{' '}
                  </Text>
                  to verify {'\n'}your Reports
                </Text>
              </View>
              <View
                style={{
                  marginTop: 40,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                  Adding a Referee can increase your {'\n'} chances of success
                  by 2x!
                </Text>
              </View>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            style={{
              height: 160,
            }}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ff9068', '#ff9068']}>
            <View
              style={{
                width: fw,
                height: 160,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 26,
                  color: '#fff',
                }}>
                {this.state.RefereeOnHonor
                  ? 'You will receive your Reports'
                  : `${this.state.RefereeEmail} will receive your Reports`}
              </Text>
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }

  renderPickRefereePopUp() {
    return (
      <View
        style={{
          flex: 1,
          width: fw,
          height: fh,
          justifyContent: 'flex-end',
          zIndex: 99,
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, .4)',
        }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: fw,
            height: fh,
            justifyContent: 'flex-end',
          }}
          behavior={'position'}>
          <BoxShadow
            setting={{
              width: fw,
              height: fh * 0.4,
              color: '#000',
              border: 26,
              radius: 26,
              opacity: 0.2,
              x: 0,
              y: 3,
            }}>
            <View
              style={{
                width: fw,
                height: fh * 0.4,
                alignItems: 'center',
                backgroundColor: '#fff',
                justifyContent: 'center',
                padding: 15,
              }}>
              <View
                style={{
                  width: fw * 0.8,
                  height: 90,
                  position: 'absolute',
                  top: -40,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      RefereeOnHonor: !this.state.RefereeOnHonor,
                    })
                  }
                  style={{
                    backgroundColor: '#fff',
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 80,
                  }}>
                  <ImageBackground
                    source={require('./../../assets/profile.png')}
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 90,
                      textAlign: 'center',
                    }}>
                    Invite a {'\n'}Referee
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      RefereeOnHonor: !this.state.RefereeOnHonor,
                    })
                  }
                  style={{
                    backgroundColor: '#fff',
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 80,
                  }}>
                  <ImageBackground
                    source={require('./../../assets/man-user.png')}
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 90,
                      textAlign: 'center',
                    }}>
                    On your {'\n'}honor
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.RefereeOnHonor ? (
                <View>
                  <TouchableOpacity onPress={() => this.nextStep()}>
                    <LinearGradient
                      style={{
                        width: 120,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 999,
                      }}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={['#ffbb33', '#FF8800']}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          elevation: 3,
                        }}>
                        Continue
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TextInput
                    onSubmitEditing={d => {
                      this.setState({
                        RefereeEmail: d.nativeEvent.text,
                      });
                      this.nextStep();
                    }}
                    style={{
                      borderRadius: 30,
                      backgroundColor: '#f6f9fa',
                      width: fw * 0.8,
                      textAlign: 'center',
                    }}
                    placeholder="Email address or username"
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 15,
                    }}>
                    Select a Referee to verify the authenticity of {'\n'}
                    your Reports, Referee's have th power to {'\n'}
                    overturn your report, so choose wisely!
                  </Text>
                </View>
              )}
            </View>
          </BoxShadow>
        </KeyboardAvoidingView>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.state.showPickDate ? this.renderCalenderPicker() : <View />}
        <ScrollView ref={ref => (this.state.scrollView = ref)}>
          {/**
            praying part.
            we should have a 3 Requirements
            1 - goal time {day|week|manth}
            2 - notification you or not
          */}
          {this.renderOverflowBackgroundImage()}
          {this.renderGoalTitle()}
          {this.renderTimePicker()}
          {this.state.step >= 2 ? this.renderInfoAboutTime() : <View />}
          {this.state.step >= 3 ? this.renderPickReferee() : <View />}
          {this.state.step >= 4 ? this.renderPushment() : <View />}
          {this.state.step >= 5 ? this.renderButtons() : <View />}
        </ScrollView>
        {this.state.renderPickRefereePopUp ? (
          this.renderPickRefereePopUp()
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  popUpSection: {
    width: '100%',
    padding: 10,
    marginTop: 50,

    alignItems: 'center',
  },
  popUpSectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  popUpSection_0: {
    width: '60%',
  },
  popUpSection_1: {
    width: '40%',
    alignItems: 'center',
  },
});

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
} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';

import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

import Store from '../helpers/store/store';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {_storeData, _retrieveData} from '../helpers/Functions';

const radio_props = [
  {label: '1 Day', value: '1 Day'},
  {label: '1 Week', value: '1 Week'},
  {label: '1 Month', value: '1 Month'},
];
export default class Praying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Goal title 1',
      type: '1 Day',
      notf: false,
      notfTimeError: false,
      titleError: false,
      notfTime: '8',
      notfTimeType: 'PM',
      donation: 5,
      date: moment().format('D-M-Y'),
    };
  }

  SaveGoal = async () => {
    if (this.state.notfTimeError) return;
    if (this.state.titleError) return;

    var id = 'id_' + Math.random() * 99999 + '' + this.state.date;

    var Info = {
      title: this.state.title,
      type: this.state.type,
      notf: this.state.notf,
      notfTime: this.state.notfTime + ' ' + this.state.notfTimeType,
      donation: this.state.donation + '.0',
      date: this.state.date,

      progress: [],
      id: id,
    };

    var GJson = await _retrieveData('Goals');

    if (!GJson) GJson = '[]';

    GJson = JSON.parse(GJson);

    GJson.push(Info);

    GJson = JSON.stringify(GJson);

    await _storeData('Goals', GJson);

    this.props.navigation.pop();
  };

  render() {
    return (
      <ParallaxScrollView
        parallaxHeaderHeight={fh * 0.6}
        backgroundColor="white"
        style={{
          flex: 1,
        }}
        renderForeground={() => (
          <ImageBackground
            source={require('../../assets/praying.jpg')}
            imageStyle={{
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
            style={{
              width: fw,
              flex: 1,
              // height: fh * 0.6,
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
                  marginTop: 50,
                  marginLeft: 25,

                  fontFamily:
                    Platform.OS === 'android' ? 'sans-serif-light' : undefined,
                  fontSize: 19,
                  fontWeight: '400',
                  width: '90%',
                }}>
                Salat is the obligatory Muslim prayers, performed five times
                each day by Muslims. It is the second Pillar of Islam Praying to
                allah is the important think in the world should any muslim do
                it.
              </Text>
            </LinearGradient>
          </ImageBackground>
        )}>
        {/**
            praying part.
            we should have a 3 Requirements
            1 - goal time {day|week|manth}
            2 - notification you or not
        */}

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: 25,
            alignItems: 'center',
          }}>
          <View
            style={{
              with: '80%',
            }}>
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
              maxLength={16}
              style={{
                borderWidth: 2,
                borderColor: this.state.titleError ? '#ff4444' : '#eee',
                backgroundColor: '#f8f6fa',
                borderRadius: 8,
                width: fw * 0.8,
              }}
            />
          </View>
        </View>
        <View style={style.popUpSection}>
          <View style={style.popUpSection_0}>
            <Text style={style.popUpSectionTitle}>Goal time</Text>
          </View>
          <View style={style.popUpSection_1}>
            <RadioForm initial={0} formHorizontal={true} animation={true}>
              {/* To create radio buttons, loop through your array of options */}
              {radio_props.map((obj, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      type: radio_props[i].value,
                    });
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      margin: 5,
                      borderWidth: 2,
                      borderColor:
                        obj.label === this.state.type ? '#00C851' : '#eee',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      borderRadius: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      {radio_props[i].label}
                    </Text>
                    <RadioButton>
                      <RadioButtonInput
                        onPress={() => {}}
                        obj={obj}
                        borderWidth={1}
                        isSelected={obj.label === this.state.type}
                        buttonSize={10}
                        buttonOuterSize={20}
                      />
                    </RadioButton>
                  </View>
                </TouchableOpacity>
              ))}
            </RadioForm>
          </View>
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
            We will notification You every Day To check your progress, When do
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 25,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily:
                Platform.OS === 'android' ? 'sans-serif-light' : undefined,
            }}>
            When do you want to{' '}
          </Text>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            alert you?
          </Text>
        </View>

        <View
          style={[
            style.popUpSection,
            {
              flexDirection: 'row',
            },
          ]}>
          <View style={style.popUpSection_0}>
            <Text style={style.popUpSectionTitle}>Notification</Text>
          </View>

          <View style={style.popUpSection_1}>
            <Switch
              value={this.state.notf}
              onValueChange={() => {
                this.setState({
                  notf: !this.state.notf,
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            maxLength={2}
            defaultValue={this.state.notfTime}
            onChange={v => {
              var t = v.nativeEvent.text;

              t = parseInt(t);

              if (t <= 12 && t !== 0 && t !== NaN) {
                this.setState({
                  notfTime: v.nativeEvent.text,
                  notfTimeError: false,
                });
              } else {
                this.setState({
                  notfTimeError: true,
                });
              }
            }}
            keyboardType="number-pad"
            style={{
              textAlign: 'center',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: this.state.notfTimeError ? '#ff4444' : '#00C851',
              fontSize: 24,
              backgroundColor: '#f6f8fa',
              width: '30%',
              marginRight: 15,
            }}
          />
          <TouchableOpacity
            style={{
              height: 50,
            }}
            onPress={() => {
              this.setState({
                notfTimeType: 'AM',
              });
            }}>
            <Text
              style={{
                fontSize: 24,
                backgroundColor: '#f6f8fa',
                height: '100%',
                borderRadius: 8,
                borderColor:
                  this.state.notfTimeType === 'AM' ? '#00C851' : '#eee',
                width: 50,
                paddingTop: 12,
                borderWidth: 2,

                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              AM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
            }}
            onPress={() => {
              this.setState({
                notfTimeType: 'PM',
              });
            }}>
            <Text
              style={{
                fontSize: 24,
                backgroundColor: '#f6f8fa',
                height: '100%',
                borderRadius: 8,
                width: 50,
                borderWidth: 2,

                marginLeft: 4,
                textAlign: 'center',
                borderColor:
                  this.state.notfTimeType === 'PM' ? '#00C851' : '#eee',

                paddingTop: 12,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              PM
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 8,
            marginTop: 25,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 36,
                fontFamily:
                  Platform.OS === 'android' ? 'sans-serif-light' : undefined,
              }}>
              Put a
            </Text>

            <Text
              style={{
                fontSize: 36,
              }}>
              {' '}
              punishment
            </Text>
          </View>
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
      </ParallaxScrollView>
    );
  }
}

const style = StyleSheet.create({
  popUpSection: {
    width: '100%',
    padding: 10,
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

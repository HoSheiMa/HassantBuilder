/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {getUserData} from './helpers/userData';
import {_retrieveData} from './helpers/Functions';
import HomeCard from './assetsComponents/HomeCard';
import Store from './helpers/store/store';
const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;
export default class Home_ extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();

    this.state = {
      givenName: '',
      GJson: null,
      photoUrl: null,
      countryLogoUrl: null,
      GoalsList: null,
    };
  }

  async componentWillMount() {
    Store.dispatch({
      type: 'addState',
      tag: 'HomeForceUpdate',
      tagValue: this._forceUpdate,
    });
    Store.dispatch({
      type: 'addState',
      tag: 'HomeNavigation',
      tagValue: this.props.navigation,
    });

    var data = await getUserData(['givenName', 'photo']);

    var dataC = await _retrieveData('countryInfo');
    dataC = JSON.parse(dataC);
    var iso = dataC.location_[0].countryCode;

    var url = {
      countryLogoUrl: `https://www.countryflags.io/${iso}/shiny/64.png`,
    };

    var GJson = await _retrieveData('Goals');

    if (!GJson) GJson = '[]';

    GJson = JSON.parse(GJson).reverse();

    data = {
      ...data,
      ...url,
      ...{
        GJson: GJson,
      },
    };

    this.setState(data);
  }

  _forceUpdate = async () => {
    var GJson = await _retrieveData('Goals');

    if (!GJson) {
      GJson = '[]';
    }

    GJson = JSON.parse(GJson);

    this.setState({GJson: GJson.reverse()});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: fw,
          height: fh,
        }}>
        <View style={style.nav}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('Open Drawer');
              this.props.navigation.openDrawer();
            }}>
            <View>
              <ImageBackground
                style={style.nav_lsit}
                source={require('../assets/list-nav.png')}></ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <Text style={style.nav_Logo}> LOGO </Text>
          <View style={style.navCountryCover}>
            <ImageBackground
              source={
                this.state.countryLogoUrl == null
                  ? require('../assets/Flag_-_Unknown.png')
                  : {uri: this.state.countryLogoUrl}
              }
              style={style.navCountry}></ImageBackground>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FF8865',
            flex: 1,
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  this._forceUpdate();
                }}
              />
            }
            style={{
              minHeight: '100%',
            }}>
            <View style={style.box_profile}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  resizeMode="contain"
                  imageStyle={{
                    borderRadius: 3000,
                    zIndex: 1,
                  }}
                  style={style.box_profile_img}
                  source={
                    this.state.photo == null
                      ? require('../assets/loading.gif')
                      : {
                          uri: this.state.photo,
                        }
                  }></ImageBackground>
                <Text style={style.box_profile_name}>
                  {' '}
                  {this.state.givenName}{' '}
                </Text>
              </View>

              <View style={style.overflow_box}>
                <View style={style.overflow_box_view_circle}>
                  <View style={style.overflow_box_circle}>
                    <ImageBackground
                      style={style.overflow_box_circle_image}
                      source={require('../assets/journalism.png')}></ImageBackground>
                  </View>
                  <View style={style.overflow_box_circle}>
                    <ImageBackground
                      style={style.overflow_box_circle_image}
                      source={require('../assets/youtube.png')}></ImageBackground>
                  </View>
                </View>
              </View>
            </View>
            <View style={style.goalsBox}>
              <Text style={style.goalsBox_Title}> Goals </Text>
              <View style={style.goalsBox_scrollView}>
                {this.state.GJson == null ? (
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 19,
                        color: '#ff4444',
                      }}>
                      Loading...
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {this.state.GJson != null && this.state.GJson.length == 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 19,
                        color: '#ffbb33',
                      }}>
                      No goals yet.
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                <View key={this.state.GJson}>
                  {this.state.GJson ? (
                    this.state.GJson.map((d, i) => {
                      return (
                        <HomeCard
                          navigation={this.props.navigation}
                          key={i}
                          {...d}
                        />
                      );
                    })
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={style.coverFloatBtn}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('clicked');
              this.props.navigation.navigate('AddOne');
            }}>
            <View style={style.FloatBtn}>
              <Text style={style.floatbtntext}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  nav: {
    width: fw,
    height: fh * 0.1,
    backgroundColor: '#FF8865',
    // elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nav_lsit: {
    width: 25,
    height: 20,
    marginLeft: 20,
  },
  nav_Logo: {
    width: fw,
    zIndex: -1,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 21,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,.16)',
    textShadowRadius: 6,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
  navCountryCover: {
    position: 'absolute',
    width: fw,
    zIndex: -1,
    alignItems: 'flex-end',
    padding: 10,
  },
  navCountry: {
    width: 40,
    height: 40,
  },
  box_profile: {
    width: fw,
    justifyContent: 'center',
    alignItems: 'center',
    height: fh * 0.2,
    backgroundColor: '#FF8865',
  },
  box_profile_img: {
    width: 80,
    height: 80,
    borderRadius: 300,
    elevation: 4,
    marginBottom: 15,
  },
  box_profile_name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    textShadowRadius: 6,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
  overflow_box: {
    position: 'absolute',
    width: fw,
    paddingLeft: 50,
    paddingRight: 50,
    height: 160,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue'
  },
  overflow_box_view_circle: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  overflow_box_circle: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 3000,
    elevation: 4,
    position: 'relative',
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflow_box_circle_image: {
    width: 30,
    height: 30,
  },
  goalsBox: {
    paddingTop: 30,
    borderTopRightRadius: 55,
    borderTopLeftRadius: 55,
    zIndex: -1,
    minHeight: fh * 0.7,
    backgroundColor: '#f6f9fa',
    width: fw,
    flex: 1,
  },
  goalsBox_Title: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    textShadowRadius: 16,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
  goalsBox_scrollView: {
    overflow: 'scroll',
    flex: 1,
  },
  coverFloatBtn: {
    position: 'absolute',
    zIndex: 9999,
    top: '90%',
    left: '80%',
  },
  FloatBtn: {
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 5000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatbtntext: {
    fontSize: 32,
  },
});

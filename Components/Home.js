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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getUserData} from './helpers/userData';
import {_retrieveData} from './helpers/Functions';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import HomeCard from './assetsComponents/HomeCard';
import Events from './Events';
import fullCard from './assetsComponents/fullCard';
import AddOne from './AddOne';
import News from './News';
import {Icon} from 'react-native-elements';
import NewsFullInfo from './assetsComponents/NewsFullInfo';
import AddNewGoal from './AddNewGoal';

const fw = Dimensions.get('screen').width;

const fh = Dimensions.get('screen').height;

class Home_ extends Component {
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
    var data = await getUserData(['givenName', 'photo']);

    console.log(data);

    var dataC = await _retrieveData('countryInfo');
    dataC = JSON.parse(dataC);
    var iso = dataC.location_[0].countryCode;

    var url = {
      countryLogoUrl: `https://www.countryflags.io/${iso}/shiny/64.png`,
    };

    var GJson = await _retrieveData('Goals');

    if (!GJson) GJson = '[]';

    GJson = JSON.parse(GJson);

    data = {
      ...data,
      ...url,
      ...{
        GJson: GJson,
      },
    };

    this.setState(data);
  }

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
        <LinearGradient
          style={style.box_profile}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FF9966', '#FF5E62']}>
          <View>
            <ImageBackground
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
            <Text style={style.box_profile_name}> {this.state.givenName} </Text>
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
        </LinearGradient>
        <View style={style.goalsBox}>
          <Text style={style.goalsBox_Title}> Goals </Text>
          <ScrollView style={style.goalsBox_scrollView}>
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
            {this.state.GJson ? (
              this.state.GJson.map(d => {
                console.log(d);
                return <HomeCard {...d} />;
              })
            ) : (
              <View />
            )}
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

class HomeDrawer extends Component {
  state = {};
  async componentWillMount() {
    console.log(this.props);
    var data = await getUserData(['givenName', 'photo']);

    var dataC = await _retrieveData('countryInfo');
    dataC = JSON.parse(dataC);
    var iso = dataC.location_[0].countryCode;
    var countryName = dataC.location_[0].country;
    var url = {
      countryLogoUrl: `https://www.countryflags.io/${iso}/shiny/64.png`,
      countryName,
    };

    this.setState({
      ...data,
      ...url,
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          width: fw * 0.8,
          height: fh,
        }}
        forceInset={{
          top: 'always',
          bottom: 'always',
        }}>
        <View
          style={{
            width: '100%',
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: "#f8f9fa"
          }}>
          <ImageBackground
            style={{
              width: 75,
              height: 75,
              borderRadius: 3000,
            }}
            imageStyle={{
              borderRadius: 3000,
              zIndex: 1,
            }}
            source={{uri: this.state.photo}}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 30,

            // backgroundColor: "#f8f9fa",
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: 19,
            }}>
            {this.state.givenName}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 30,
            // backgroundColor: "#f8f9fa",
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={{uri: this.state.countryLogoUrl}}
            style={{
              width: 25,
              height: 25,
              marginRight: 2,
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {this.state.countryName}
          </Text>
        </View>
        <ScrollView style={{width: fw * 0.8, marginTop: 20}}>
          <DrawerNavigatorItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var Events_N = createStackNavigator({
  Events: {
    screen: Events,
  },
  fullCard: {
    screen: fullCard,
  },
});

var News_N = createStackNavigator({
  News: {
    screen: News,
  },
  NewsFullInfo: {
    screen: NewsFullInfo,
  },
});

var Home_N = createStackNavigator({
  Home_: {
    screen: Home_,
  },
  AddOne: {
    screen: AddOne,
  },
  AddNewGoal: {
    screen: AddNewGoal,
  },
});

var MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="home" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    Events: {
      screen: Events_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="event" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    News: {
      screen: News_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return (
            <Icon name="loyalty" color={tintColor} style={{fontSize: 24}} />
          );
        },
      },
    },
  },
  {
    contentComponent: HomeDrawer,
    drawerWidth: fw * 0.8,
    contentOptions: {
      activeTintColor: '#ff6347',
    },
  },
);

var MyApp = createAppContainer(MyDrawerNavigator);

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <MyApp />;
  }
}

const style = StyleSheet.create({
  nav: {
    width: fw,
    height: 50,
    backgroundColor: '#FF8865',
    elevation: 6,
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
    height: 160,
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

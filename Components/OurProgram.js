import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {_retrieveData} from './helpers/Functions';
import programs from './../json/OurPrograms';
import {BoxShadow} from 'react-native-shadow';
const fw = Dimensions.get('screen').width;
import LinearGradient from 'react-native-linear-gradient';

const fh = Dimensions.get('screen').height;

export default class OurProgram extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      countryLogoUrl: null,
      events: [],
      FocusCard: null,
    };
  }
  async componentWillMount() {
    var dataC = await _retrieveData('countryInfo');
    dataC = JSON.parse(dataC);
    var iso = dataC.location_[0].isoCountryCode;

    this.setState({
      countryLogoUrl: `https://www.countryflags.io/${iso}/shiny/64.png`,
    });
  }

  renderSmallTitleInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 25,
          justifyContent: 'space-around',
        }}>
        <View>
          <Text
            style={{
              color: '#393e46',
              fontSize: 18,
              width: 60,
            }}>
            143k
          </Text>
          <Text
            style={{
              color: '#DDDDDD',
              fontSize: 14,

              textShadowColor: 'rgba(0,0,0,.2)',
              textShadowRadius: 1,
            }}>
            PROGRAMS
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#393e46',
              fontSize: 18,
            }}>
            143k
          </Text>
          <Text
            style={{
              color: '#DDDDDD',
              fontSize: 14,
              maxWidth: 80,

              textShadowColor: 'rgba(0,0,0,.2)',
              textShadowRadius: 1,
            }}>
            SERVICES PROVIDED
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#393e46',
              fontSize: 18,
            }}>
            143k
          </Text>
          <Text
            style={{
              color: '#DDDDDD',
              fontSize: 14,

              textShadowColor: 'rgba(0,0,0,.2)',
              textShadowRadius: 1,
            }}>
            EXPENSES
          </Text>
        </View>
      </View>
    );
  }

  renderDonateButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('donate');
        }}
        style={{
          marginTop: 20,
          alignItems: 'center',
          position: 'absolute',
          top: fh - 120,
          left: fw * 0.5 - 100,

          zIndex: 99999,
        }}>
        <BoxShadow
          setting={{
            width: 200,
            height: 50,
            color: '#000',
            border: 6,
            radius: 22,
            opacity: 0.1,
            x: 0,
            y: 3,
          }}>
          <View
            style={{
              borderRadius: 999,
              width: 200,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FF8865',
            }}>
            <Text
              style={{
                color: '#FFF',
              }}>
              DONATE
            </Text>
          </View>
        </BoxShadow>
      </TouchableOpacity>
    );
  }

  renderProgramCard(v, i) {
    var _img = `${v.Img}`;

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('FullInfoAboutProgram', {
            data: v,
          });
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 12,
          }}>
          <BoxShadow
            setting={{
              width: 200,
              height: 300,
              color: '#000',
              border: 6,
              radius: 22,
              opacity: 0.1,
              x: 0,
              y: 3,
            }}>
            <ImageBackground
              resizeMode="cover"
              imageStyle={{
                borderRadius: 22,
              }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 22,
              }}
              source={_img}>
              <LinearGradient
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 22,
                  justifyContent: 'flex-end',
                  padding: 25,
                }}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#000', 'transparent']}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 19,
                  }}>
                  {v.Title}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    marginTop: 5,
                    borderColor: '#fff',
                  }}>
                  See more
                </Text>
              </LinearGradient>
            </ImageBackground>
          </BoxShadow>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <View style={styles.nav}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('Open Drawer');
              this.props.navigation.openDrawer();
            }}>
            <View>
              <ImageBackground
                style={styles.nav_lsit}
                source={require('../assets/list-nav.png')}></ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.nav_Logo}> LOGO </Text>
          <View style={styles.navCountryCover}>
            <ImageBackground
              source={
                this.state.countryLogoUrl == null
                  ? require('../assets/Flag_-_Unknown.png')
                  : {uri: this.state.countryLogoUrl}
              }
              style={styles.navCountry}></ImageBackground>
          </View>
        </View>
        <View
          style={{
            marginTop: 25,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 32,
            }}>
            OUR PROGRAMS
          </Text>
        </View>
        {this.renderSmallTitleInfo()}
        <ScrollView
          style={{
            width: fw,
            zIndex: 999,
            height: 320,
          }}
          horizontal={true}>
          {programs.map(v => {
            return this.renderProgramCard(v);
          })}
        </ScrollView>
        {this.renderDonateButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  nav: {
    width: fw,
    height: fh * 0.1,
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
});

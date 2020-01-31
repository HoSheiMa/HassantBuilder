import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {_retrieveData} from './helpers/Functions';
import WhereWeWorkJson from './../json/WhereWeWork';
const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;
import {Icon} from 'react-native-elements';
import {BoxShadow} from 'react-native-shadow';
import {getLocation} from './helpers/Functions';

import {getDistance} from 'geolib';

export default class WhereWeWork extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      countryLogoUrl: null,
      events: [],
      FocusCard: null,
      myloc: null,
    };
  }

  async componentWillMount() {
    var dataC = await _retrieveData('countryInfo');
    dataC = JSON.parse(dataC);
    var iso = dataC.location_[0].isoCountryCode;
    var loc = await getLocation();
    this.setState({
      myloc: loc,
      countryLogoUrl: `https://www.countryflags.io/${iso}/shiny/64.png`,
    });
  }

  renderNav() {
    return (
      <View style={styles.nav}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log('Open Drawer');
            this.props.navigation.openDrawer();
          }}>
          <View>
            <ImageBackground
              style={styles.nav_lsit}
              source={require('../assets/list-nav.png')}
            />
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
            style={styles.navCountry}
          />
        </View>
      </View>
    );
  }

  renderBigTitle() {
    return (
      <View style={styles.TitleCover}>
        <Text style={styles.title}>Where we work</Text>
      </View>
    );
  }

  renderCard(v, i) {
    if (this.state.myloc) {
      var dis = getDistance(
        {latitude: v.googleLocation.lat, longitude: v.googleLocation.lng},
        {latitude: this.state.myloc.lat, longitude: this.state.myloc.lng},
      );
      dis = Math.floor(dis / 1000) + 'KM';
    }

    return (
      <BoxShadow
        key={i}
        setting={{
          border: 12,
          radius: 1,
          opacity: 0.1,
          color: '#000',
          width: fw * 0.9,
          style: {justifyContent: 'center', alignItems: 'center'},
          height: 260,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('FullCardWhereWeWork', {
              data: v,
              myloc: this.state.myloc,
            });
          }}>
          <View style={styles.Card}>
            <ImageBackground
              imageStyle={styles.ImgStyleInside}
              source={v.img}
              style={styles.CoverImage}>
              <Text
                style={{
                  backgroundColor: 'rgba(0,0,0,.6)',
                  borderRadius: 999,
                  width: 120,
                  textAlign: 'center',
                  color: '#fff',
                  padding: 2,
                  margin: 5,
                }}>
                {dis}
              </Text>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                padding: 8,
                height: 80,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                  }}>
                  {v.title}
                </Text>
                <Text
                  style={{
                    color: '#aaa',
                    fontWeight: 'bold',
                  }}>
                  {v.details}
                </Text>
              </View>
              <View
                style={{
                  width: 50,
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('MapShow', {
                      fromPlace: this.state.myloc,
                      toPlace: v.googleLocation,
                    });
                  }}>
                  <Icon color="#FF8865" name="map" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </BoxShadow>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderNav()}
        {this.renderBigTitle()}
        <View style={styles.CoverOfCards}>
          {WhereWeWorkJson.map((v, i) => {
            return this.renderCard(v, i);
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  CoverImage: {
    width: '100%',
    height: 160,
  },
  ImgStyleInside: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  Card: {
    width: fw * 0.9,
    height: 240,
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  CoverOfCards: {
    alignItems: 'center',
    marginTop: 15,
  },
  TitleCover: {
    alignItems: 'center',
    marginTop: 25,
  },
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
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

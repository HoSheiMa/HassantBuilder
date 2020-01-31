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

export default class CommunityEvents extends Component {
  state = {};
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

  render() {
    return (
      <View>
        {this.renderNav()}

        <Text style={styles.title}> Community Events</Text>
      </View>
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
    marginTop: 18,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

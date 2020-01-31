import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const fw = Dimensions.get('screen').width;

import {Icon} from 'react-native-elements';

import {BoxShadow} from 'react-native-shadow';

const fh = Dimensions.get('screen').height;
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
export default class MapShow extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      fromPlace: this.props.navigation.getParam('fromPlace'),
      toPlace: this.props.navigation.getParam('toPlace'),
      makeLink: false,
    };
  }

  componentWillMount = () => {};
  renderNav() {
    return (
      <View style={styles.nav}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.pop();
          }}>
          <View>
            <ImageBackground
              style={styles.nav_lsit}
              source={require('../../assets/left-arrow.png')}></ImageBackground>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.nav_Logo}> LOGO </Text>
      </View>
    );
  }
  renderGoMapBtn() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            makeLink: !this.state.makeLink,
          });
        }}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}>
        <BoxShadow
          setting={{
            border: 6,
            radius: 26,
            color: '#000',
            opacity: 0.05,
            width: 65,
            height: 65,
          }}>
          <View
            style={{
              borderRadius: 999,
              width: 65,
              height: 65,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <Icon color="#FF8865" name="timeline" />
          </View>
        </BoxShadow>
      </TouchableOpacity>
    );
  }

  renderMap() {
    return (
      <MapView
        region={{
          latitude: this.state.toPlace.lat,
          longitude: this.state.toPlace.lng,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        style={{
          width: fw,
          height: fh,
        }}>
        <Marker
          coordinate={{
            latitude: this.state.toPlace.lat,
            longitude: this.state.toPlace.lng,
          }}
        />

        <Marker
          coordinate={{
            latitude: this.state.fromPlace.lat,
            longitude: this.state.fromPlace.lng,
          }}
        />
        {this.state.makeLink ? (
          <MapViewDirections
            origin={{
              latitude: this.state.fromPlace.lat,
              longitude: this.state.fromPlace.lng,
            }}
            destination={{
              latitude: this.state.fromPlace.lat + 1,
              longitude: this.state.fromPlace.lng + 1,
            }}
            apikey="AIzaSyBAefhRlXEH3vCko-zZTX6PHllTR6av4WI"
            strokeWidth={2}
            strokeColor="hotpink"
          />
        ) : (
          <View />
        )}
      </MapView>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.renderNav()}
        {this.renderMap()}
        {this.renderGoMapBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScrollViewSize: {
    backgroundColor: '#f6f9fa',
    height: fh * 0.9,
    width: fw,
  },
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
    width: 21,
    height: 21,
  },
});

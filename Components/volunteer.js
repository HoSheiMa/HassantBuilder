import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {BoxShadow} from 'react-native-shadow';

const fw = Dimensions.get('screen').width;

const fh = Dimensions.get('screen').height;
export default class volunteer extends Component {
  static navigationOptions = {
    header: null,
  };
  renderDonateButton() {
    return (
      <TouchableOpacity
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

  render() {
    return <View>{this.renderDonateButton()}</View>;
  }
}

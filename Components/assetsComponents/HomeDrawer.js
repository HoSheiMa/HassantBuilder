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
import {getUserData} from './../helpers/userData';
import {_retrieveData} from './../helpers/Functions';
import {SafeAreaView} from 'react-navigation';

import {DrawerNavigatorItems} from 'react-navigation-drawer';

const fw = Dimensions.get('screen').width;

const fh = Dimensions.get('screen').height;
export default class HomeDrawer extends Component {
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
          width: fw,
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
        <ScrollView style={{width: fw, marginTop: 20}}>
          <DrawerNavigatorItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

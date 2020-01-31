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

import {Icon} from 'react-native-elements';

import {BoxShadow} from 'react-native-shadow';

const fw = Dimensions.get('screen').width;

const fh = Dimensions.get('screen').height;
export default class FullCardWhereWeWork extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    data: null,
  };
  componentWillMount() {
    this.state.data = this.props.navigation.getParam('data');
    this.state.myloc = this.props.navigation.getParam('myloc');
  }

  renderTopSide() {
    return (
      <ImageBackground
        source={this.state.data.img}
        style={{
          width: fw,
          height: fh * 0.5,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 28,
              textShadowColor: 'rgba(0,0,0,.2)',
              textShadowRadius: 5,
              marginBottom: 45,
            }}>
            {' '}
            {this.state.data.title}
          </Text>

          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                width: fw * 0.85,
                margin: 7,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity>
                <BoxShadow
                  setting={{
                    border: 8,
                    radius: 8,
                    color: '#000',
                    opacity: 0.2,
                    width: 140,
                    height: 42,
                  }}>
                  <View
                    style={{
                      width: 140,
                      height: 42,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      backgroundColor: '#FF8865',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                      }}>
                      DONATE
                    </Text>
                  </View>
                </BoxShadow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(this.state.data.link).then(s =>
                    s ? Linking.openURL(this.state.data.link) : null,
                  );
                }}>
                <BoxShadow
                  setting={{
                    border: 8,
                    radius: 8,
                    color: '#000',
                    opacity: 0.2,
                    width: 140,
                    height: 42,
                  }}>
                  <View
                    style={{
                      width: 140,
                      height: 42,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      backgroundColor: '#FF8865',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                      }}>
                      SHOW
                    </Text>
                  </View>
                </BoxShadow>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

  renderJsonCompileToText() {
    return (
      <View
        style={{
          padding: 25,
        }}>
        {this.state.data.ourServices.map(v => {
          return (
            <View
              style={{
                marginTop: 2,
                marginBottom: 2,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {v.title}
              </Text>
              {typeof v.data == 'object' ? (
                v.data.map(TV => {
                  return (
                    <View
                      style={{
                        marginTop: 1,
                      }}>
                      <Text>
                        {'\u2022\r'}
                        {TV}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    textAlign: 'left',
                  }}>
                  {v.data}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  renderGoMapBtn() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MapShow', {
            fromPlace: this.state.myloc,
            toPlace: this.state.data.googleLocation,
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
            <Icon color="#FF8865" name="map" />
          </View>
        </BoxShadow>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.renderTopSide()}
          {this.renderJsonCompileToText()}
        </ScrollView>
        {this.renderGoMapBtn()}
      </View>
    );
  }
}

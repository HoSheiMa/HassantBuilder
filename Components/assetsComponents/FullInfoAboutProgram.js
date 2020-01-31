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
export default class FullInfoAboutProgram extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    data: null,
  };
  componentWillMount() {
    this.state.data = this.props.navigation.getParam('data');
  }

  renderTopSide() {
    return (
      <ImageBackground
        source={this.state.data.Img}
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
            {this.state.data.Title}
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
                  Linking.canOpenURL(this.state.data.Link).then(s =>
                    s ? Linking.openURL(this.state.data.Link) : null,
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
        {this.state.data.Data.map(v => {
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
                {v.Title}
              </Text>
              {typeof v.Text == 'object' ? (
                v.Text.map(TV => {
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
                  {v.Text}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderTopSide()}
        {this.renderJsonCompileToText()}
      </ScrollView>
    );
  }
}

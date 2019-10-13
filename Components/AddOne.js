/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

import Store from './helpers/store/store';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GoalCard from './assetsComponents/GoalCard';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

export default class AddOne extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      popUpTop: new Animated.Value(fh),
      fadeOutBody: new Animated.Value(1),
      Available: true,
    };
  }

  componentDidMount() {
    Store.dispatch({
      type: 'addState',
      tag: 'toggleStateOfAddPop',
      tagValue: () => {
        this.setState({
          Available: !this.state.Available,
        });
      },
    });

    Store.dispatch({
      type: 'addState',
      tag: 'togglePopUp',
      tagValue: type => {
        this.props.navigation.navigate('AddNewGoal', {
          Goaltype: type,
        });
      },
    });
  }

  render() {
    return (
      <ParallaxScrollView
        parallaxHeaderHeight={fh * 0.6}
        backgroundColor="white"
        renderForeground={() => (
          <ImageBackground
            source={require('../assets/bg-goals.jpeg')}
            imageStyle={{
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
            style={{
              width: fw,
              flex: 1,
              // height: fh * 0.6,
            }}>
            <LinearGradient
              style={{
                width: '100%',
                height: '100%',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#000', 'transparent']}>
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 25,
                  marginTop: 25,

                  fontFamily:
                    Platform.OS === 'android' ? 'sans-serif-light' : undefined,

                  fontSize: 48,
                }}>
                What's
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 48,
                  marginLeft: 25,
                  marginTop: 0,
                }}>
                your goal?
              </Text>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 50,
                  marginLeft: 25,

                  fontFamily:
                    Platform.OS === 'android' ? 'sans-serif-light' : undefined,
                  fontSize: 19,
                  fontWeight: '400',
                  width: '90%',
                }}>
                Pick from our popular options or create a custom goal specific
                for you, We help you to make you life great with help you
                success in goals.
              </Text>
              <View
                style={{
                  width: fw,
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                }}>
                <View
                  style={{
                    height: 80,
                    width: '90%',
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: 25,
                    backgroundColor: 'rgba(0 ,0, 0, .6)',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      marginRight: 25,

                      fontWeight: '400',
                    }}>
                    You can watch free tutorials from here {'\n'}
                    this tutorials help you to understand {'\n'}goals structure
                  </Text>
                  <TouchableOpacity>
                    <View
                      style={{
                        width: 50,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 6666,
                          padding: 5,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                          }}>
                          Go
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}>
        <View>
          <View style={style.topGoals}>
            <Text style={style.topGoalsText}> Top Goals </Text>
          </View>
          <GoalCard
            Goaltype={'praying'}
            Title={'Praying'}
            Info={`Salat is the obligatory Muslim prayers, performed five times each day by Muslims. It is the second Pillar of Islam Praying to allah is the important think in the world should any muslim do it.`}
            Img={require('../assets/praying.jpg')}
          />
        </View>
      </ParallaxScrollView>
    );
  }
}

const style = StyleSheet.create({
  topGoals: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topGoalsText: {
    fontSize: 24,
    color: '#2E2E2E',
    fontWeight: 'bold',
  },

  popCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: "#000",

    zIndex: 1,
    justifyContent: 'flex-end',
  },
});

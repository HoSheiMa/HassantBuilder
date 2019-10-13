import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

fw = Dimensions.get('screen').width;
fh = Dimensions.get('screen').height;

export default class HomeCard extends Component {
  render() {
    return (
      <View style={style.goalsBox_Card_cover}>
        <View style={style.goalsBox_Card}>
          <View style={style.goalsBox_Card_top_section}>
            <View style={style.goalsBox_Card_section_1}>
              <View style={style.goalsBox_Card_section_1_title_cover}>
                <ImageBackground
                  source={require('../../assets/question-mark-button.png')}
                  style={style.goalsBox_Card_section_1_help}></ImageBackground>
                <Text style={style.goalsBox_Card_section_1_title}> Title </Text>
              </View>
              <Text style={style.goalsBox_Card_section_1_info}>
                Info info info infsa askmklsa info unfas oijioasaskmklsa info
                unfas oijioasf jfioas
              </Text>
            </View>
            <View style={style.goalsBox_Card_section_1_charts}>
              <ProgressCircle
                style={{
                  height: '60%',
                }}
                progress={0.6}
                progressColor={'#FF8865'}
              />
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text> 60 % </Text>
              </View>
            </View>
          </View>
          <View style={style.goalsBox_Card_section_Actions_cover}>
            <View style={style.goalsBox_Card_section_Actions_btns}>
              <ImageBackground
                source={require('../../assets/like.png')}
                style={style.goalsBox_Card_section_Like}></ImageBackground>
            </View>
            <View style={style.goalsBox_Card_section_Actions_btns}>
              <ImageBackground
                source={require('../../assets/dislike.png')}
                style={style.goalsBox_Card_section_Dislike}></ImageBackground>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  goalsBox_Card_cover: {
    width: fw,
    // padding: 50,
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
    height: 180,
  },
  goalsBox_Card: {
    padding: 10,
    // borderTopWidth: 1,
    // borderTopColor: 'rgba(0,0,0,.1)',
    // borderRightWidth: 1,
    // borderRightColor: 'rgba(0,0,0,.1)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0,0,0,.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FF8865',
    backgroundColor: '#fff',
    width: fw * 0.9,
    height: '100%',
    flex: 1,
    elevation: 10,
    // translateY: 0,
  },
  goalsBox_Card_top_section: {
    flexDirection: 'row',
    height: '80%',
  },
  goalsBox_Card_section_1: {
    // justifyContent: 'space-evenly',
    height: '100%',
    width: '70%',
    // backgroundColor: 'red',
  },
  goalsBox_Card_section_1_charts: {
    justifyContent: 'center',
    textAlign: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '30%',
    // backgroundColor: 'blue',
  },

  goalsBox_Card_section_1_title_cover: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalsBox_Card_section_1_title: {
    fontSize: 21,
    color: '#212121',
    marginLeft: 6,
  },
  goalsBox_Card_section_1_info: {
    color: '#4B515D',
    fontSize: 17,
    marginTop: 5,
  },
  goalsBox_Card_section_1_help: {
    width: 16,
    height: 16,
  },
  goalsBox_Card_section_Actions_cover: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: '20%',
    // backgroundColor: 'yellow',
  },
  goalsBox_Card_section_Actions_btns: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalsBox_Card_section_Dislike: {
    width: 16,
    height: 16,
  },
  goalsBox_Card_section_Like: {
    width: 16,
    height: 16,
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

import Store from '../helpers/store/store';

export default class GoalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.coverGoalCard}>
        <View style={style.goalCard}>
          <ImageBackground
            style={style.goalCardImg}
            imageStyle={{
              borderRadius: 20,
            }}
            source={this.props.Img}
          />
          <View style={style.goalCardInfo}>
            <Text style={style.goalCardTitle}>{this.props.Title}</Text>
            <Text style={style.goalCardInfoInfo}>{this.props.Info}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Store.getState().AppSetState.togglePopUp(this.props.Goaltype);
          }}>
          <LinearGradient
            style={style.btnAdd}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#ffbb33', '#FF8800']}>
            <Text style={style.btnAddText}>Add now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  coverGoalCard: {
    width: fw,
    height: 500,
    marginTop: 10,
    alignItems: 'center',
  },
  goalCard: {
    justifyContent: 'space-evenly',
    borderRadius: 4,
    width: '90%',
    height: '80%',
    alignItems: 'center',
  },
  goalCardImg: {
    width: '100%',
    height: 300,
  },
  goalCardTitle: {
    fontSize: 36,
    marginTop: 5,
    textAlign: 'center',
    color: '#212121',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
  },
  goalCardInfo: {
    width: '100%',
    alignItems: 'center',
  },
  goalCardInfoInfo: {
    width: '90%',
    fontSize: 14,
    textAlign: 'center',
    color: '#4B515D',
  },
  btnAdd: {
    marginTop: 25,
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
  },
  btnAddText: {
    fontSize: 19,
  },
});

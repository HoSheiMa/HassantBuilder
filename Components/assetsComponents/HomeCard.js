/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

import moment from 'moment';
import {_retrieveData, _storeData} from '../helpers/Functions';
import Store from '../helpers/store/store';

import {Icon} from 'react-native-elements';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;
export default class HomeCard extends Component {
  constructor() {
    super();
    this.state = {
      SuccessProcess: null,
      toDay: moment().format('DD-MM-YYYY'),
      toDayWasSigning: false,
      FinshAfter: null,
      daysLeft: null,
    };
  }

  _getGoalInfo = async id => {
    var Gaols = await _retrieveData('Goals');
    Gaols = JSON.parse(Gaols);
    var OwnGoal = null;
    for (var i in Gaols) {
      if (Gaols[i].id == id) {
        OwnGoal = Gaols[i];
        break;
      }
    }
    return OwnGoal;
  };

  _isAvaliableToDay = async (id, today, type) => {
    var GJson = await _retrieveData('Goals');

    if (!GJson) GJson = '[]';

    GJson = JSON.parse(GJson);

    var found = false;

    for (var i in GJson) {
      if (GJson[i].id == id) {
        if (type == 'SuccessProgress') {
          for (var ii in GJson[i].SuccessProgress) {
            if (GJson[i].SuccessProgress[ii].date == today) {
              found = true;
              break;
            }
          }
        } else {
          for (var ii in GJson[i].FailedProgress) {
            if (GJson[i].FailedProgress[ii].date == today) {
              found = true;
              break;
            }
          }
        }
      }
    }

    return !found;
  };

  initGoalsTimesAndDates = async () => {
    var _Goal = await this._getGoalInfo(this.props.id);

    // Get  differant from the date booked and today
    var dateBooked = _Goal.date.split('-').reverse();
    for (var i in dateBooked) {
      var int = parseInt(dateBooked[i]);
      if (i == 1) {
        int = int - 1; // moment month 0-11 | real month 1-12
      }
      dateBooked[i] = int;
    }
    var today = this.state.toDay.split('-').reverse();
    for (var i in today) {
      var int = parseInt(today[i]);
      if (i == 1) {
        int = int - 1; // moment month 0-11 | real month 1-12
      }
      today[i] = int;
    }

    dateBooked = moment(dateBooked);
    today = moment(today);

    this.state.FinshAfter = this.props.FinshAfter * 7; // WEEK TO DAYS

    var theRemainingTime =
      this.state.FinshAfter - (today.diff(dateBooked, 'day') + 1); // "Gaol Full Time" - ("the time between datebooked & today" + "today")

    this.state.SuccessProcess =
      (_Goal.SuccessProgress.length / this.state.FinshAfter) * 100;

    var dl = this.state.FinshAfter - theRemainingTime;

    this.state.daysLeft = dl;

    this.state.theRemainingTime = theRemainingTime;
    this.forceUpdate();
  };
  async componentDidMount() {
    await this.initGoalsTimesAndDates();
  }

  async componentWillUpdate() {
    await this.initGoalsTimesAndDates();
  }

  renderGoalInfoSmallPanal() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            marginRight: 8,
            color: '#6FCF97',
          }}>
          SUCCESS {this.props.SuccessProgress.length}
        </Text>
        <Text
          style={{
            color: '#EB5757',
            marginRight: 8,
          }}>
          FAILED {this.props.FailedProgress.length}
        </Text>
        <Text
          style={{
            color: '#F2C94C',
          }}>
          {this.state.FinshAfter && this.state.theRemainingTime
            ? this.state.FinshAfter - this.state.theRemainingTime - 1 >= 0
              ? `DAYS LEFT ${this.state.FinshAfter -
                  this.state.theRemainingTime -
                  1}`
              : ''
            : 'Loading'}
        </Text>
      </View>
    );
  }

  renderCardGoalTitle() {
    return (
      <View numberOfLines={1} style={style.goalsBox_Card_section_1_title_cover}>
        <ImageBackground
          source={require('../../assets/question-mark-button.png')}
          style={style.goalsBox_Card_section_1_help}
        />
        <Text style={style.goalsBox_Card_section_1_title}>
          {' '}
          {this.props.title.toUpperCase()}{' '}
        </Text>
      </View>
    );
  }

  renderCardProgressCircle() {
    return (
      <View style={style.goalsBox_Card_section_1_charts}>
        <ProgressCircle
          style={{
            height: '80%',
          }}
          progress={this.state.daysLeft / this.state.FinshAfter}
          progressColor={'#FF8865'}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text>
            {' '}
            {Math.floor(
              (this.state.daysLeft / this.state.FinshAfter) * 100,
            )}%{' '}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('FullGoalCard', {id: this.props.id});
        }}
        style={style.goalsBox_Card_cover}>
        <View style={style.goalsBox_Card}>
          <View style={style.goalsBox_Card_top_section}>
            {this.renderCardProgressCircle()}
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                marginLeft: 8,
              }}>
              {this.renderCardGoalTitle()}
              {this.renderGoalInfoSmallPanal()}
              <View
                style={{
                  marginTop: 15,
                  alignItems: 'flex-end',
                  width: '80%',
                }}>
                <View
                  style={{
                    width: 'auto',
                    borderRadius: 999,
                    borderWidth: 1,
                    padding: 6,
                  }}>
                  <ImageBackground
                    source={require('./../../assets/right-arrow.png')}
                    style={{
                      width: 34,
                      height: 34,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  goalsBox_Card_cover: {
    width: fw,
    padding: 10,
    alignItems: 'center',
    height: 160,
  },
  goalsBox_Card: {
    padding: 10,
    backgroundColor: '#fff',
    width: fw,
    height: '100%',
  },
  goalsBox_Card_top_section: {
    flexDirection: 'row',
    height: '80%',
  },
  goalsBox_Card_section_1: {
    height: '100%',
    width: '70%',
  },
  goalsBox_Card_section_1_charts: {
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
    width: '18%',
  },

  goalsBox_Card_section_1_title_cover: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalsBox_Card_section_1_title: {
    fontSize: 24,
    color: '#212121',
    width: '80%',
    marginLeft: 6,
  },

  goalsBox_Card_section_1_help: {
    width: 20,
    height: 20,
  },
});

/* eslint-disable eqeqeq */
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

import moment from 'moment';
import {_retrieveData, _storeData} from '../helpers/Functions';
import Store from '../helpers/store/store';
import LinearGradient from 'react-native-linear-gradient';

const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;

export default class fullGaolCard extends Component {
  static navigationOptions = {
    header: null,
  };

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

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      toDay: moment().format('D-M-Y'),
      GoalInfo: null,
      SuccessProcess: 0,
      historyList: null,
      theRemainingTime: null,
      NextReportAfter: null,
      weekNumber: null,
    };

    Store.dispatch({
      type: 'addState',
      tag: 'fullCardForceUpdate',
      tagValue: this._forceUpdate,
    });
  }

  _forceUpdate = async () => {
    var g = await this._getGoalInfo(this.state.id);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({...g});
    this.initGoalsTimesAndDates();
  };

  initGoalsTimesAndDates = async () => {
    var dateBooked = moment(this.state.date, ['DD-MM-YYYY']);

    var today = moment().format('DD-MM-YYYY');

    this.state.FinshAfter = this.state.FinshAfter * 7; // WEEK TO DAYS

    var list = this._makeListOfHistory([
      ...this.state.SuccessProgress,
      ...this.state.FailedProgress,
    ]);

    var dff = moment(today, ['DD-MM-YYYY']).diff(dateBooked, 'd');

    var rt = this.state.FinshAfter - (dff + 1); /** 1 = today */

    var nt = rt % 7;

    var dl = this.state.FinshAfter - rt;

    var wn = this.state.FinshAfter / 7 - (rt - nt) / 7;

    this.setState({
      historyList: list,
      theRemainingTime: rt,
      NextReportAfter: nt,
      daysLeft: dl,

      weekNumber: wn,
      SuccessProcess:
        (this.state.SuccessProgress.length / this.state.FinshAfter) * 100,
    });
  };

  _makeListOfHistory = l => {
    var t = 'DD-MM-YYYY'; // type of date
    var u = []; // unix array
    var nl = []; // new list with sorted
    if (l.length == 0) return [];

    for (var i in l) {
      var _l = moment(l[i].date, t).unix(); // create a unix as id
      u.push(_l); // push unix id
      l[i].id = _l; // add id to old list
    }

    u.sort(); // arraying unix id

    for (var i in u) {
      for (var ii in l) {
        if (l[ii].id == u[i]) {
          nl.push(l[ii]); // push to new list with sorted unix id
        }
      }
    }

    return nl;
  };

  async componentDidMount() {
    var g = await this._getGoalInfo(this.state.id);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({...g});
    this.initGoalsTimesAndDates();
  }
  _delete = async () => {
    var Gaols = await _retrieveData('Goals');

    Gaols = JSON.parse(Gaols);
    for (var i in Gaols) {
      if (Gaols[i].id == this.state.id) {
        Gaols.splice(i, 1);
        break;
      }
    }

    Gaols = JSON.stringify(Gaols);

    await _storeData('Goals', Gaols);
    await Store.getState().AppSetState.HomeForceUpdate();

    this.props.navigation.pop();
  };
  _toggleNotf = async () => {
    var Gaols = await _retrieveData('Goals');

    Gaols = JSON.parse(Gaols);
    for (var i in Gaols) {
      if (Gaols[i].id == this.state.id) {
        Gaols[i].notf = !Gaols[i].notf;
        break;
      }
    }

    Gaols = JSON.stringify(Gaols);

    await _storeData('Goals', Gaols);

    this.setState({
      notf: !this.state.notf,
    });
  };

  reportNow = () => {
    this.props.navigation.navigate(this.state.Goaltype, {
      id: this.state.id,
      weekNumber: this.state.weekNumber,
    });
  };

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
        <View style={styles.navCountryCover}>
          <TouchableOpacity
            onPress={this._delete}
            disabled={
              this.state.isFinshed != undefined ? this.state.isFinshed : true
            }>
            <ImageBackground
              source={require('../../assets/rubbish-bin-delete-button.png')}
              style={styles.navCountry}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderTopTitle() {
    return (
      <View
        style={{
          marginTop: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            textShadowColor: 'rgba(0,0,0,.16)',
            textShadowRadius: 6,
            textShadowOffset: {
              width: 0,
              height: 3,
            },
            fontSize: 26,
          }}>
          {this.state.title ? this.state.title : ''}
        </Text>
        <Text
          style={{
            color: '#ccc',
          }}>
          {this.state.id}
        </Text>
      </View>
    );
  }

  renderTopInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 260,
        }}>
        <View
          style={{
            width: '60%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ProgressCircle
            style={{
              width: '80%',
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
            <Text
              style={{
                fontSize: 28,
              }}>
              {' '}
              {Math.floor(
                (this.state.daysLeft / this.state.FinshAfter) * 100,
              )}%{' '}
            </Text>
            <Text
              style={{
                color: '#aaa',
              }}>
              {this.state.daysLeft} day left
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '40%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '8%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              //   alignItems: 'center',
            }}>
            <View
              style={{
                marginTop: 14,
                marginRight: 5,
                borderRadius: 555,
                width: 8,
                height: 8,
                backgroundColor: '#00C851',
              }}></View>
            <View>
              <Text
                style={{
                  color: '#435270',
                  fontSize: 32,
                }}>
                {this.state.SuccessProgress
                  ? this.state.SuccessProgress.length
                  : 0}
              </Text>
              <Text
                style={{
                  color: '#aaa',
                }}>
                SUCCESS
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,

              //   alignItems: 'center',
            }}>
            <View
              style={{
                marginTop: 14,
                marginRight: 5,
                borderRadius: 555,
                width: 8,
                height: 8,

                backgroundColor: '#ff4444',
              }}></View>
            <View>
              <Text
                style={{
                  color: '#435270',
                  fontSize: 32,
                }}>
                {this.state.FailedProgress
                  ? this.state.FailedProgress.length
                  : 0}
              </Text>
              <Text
                style={{
                  color: '#aaa',
                }}>
                FAILED
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderHistoryOfGaol() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 30,
            borderBottomWidth: 2,
            borderBottomColor: '#eee',
          }}>
          <View>
            <Text
              style={{
                textShadowColor: 'rgba(0,0,0,.16)',
                textShadowRadius: 6,
                textShadowOffset: {
                  width: 0,
                  height: 3,
                },
                fontSize: 26,
                color: '#515f78',
              }}>
              History
            </Text>
            <Text
              style={{
                color: '#aaa',
              }}>
              {this.state.date == null
                ? ''
                : moment(this.state.date, ['DD-MM-YYYY', 'YYYY-MM-DD'])
                    .add(this.state.FinshAfter, 'd')
                    .format('MMMM, DD, YYYY')}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 22,
              color: '#bbb',
            }}>
            {this.state.FailedProgress && this.state.SuccessProgress
              ? this.state.FailedProgress.length +
                this.state.SuccessProgress.length
              : 0}{' '}
            Logs
          </Text>
        </View>
        <View>
          {this.state.historyList == null ? (
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Text>loading...</Text>
            </View>
          ) : (
            <View />
          )}
          {this.state.historyList != null &&
          this.state.historyList.length == 0 ? (
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Text>No history yet.</Text>
            </View>
          ) : (
            <View />
          )}
          {this.state.historyList != null ? (
            this.state.historyList.map((v, i) => {
              return (
                <View
                  style={{
                    borderRadius: 8,
                    height: 70,
                    padding: 15,
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {v.type == 'SUCCESS' ? (
                      <ImageBackground
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        source={require('./../../assets/correct.png')}
                      />
                    ) : (
                      <ImageBackground
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        source={require('./../../assets/uncorrect.png')}
                      />
                    )}
                    <View
                      style={{
                        marginLeft: 20,
                      }}>
                      <Text>
                        {v.type}{' '}
                        <Text
                          style={{
                            color: '#aaa',
                          }}>
                          ({v.data.weekNumber})
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: '#aaa',
                        }}>
                        at {v.date}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 21,
                        color: v.type == 'SUCCESS' ? '#00C851' : '#ff4444',
                      }}>
                      {v.type == 'SUCCESS' ? '+' : '-'}
                      {v.data.value}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }

  renderReportBtn() {
    return (
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {this.state.NextReportAfter != '0' ? (
          <Text
            style={{
              fontSize: 16,
            }}>
            {this.state.NextReportAfter ? this.state.NextReportAfter : '0'}{' '}
            day(s) for next report.
          </Text>
        ) : (
          <View />
        )}
        {this.state.NextReportAfter == 0 ? (
          <TouchableOpacity onPress={this.reportNow}>
            <LinearGradient
              style={{
                borderRadius: 333,
                justifyContent: 'center',
                alignItems: 'center',
                width: 130,
                height: 44,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#ffbb33', '#FF8800']}>
              <Text style={{color: '#fff', fontSize: 17, textShadowRadius: 4}}>
                Report now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderNav()}
        <ScrollView style={styles.ScrollViewSize}>
          {this.renderTopTitle()}
          {this.renderTopInfo()}
          {this.renderReportBtn()}
          {this.renderHistoryOfGaol()}
        </ScrollView>
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
  popUpSection: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  popUpSectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  popUpSection_0: {
    width: '60%',
  },
  popUpSection_1: {
    width: '40%',
    alignItems: 'center',
  },
});

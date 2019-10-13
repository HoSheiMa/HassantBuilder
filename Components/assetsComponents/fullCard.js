import React, {Component} from 'react';
import {
  View as V,
  ScrollView as SV,
  Text as T,
  StyleSheet,
  Dimensions,
  ImageBackground as Img,
  TouchableWithoutFeedback as Touch,
  TouchableOpacity as TO,
} from 'react-native';

import {SafeAreaView as S} from 'react-navigation';

import {getUserData} from './../helpers/userData';
import {_retrieveData} from './../helpers/Functions';

import FirebaseApp from './../helpers/FirebaseApp';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
var fw = Dimensions.get('window').width;
var fh = Dimensions.get('window').height;
import Store from './../helpers/store/store';

export default class fullCard extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      join: false,
      loading: false,
      notf: false,
    };
  }
  async componentDidMount() {
    var Joiners = this.props.navigation.getParam('Joiners');
    var UserId = await getUserData('id');
    for (var i in Joiners) {
      if (Joiners[i].UserId == UserId) {
        this.setState({
          join: true,
        });
        break;
      }
    }
  }
  Join = async () => {
    if (this.state.loading == true) return; // block extra reqs !
    this.setState({
      loading: true,
    });
    var id = this.props.navigation.getParam('Id');
    var UserId = await getUserData('id');
    var token = JSON.parse(await _retrieveData('countryInfo')).token;
    FirebaseApp.firestore()
      .collection('Events')
      .limit(1)
      .where('Id', '==', id)
      .get()
      .then(snap => {
        if (snap.empty == true) {
          return;
        }

        var values = snap.docs[0].data();

        var docId = snap.docs[0].id;

        var Joiners = values.Joiners;

        if (this.state.join == false) {
          Joiners.push({
            UserId: UserId,
            NotfKey: token,
          });
        } else {
          for (var i in Joiners) {
            if (Joiners[i].UserId == UserId) {
              Joiners.splice(i, 1); // delete
              break;
            }
          }
        }
        FirebaseApp.firestore('Events')
          .doc(`Events/${docId}`)
          .update({
            Joiners: Joiners,
          })
          .then(() => {
            this.setState({
              join: !this.state.join,
              loading: false,
            });
            Store.getState().AppSetState.EventCompo();
          });
      });
  };

  render() {
    return (
      <V>
        <V style={styles.Body}>
          <V style={styles.cover}>
            <Img
              imageStyle={{
                borderRadius: 12,
                width: '100%',
                height: '100%',
              }}
              source={{uri: this.props.navigation.getParam('ImgUrl')}}
              style={styles.img}></Img>
          </V>
          <V style={styles.coverInfo}>
            <V style={styles.coverCenter}>
              <T style={styles.title}>
                {this.props.navigation.getParam('Title')}
              </T>
              <SV style={styles.scrollViewInfo}>
                <T style={styles.info}>
                  {this.props.navigation.getParam('Info')}
                </T>
              </SV>
            </V>
          </V>
        </V>
        <V style={styles.btnGroup}>
          <TO
            onPress={this.Join}
            style={{
              width: fw * 0.75,
              marginRight: 7,
            }}>
            <V
              style={[
                styles.btnJoin,
                {
                  backgroundColor: this.state.join
                    ? '#00C851'
                    : 'rgba(255, 136, 101, .16)',
                },
              ]}>
              {this.state.loading ? (
                <Img
                  style={{height: 30, width: 30}}
                  source={require('./../../assets/loading.gif')}></Img>
              ) : (
                <V>
                  <T
                    style={[
                      styles.btnJoinTitle,
                      {
                        color: this.state.join ? '#fff' : '#000',
                      },
                    ]}>
                    {this.state.join ? 'Joined' : 'Join'}
                  </T>
                </V>
              )}
            </V>
          </TO>
          <Touch
            onPress={() => {
              this.setState({
                notf: !this.state.notf,
              });
            }}>
            <V style={styles.btnNotf}>
              <Img
                source={
                  this.state.notf
                    ? require('../../assets/turn-notifications-on-button.png')
                    : require('../../assets/notifications-button.png')
                }
                style={styles.btnNoftImage}></Img>
            </V>
          </Touch>
        </V>
      </V>
    );
  }
}
var styles = StyleSheet.create({
  Body: {
    width: fw,
    height: fh,
  },
  cover: {
    width: fw,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: 8,
    width: '90%',
    height: '90%',
    backgroundColor: '#eee',
  },
  coverInfo: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverCenter: {
    width: '90%',
    height: '100%',
  },
  scrollViewInfo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
  },
  info: {},
  btnGroup: {
    width: fw,
    height: fh * 0.98,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'flex-end',
    padding: 20,
  },
  btnJoin: {
    height: 43,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'rgba(255, 136, 101, .16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnJoinTitle: {
    fontSize: 19,
  },
  btnNotf: {
    height: 43,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 105, 219, .16)',
    borderRadius: 4,
  },
  btnNoftImage: {
    width: 19,
    height: 19,
  },
});

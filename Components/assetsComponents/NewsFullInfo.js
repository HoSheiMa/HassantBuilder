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
  KeyboardAvoidingView,
  TextInput,
  Animated,
} from 'react-native';

import {SafeAreaView as S} from 'react-navigation';

import {getUserData} from './../helpers/userData';
import {_retrieveData} from './../helpers/Functions';

import FirebaseApp from './../helpers/FirebaseApp';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
var fw = Dimensions.get('window').width;
var fh = Dimensions.get('window').height;
import Store from './../helpers/store/store';

export default class NewsFullInfo extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    BtnShow: true,
    like: false,
    loading: false,
    comment: null,
    inputText: new Animated.Value(fw * 0.7),
    ImgUrl: this.props.navigation.getParam('ImgUrl'),
    Title: this.props.navigation.getParam('Title'),
    Comments: this.props.navigation.getParam('Comments'),
    Author: this.props.navigation.getParam('Author'),
  };

  componentWillMount() {}

  async componentDidMount() {
    var Likes = this.props.navigation.getParam('Likes');
    var UserId = await getUserData('id');
    for (var i in Likes) {
      if (Likes[i].UserId == UserId) {
        this.setState({
          like: true,
        });
        break;
      }
    }
  }
  Join = async () => {
    console.log(':', this.state.loading);
    if (this.state.loading == true) return; // block extra reqs !
    this.setState({
      loading: true,
    });
    var id = this.props.navigation.getParam('Id');
    var UserId = await getUserData('id');
    var token = JSON.parse(await _retrieveData('countryInfo')).token;
    FirebaseApp.firestore()
      .collection('News')
      .limit(1)
      .where('Id', '==', id)
      .get()
      .then(snap => {
        if (snap.empty == true) {
          return;
        }

        var values = snap.docs[0].data();

        var docId = snap.docs[0].id;

        var Likes = values.Likes;

        if (this.state.like == false) {
          Likes.push({
            UserId: UserId,
            NotfKey: token,
          });
        } else {
          for (var i in Likes) {
            if (Likes[i].UserId == UserId) {
              Likes.splice(i, 1); // delete
              break;
            }
          }
        }
        FirebaseApp.firestore('News')
          .doc(`News/${docId}`)
          .update({
            Likes: Likes,
          })
          .then(() => {
            this.setState({
              like: !this.state.like,
              loading: false,
            });
            Store.getState().AppSetState.NewsCompo();
          });
      });
  };

  InputAnim = r => {
    this.setState({
      BtnShow: !this.state.BtnShow,
    });
    Animated.timing(this.state.inputText, {
      toValue: r ? fw * 0.9 : fw * 0.7,
      duration: 300,
    }).start();
  };

  comment = async () => {
    this.refs['Comment'].blur();
    if (this.state.comment) {
      if (this.state.loading == true) return; // block extra reqs !
      this.setState({
        loading: true,
      });
      var id = this.props.navigation.getParam('Id');
      var UserId = await getUserData('id');
      var givenName = await getUserData('givenName');
      var photoUrl = await getUserData('photo');
      var date = new Date().toDateString();
      var Ukey =
        'Key_' +
        Math.floor(
          Math.random() * 10000000 * Math.random() * 10000000 +
            Math.random() * 10000000,
        ) +
        date;
      var token = JSON.parse(await _retrieveData('countryInfo')).token;
      FirebaseApp.firestore()
        .collection('News')
        .limit(1)
        .where('Id', '==', id)
        .get()
        .then(snap => {
          if (snap.empty == true) {
            return;
          }

          var values = snap.docs[0].data();

          var docId = snap.docs[0].id;

          var Comments = values.Comments;

          Comments.push({
            UserId: UserId,
            Ukey: Ukey,
            givenName: givenName,
            photoUrl: photoUrl,
            NotfKey: token,
            Text: this.state.comment,
            Date: date,
          });

          console.log('TCL: NewsFullInfo -> comment -> Comments', Comments);

          FirebaseApp.firestore('News')
            .doc(`News/${docId}`)
            .update({
              Comments: Comments,
            })
            .then(() => {
              this.setState({
                loading: false,
                comment: null,
                Comments: Comments,
              });
            });
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled>
        <SV style={styles.Body}>
          <V style={styles.cover}>
            <Img
              imageStyle={{
                borderRadius: 12,
                width: '100%',
                height: '100%',
              }}
              source={{uri: this.state.ImgUrl}}
              style={styles.img}></Img>
          </V>
          <V style={styles.coverInfo}>
            <V style={styles.coverCenter}>
              <T style={styles.title}>{this.state.Title}</T>
              <T
                style={{
                  color: '#aaa',
                }}>
                Author {this.state.Author}
              </T>
              <V>
                <T style={styles.info}>
                  {this.props.navigation.getParam('Info')}
                </T>
              </V>
              <V
                style={{
                  marginTop: 7,
                }}>
                <T
                  style={{
                    color: '#212121',
                  }}>
                  Comments
                </T>
                {this.state.Comments.map((v, i) => {
                  return (
                    <V
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: '#f8f9fa',
                        paddingTop: 6,
                        marginTop: 6,
                      }}>
                      <V
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Img
                          imageStyle={{
                            borderRadius: 5000,
                          }}
                          style={{
                            width: 34,
                            height: 34,
                          }}
                          source={{
                            uri: v.photoUrl,
                          }}></Img>
                        <V>
                          <T
                            style={{
                              marginLeft: 6,
                            }}>
                            {v.givenName}
                          </T>
                          <T
                            style={{
                              marginLeft: 6,
                              color: '#ccc',
                            }}>
                            {v.Date}
                          </T>
                        </V>
                      </V>
                      <T
                        style={{
                          marginLeft: 36,
                        }}>
                        {' '}
                        {v.Text}
                      </T>
                    </V>
                  );
                })}
              </V>
            </V>
          </V>
        </SV>
        <V style={styles.btnGroup}>
          <Animated.View
            style={{
              backgroundColor: '#f8f7fa',
              width: this.state.inputText,
              marginRight: 7,
              height: 42,
              borderRadius: 12,
            }}>
            <TextInput
              ref="Comment"
              placeholder="Comment:Ex Great News"
              value={this.state.comment}
              onChange={e => {
                var t = e.nativeEvent.text;
                this.setState({
                  comment: t,
                });
              }}
              onFocus={() => this.InputAnim(true)}
              onBlur={() => this.InputAnim(false)}
              style={{
                height: '100%',
                width: '80%',
                paddingLeft: 12,
              }}></TextInput>
            <V
              style={{
                zIndex: 2,
                position: 'absolute',
                right: 0,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
              }}>
              <TO onPress={this.comment}>
                <Img
                  source={require('./../../assets/send-button.png')}
                  style={{
                    width: 24,
                    height: 24,
                  }}></Img>
              </TO>
            </V>
          </Animated.View>
          {this.state.BtnShow ? (
            <TO
              onPress={this.Join}
              style={{
                width: fw * 0.15,
                marginRight: 7,
              }}>
              <V
                style={[
                  styles.btnJoin,
                  {
                    backgroundColor: this.state.like
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
                          color: this.state.like ? '#fff' : '#000',
                        },
                      ]}>
                      {this.state.like ? 'Liked' : 'Like'}
                    </T>
                  </V>
                )}
              </V>
            </TO>
          ) : (
            <V></V>
          )}
        </V>
      </KeyboardAvoidingView>
    );
  }
}
var styles = StyleSheet.create({
  Body: {
    width: fw,
    height: fh * 0.87,
  },
  cover: {
    width: fw,
    height: fh * 0.4,
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
  title: {
    fontSize: 28,
  },
  info: {},
  btnGroup: {
    width: fw,
    // height: fh * 0.98,
    flexDirection: 'row',
    top: fh * 0.85,
    justifyContent: 'center',
    position: 'absolute',
    // alignItems: "flex-end",
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

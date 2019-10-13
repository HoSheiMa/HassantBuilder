import React, { Component } from "react";
import {
  Text as T,
  View as V,
  ImageBackground as Img,
  StyleSheet as Css,
  Dimensions,
  TouchableWithoutFeedback as Touch
} from "react-native";
import Store from "./../helpers/store/store";

import { getUserData } from "./../helpers/userData";
import { _retrieveData } from "./../helpers/Functions";

import FirebaseApp from "./../helpers/FirebaseApp";

fw = Dimensions.get("screen").width;
import * as Animatable from "react-native-animatable";

fh = Dimensions.get("screen").height;

export default class EventCard extends Component {
  constructor() {
    super();
    this.state = {
      join: false,
      loading: false,
      notf: false
    };
  }
  rebuild = () => {
    this.setState({
      join: !this.state.join
    });
  };

  async componentDidMount() {
    Store.dispatch({
      type: "addState",
      tag: "EventCompo",
      tagValue: this.rebuild
    });
    var Joiners = this.props.data.Joiners;
    var UserId = await getUserData("id");

    for (var i in Joiners) {
      if (Joiners[i].UserId == UserId) {
        this.setState({
          join: true
        });
        break;
      }
    }

    this.bounce();
  }
  FullInfo = () => {
    this.props.page.navigation.navigate("fullCard", { ...this.props.data });
  };
  Join = async () => {
    if (this.state.loading == true) return; // block extra reqs !
    this.setState({
      loading: true
    });
    var id = this.props.data.Id;
    var UserId = await getUserData("id");
    var token = JSON.parse(await _retrieveData("countryInfo")).token;
    FirebaseApp.firestore()
      .collection("Events")
      .limit(1)
      .where("Id", "==", id)
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
            NotfKey: token
          });
        } else {
          for (var i in Joiners) {
            if (Joiners[i].UserId == UserId) {
              Joiners.splice(i, 1); // delete
              break;
            }
          }
        }
        FirebaseApp.firestore("Events")
          .doc(`Events/${docId}`)
          .update({
            Joiners: Joiners
          })
          .then(() => {
            this.setState({
              join: !this.state.join,
              loading: false
            });
          });
      });
  };

  handleViewRef = ref => (this.view = ref);

  bounce = () =>
    this.view
      .bounceIn(800)
      .then(endState =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  render() {
    return (
      <Animatable.View
        style={[
          style.cover,
          {
            opacity: 0
          }
        ]}
        ref={this.handleViewRef}
      >
        <V style={style.card}>
          <Img
            resizeMode="cover"
            imageStyle={{
              borderRadius: 12,
              width: "100%",
              height: "100%"
            }}
            style={style.cardImage}
            source={{ uri: this.props.data.ImgUrl }}
          ></Img>
          <V style={style.content}>
            <V>
              <T>{this.props.data.Title}</T>
              <T numberOfLines={2}>{this.props.data.Info}</T>
            </V>
            <V style={style.btnGroup}>
              <Touch onPress={this.Join}>
                <V
                  style={[
                    style.btnJoin,
                    {
                      backgroundColor: this.state.join
                        ? "#00C851"
                        : "rgba(255, 136, 101, .16)"
                    }
                  ]}
                >
                  {this.state.loading ? (
                    <Img
                      style={{ height: 30, width: 30 }}
                      source={require("./../../assets/loading.gif")}
                    ></Img>
                  ) : (
                    <V>
                      <T
                        style={[
                          style.btnJoinTitle,
                          {
                            color: this.state.join ? "#fff" : "#000"
                          }
                        ]}
                      >
                        {this.state.join ? "Joined" : "Join"}
                      </T>
                    </V>
                  )}
                </V>
              </Touch>
              <V style={style.btnJoin}>
                <Touch onPress={this.FullInfo}>
                  <T style={style.btnJoinTitle}>More</T>
                </Touch>
              </V>
              <Touch
                onPress={() => {
                  this.setState({
                    notf: !this.state.notf
                  });
                }}
              >
                <V style={style.btnNotf}>
                  <Img
                    source={
                      this.state.notf
                        ? require("../../assets/turn-notifications-on-button.png")
                        : require("../../assets/notifications-button.png")
                    }
                    style={style.btnNoftImage}
                  ></Img>
                </V>
              </Touch>
            </V>
          </V>
        </V>
      </Animatable.View>
    );
  }
}

const style = Css.create({
  cover: {
    marginTop: 20,
    width: fw,
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: fw * 0.95,
    flex: 1,
    // padding: 4,
    height: 100,
    borderRadius: 0,
    borderBottomColor: "rgba(0,0,0,.3)",
    borderBottomWidth: 1,
    transform: [
      {
        translateY: 0
      }
    ],
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cardImage: {
    height: "84%",
    width: 100,
    borderRadius: 12,
    backgroundColor: "#f8f9fa"
  },
  content: {
    width: "63%",
    height: "80%",
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  btnGroup: {
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  btnJoin: {
    height: 34,
    width: 80,
    borderRadius: 4,
    backgroundColor: "rgba(255, 136, 101, .16)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3
  },
  btnJoinTitle: {
    fontSize: 16
  },
  btnNotf: {
    width: 40,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(19, 105, 219, .16)",
    borderRadius: 4
  },
  btnNoftImage: {
    width: 17,
    height: 17
  }
});

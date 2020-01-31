import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

const fw = Dimensions.get('screen').width;

import {CheckBox} from 'react-native-elements';

import {BoxShadow} from 'react-native-shadow';

const options = [
  {
    title: `Women's Transitional Housing`,
    id: 0,
    state: false,
  },
  {
    title: `Hunger Prevention`,
    id: 1,
    state: false,
  },

  {
    title: `Mobile Clinic`,
    id: 2,
    state: false,
  },
  {
    title: `Disaster Relief`,
    id: 3,
    state: false,
  },
  {
    title: `General Donation`,
    id: 4,
    state: false,
  },
];

const fh = Dimensions.get('screen').height;
export default class Donate extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    donates: {},
    CheckBoxsOptions: {},
    CheckBoxsError: {},
    donateError: false,
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    var CheckBoxsOptions = this.state.CheckBoxsOptions;
    var donates = this.state.donates;
    var CheckBoxsError = this.state.CheckBoxsError;
    options.map(option => {
      CheckBoxsOptions[option.id] = false;
      CheckBoxsError[option.id] = false;
      donates[option.id] = 0;
    });
    this.setState({
      CheckBoxsOptions: CheckBoxsOptions,
      donates: donates,
      CheckBoxsError: CheckBoxsError,
    });
  }
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
              source={require('./../assets/left-arrow.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.nav_Logo}> LOGO </Text>
      </View>
    );
  }

  renderCheckBoxDonate({title, id}) {
    return (
      <View
        style={{
          margin: 8,
          padding: 8,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}>
        <TextInput
          onChange={event => {
            if (!/^[0-9]*$/gi.test(event.nativeEvent.text)) {
              var CheckBoxsError = this.state.CheckBoxsError;
              CheckBoxsError[id] = true;
              this.setState({
                CheckBoxsError: CheckBoxsError,
              });
              return;
            } else {
              var CheckBoxsError = this.state.CheckBoxsError;
              CheckBoxsError[id] = false;
              this.setState({
                CheckBoxsError: CheckBoxsError,
              });
            }

            var donates = this.state.donates;
            donates[id] = event.nativeEvent.text;

            this.setState({
              donates: donates,
            });
          }}
          defaultValue={this.state.donates[id].toString()}
          editable={this.state.CheckBoxsOptions[id]}
          keyboardType="number-pad"
          style={{
            borderWidth: 1,
            borderRadius: 4,
            fontSize: 18,
            borderColor: this.state.CheckBoxsOptions[id]
              ? this.state.CheckBoxsError[id]
                ? '#F73859' // error
                : '#7fcd91' // editable
              : '#000',
            textAlign: 'center',
            width: 100,
          }}
        />
        <CheckBox
          onPress={() => {
            var CheckBoxsOptions = this.state.CheckBoxsOptions;
            CheckBoxsOptions[id] = !CheckBoxsOptions[id];
            this.setState({
              CheckBoxsOptions: CheckBoxsOptions,
            });
          }}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            width: 'auto',
          }}
          title={title}
          checked={this.state.CheckBoxsOptions[id]}
        />
      </View>
    );
  }
  renderDonateButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          var donate = this.clacMixOfDonate(this.state.donates);
          var CheckBoxsError = this.state.CheckBoxsError;
          for (var i in CheckBoxsError) {
            if (CheckBoxsError[i]) {
              this.setState({
                donateError: true,
              });
              return;
            } else {
              this.setState({
                donateError: false,
              });
            }
          }
          if (donate == 0) {
            this.setState({
              donateError: true,
            });
            return;
          } else {
            this.setState({
              donateError: false,
            });
          }
          this.props.navigation.navigate('payment', {
            options: options,
            donate: this.state.donates,
          });
        }}
        style={{
          marginTop: 20,
          alignItems: 'center',
          position: 'absolute',
          top: fh - 120,
          left: fw * 0.5 - 100,

          zIndex: 99999,
        }}>
        <BoxShadow
          setting={{
            width: 200,
            height: 50,
            color: '#000',
            border: 6,
            radius: 22,
            opacity: 0.1,
            x: 0,
            y: 3,
          }}>
          <View
            style={{
              borderRadius: 999,
              width: 200,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FF8865',
            }}>
            <Text
              style={{
                color: '#FFF',
              }}>
              DONATE {this.clacMixOfDonate(this.state.donates)}$
            </Text>
          </View>
        </BoxShadow>
      </TouchableOpacity>
    );
  }

  clacMixOfDonate = donates => {
    var value = 0;
    for (var i in donates) {
      if (!this.state.CheckBoxsOptions[i]) {
        continue;
      }
      var donate = parseInt(donates[i]);
      if (donate === 0) {
        continue;
      }
      value = value + donate;
    }
    return value.toString();
  };
  render() {
    return (
      <View>
        {this.renderNav()}
        <Text style={styles.title}>How much will you donate</Text>
        {options.map(option => {
          return this.renderCheckBoxDonate({...option});
        })}
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          You will donate {this.clacMixOfDonate(this.state.donates)}$
        </Text>
        {this.state.donateError ? (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              color: '#ff2e63',
            }}>
            You must set number {'\n'}and donate at least three dollar.
          </Text>
        ) : (
          <View />
        )}
        {this.renderDonateButton()}
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
  title: {
    color: '#000',
    marginTop: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    textShadowRadius: 8,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

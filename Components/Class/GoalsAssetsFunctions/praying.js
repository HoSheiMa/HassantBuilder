import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Goal from './../GoalClass';
import store from '../../helpers/store/store';
const fw = Dimensions.get('screen').width;
const fh = Dimensions.get('screen').height;
const g = new Goal();

export default class makeReportForPraying extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    id: this.props.navigation.getParam('id'),
    weekNumber: this.props.navigation.getParam('weekNumber'),
    goalJson: null,
    GoalRate: '5',
    notValid: false,
  };

  async componentWillMount() {
    var goalJson = await g.setId(this.state.id).get();

    this.setState({
      goalJson: goalJson,
    });
  }

  reportNow = async () => {
    await g.Success({
      details: 'You report in week ' + this.state.weekNumber,
      Goaldata: {
        value: this.state.GoalRate,
        weekNumber: this.state.weekNumber,
      },
    });
    store.getState().AppSetState.fullCardForceUpdate();
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.Title}>
          Set a days your praying{'\n'} in week number {this.state.weekNumber}
        </Text>
        <Text style={styles.SmaillTitle}>Set a from 1 to 7 days</Text>

        <TextInput
          onChange={d => {
            var text = d.nativeEvent.text;

            var v = /^[0-7]{1}$/g.test(text);

            if (v) {
              this.setState({
                GoalRate: text,
                notValid: false,
              });
            } else {
              this.setState({
                notValid: true,
              });
            }
          }}
          defaultValue={this.state.GoalRate}
          maxLength={1}
          keyboardType="number-pad"
          style={[
            styles.Input,
            {
              borderWidth: this.state.notValid ? 1 : 0,
              borderColor: 'red',
            },
          ]}
        />
        <TouchableOpacity
          onPress={this.reportNow}
          disabled={this.state.notValid}>
          <LinearGradient
            style={styles.ReportBtn}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#ffbb33', '#FF8800']}>
            <Text style={{color: '#fff', fontSize: 17, textShadowRadius: 4}}>
              Report now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BackBtn}
          onPress={() => this.props.navigation.pop()}>
          <Text>Back</Text>
          <ImageBackground
            source={require('./../../../assets/right-arrow.png')}
            style={styles.Image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    width: 28,
    height: 28,
  },
  BackBtn: {
    marginTop: 5,
  },
  ReportBtn: {
    borderRadius: 333,
    justifyContent: 'center',
    alignItems: 'center',
    width: fw * 0.7,
    height: 44,
    margin: 15,
  },
  Input: {
    width: fw * 0.7,
    padding: 10,
    borderRadius: 333,

    fontSize: 22,
    textAlign: 'center',
    backgroundColor: '#eee',
  },
  SmaillTitle: {
    textAlign: 'center',
    fontSize: 17,
    color: '#aaa',
    marginBottom: 25,
  },
  Title: {
    textAlign: 'center',
    fontSize: 29,
    marginBottom: 15,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    width: fw,
    height: fh,
  },
});

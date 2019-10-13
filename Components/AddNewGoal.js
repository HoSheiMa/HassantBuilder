import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Praying from './Goals/praying';

export default class AddNewGoal extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam('Goaltype'));
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.props.navigation.getParam('Goaltype') === 'praying' ? (
          <Praying {...this.props} />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

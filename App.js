import React from 'react';
import Home from './Components/Home';
import Sign from './Components/Sign';
import IntroWhileProccess from './Components/IntroWhileProccess';
import {Provider} from 'react-redux';

import Store from './Components/helpers/store/store';
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

console.disableYellowBox = true;

const HomeApp = createStackNavigator({
  Home: {
    screen: Home,
  },
});

const SignApp = createStackNavigator({
  Sign: {
    screen: Sign,
  },
});

const IntroWhileProccessApp = createStackNavigator({
  IntroWhileProccess: {
    screen: IntroWhileProccess,
  },
});

const AppNavigator = createSwitchNavigator(
  {
    Home: HomeApp,
    Sign: SignApp,
    IntroWhileProccess: IntroWhileProccessApp,
  },
  {
    initialRouteName: 'IntroWhileProccess',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
          forceInset={{
            top: 'always',
            bottom: 'always',
          }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}

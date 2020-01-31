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
  TouchableWithoutFeedback,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {getUserData} from './helpers/userData';
import {_retrieveData} from './helpers/Functions';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import HomeCard from './assetsComponents/HomeCard';
import Events from './Events';
import fullCard from './assetsComponents/fullCard';
import AddOne from './AddOne';
import News from './News';
import {Icon} from 'react-native-elements';
import NewsFullInfo from './assetsComponents/NewsFullInfo';
import AddNewGoal from './AddNewGoal';
import Store from './helpers/store/store';
import fullGaolCard from './assetsComponents/fullGaolCard';
import OurProgram from './OurProgram';
import FullInfoAboutProgram from './assetsComponents/FullInfoAboutProgram';
import volunteer from './volunteer';
import HomeDrawer from './assetsComponents/HomeDrawer';
import Home_ from './_Home';
import makeReportForPraying from './Class/GoalsAssetsFunctions/praying';
import WhereWeWork from './WhereWeWork';
import FullCardWhereWeWork from './assetsComponents/FullCardWhereWeWork';
import MapShow from './assetsComponents/MapShow';
import Payment from './Payment';
import Donate from './Donate';
import CommunityEvents from './CommunityEvents';

const fw = Dimensions.get('screen').width;

const fh = Dimensions.get('screen').height;

var Events_N = createStackNavigator({
  Events: {
    screen: Events,
  },
  fullCard: {
    screen: fullCard,
  },
});

var volunteer_N = createStackNavigator({
  volunteer: {
    screen: volunteer,
  },
});

var News_N = createStackNavigator({
  News: {
    screen: News,
  },
  NewsFullInfo: {
    screen: NewsFullInfo,
  },
});

var ourProgramStack = createStackNavigator({
  ourProgram: {
    screen: OurProgram,
  },
  FullInfoAboutProgram: {
    screen: FullInfoAboutProgram,
  },
  payment: Payment,
  donate: Donate,
});

var Home_N = createStackNavigator(
  {
    Home_: {
      screen: Home_,
    },
    AddOne: {
      screen: AddOne,
    },
    AddNewGoal: {
      screen: AddNewGoal,
    },
    FullGoalCard: {
      screen: fullGaolCard,
    },
    Praying: makeReportForPraying,
  },
  {
    headerMode: 'screen',
  },
);

var WhereWeWork_N = createStackNavigator({
  WhereWeWork: WhereWeWork,
  FullCardWhereWeWork: FullCardWhereWeWork,
  MapShow: MapShow,
});

var MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="home" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    'My Events': {
      screen: Events_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="event" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    News: {
      screen: News_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return (
            <Icon name="loyalty" color={tintColor} style={{fontSize: 24}} />
          );
        },
      },
    },
    'Our programs': {
      screen: ourProgramStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return (
            <Icon name="extension" color={tintColor} style={{fontSize: 24}} />
          );
        },
      },
    },
    Volunteer: {
      screen: volunteer_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="toys" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    'Where we work': {
      screen: WhereWeWork_N,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="map" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
    'Community Events': {
      screen: CommunityEvents,
      navigationOptions: {
        drawerIcon: ({tintColor}) => {
          return <Icon name="face" color={tintColor} style={{fontSize: 24}} />;
        },
      },
    },
  },
  {
    contentComponent: HomeDrawer,
    drawerWidth: fw,
    contentOptions: {
      activeTintColor: '#ff6347',
    },
  },
);

var MyApp = createAppContainer(MyDrawerNavigator);

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <MyApp />;
  }
}

/* eslint-disable react/prop-types */
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from '../Main/index.android';
import PlaceInfo from '../PlaceInfo/index.android';
import Logout from '../Logout/index.android';
import FavoritePlaces from '../FavoritePlaces/index.android';

const Main = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
    },
    PlaceInfo: {
      screen: PlaceInfo,
    },
  },
  {
    initialRouteName: 'MapScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const bottomNavTab = createMaterialBottomTabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Octicons name="globe" color={tintColor} size={24} />
      ),
    },
  },
  Favorite: {
    screen: FavoritePlaces,
    navigationOptions: {
      tabBarLabel: 'Favorite Places',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="heart" color={tintColor} size={24} />
      ),
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="logout" color={tintColor} size={24} />
      ),
    },
  },
}, {
  initialRouteName: 'Main',
  activeTintColor: '#3897f0',
  shifting: true,
  barStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E6E6E6',
  },
});

export default bottomNavTab;

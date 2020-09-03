console.disableYellowBox = true;

import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons'; 

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import SnapScreen from './screens/SnapScreen';

import pictureList from './reducers/snap.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({pictureList}));

// BOTTOM NAVIGATOR

var BottomNavigator = createBottomTabNavigator({
  Gallery: GalleryScreen,
  Snap: SnapScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Gallery') {
        iconName = 'md-photos';
      } else if (navigation.state.routeName == 'Snap') {
        iconName = 'ios-camera';
      } 
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#009788',
    inactiveTintColor: '#FFFFFF',
    style: {backgroundColor: '#111224'},
  },
}
);

// STACK NAVIGATOR

var StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,  
    BottomNavigator: BottomNavigator
  }, 
  { 
    headerMode: 'none' 
  } 
);  

// APP CONTAINER

const Navigation = createAppContainer(StackNavigator);

// EXPORT APP FUNCTION

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}


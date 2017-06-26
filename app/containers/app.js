import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import Home from '../pages/home';
import Categories from '../pages/categories';
import About from '../pages/about';
import CategoryDetail from '../pages/categoryDetail';
import Web from '../components/web';
import TopicDetail from '../pages/topicDetail'
const TabContainer = TabNavigator({
    Home:{ screen : Home},
    Categories:{ screen : Categories},
    About:{ screen : About}

  },
  {
    lazy:true,
    tabBarPosition:'bottom',
    tabBarOptions:{
      activeTintColor:'#11B3E9',
      inactiveTintColor:'#999999',
      showIcon:true,
      showLabel:false,
      style:{
        backgroundColor:'#fff'
      },
      indicatorStyle:{
        opacity:0
      },
      tabStyle:{
        padding:0
      },
      labelStyle:{
        fontSize:10,
        marginBottom:5,
        alignSelf:'center'
      }
    }
  }
)


const App = StackNavigator(
  {
    Home:{
      screen:TabContainer,
    },
    CategoryDetail:{
      screen:CategoryDetail,
    },
    Web:{
      screen:Web,
    },
    TopicDetail:{
      screen:TopicDetail,
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 18
      },
      headerTintColor: '#fff',
      headerBackTitle:' '
    }
  }
);


AppRegistry.registerComponent('RubyChina', () => App);

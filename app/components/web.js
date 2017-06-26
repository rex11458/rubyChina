'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  WebView
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

class Web extends Component {

static navigationOptions = ({navigation}) =>{

  return {
      title:navigation.state.params.title,
  };
};

  render() {
    return (
      <WebView
      scalesPageToFilt={true}
      source = {{html:this.props.navigation.state.params.html}}
      >
      </WebView>
    );
  }
}

const styles = StyleSheet.create({

});


export default Web;

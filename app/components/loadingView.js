'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text
} from 'react-native';

class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
      <ActivityIndicator />
      <Text style={styles.text}>正在加载...</Text>
      </View>    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'#666666',
    fontSize:12,
    marginTop:10
  },
});


export default LoadingView;

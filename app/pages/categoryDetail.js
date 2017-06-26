'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import Home from './home'

class CategoryDetail extends Home {

  static navigationOptions = ({navigation}) => {
    // let rowData = navigation.state.params.rowData;
    console.log(navigation);
    return {
      title:navigation.state.params.node.title
  };
}

  render() {
  return super.render();
  }

  componentDidMount(){

    var nodeId = this.props.navigation.state.params.node.nodeId;

    this._fetchData(1,nodeId);

  }
}

const styles = StyleSheet.create({
bg:{
  backgroundColor:'green'
}
});


export default CategoryDetail;

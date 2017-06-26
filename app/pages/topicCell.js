'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';

import TimeAgo from 'react-native-timeago'

import styles from './commonStyle'

class TopicCell extends Component {
  render() {

    let data = this.props.data;

    var avatar_url = data.user.avatar_url;
    if (avatar_url.substring(0,2) =='//') {
        avatar_url = 'https:' + avatar_url;
    }


    return (
      <TouchableHighlight underlayColor='#e6e6e6' onPress={this.props.action}>
        <View style={styles.container}>
          <Image source={{uri: avatar_url}} style={styles.image} />
          <View style={styles.topic}>
            <Text style={styles.title}>{data.title}</Text>
            {this._subTitle()}
          </View>
          <View style={styles.replyNumWrapper}>
          <Text style={styles.asscessory}>{data.replies_count}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _subTitle(){
    let data = this.props.data;
    if(data.replied_at){
      return (
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>
               最后由{data.node_name}于
            </Text>
            <TimeAgo style={styles.subTitle} language='zh' time={data.replied_at} />
            <Text style={styles.subTitle}>发布</Text>
          </View>
        );
    }
    return (
       <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            由{data.node_name}发布
          </Text>
        </View>);
  }

}

export default TopicCell;

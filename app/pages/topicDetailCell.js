'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

import TimeAgo from 'react-native-timeago'


class TopicDetailCell extends Component {
  render() {
      let data = this.props.data;

      var avatar_url = data.user.avatar_url;
      if (avatar_url.substring(0,2) =='//') {
          avatar_url = 'https:' + avatar_url;
      }

      return (
        <TouchableHighlight underlayColor='#e6e6e6'  onPress={this.props.action}>
          <View style={styles.container}>
              <Image source={{uri: avatar_url}} style={styles.image} />
              <View style={styles.content}>
                  <View style={styles.infobar}>
                  <Text style={styles.nickname}>
                    {data.user.name}
                  </Text>
                    {this._timeago()}
                  </View>

                <Text style={styles.comment}>
                  {data.body}
                </Text>
                  </View>
              </View>
        </TouchableHighlight>
      );
  }

  _timeago()
  {
    let data = this.props.data;
    if (data.updated_at) {
      return <TimeAgo style={styles.info} language='zh' time={data.updated_at} />
    }
    return <View />
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderBottomWidth:0.5,
    borderBottomColor:'#e6e6e6',
    flex:1,
    flexDirection:'row',
    padding:10
  },
  image:{
      width: 30,
  		height: 30,
      marginRight:10,
  		borderRadius: 4,
      backgroundColor:'#e6e6e6',
  },
  content:{
    flex:1,
    marginBottom:5,
  }	,
  infobar: {
		flexDirection: 'row',
	},
  nickname:{
    fontSize:12,
    color:'#11B3E9'
  },
  info: {
  fontSize: 12,
  marginLeft: 5,
  color: '#666666',
},
comment: {
		fontSize: 12,
		color: '#666666',
		paddingTop: 5
	},

});



export default TopicDetailCell;

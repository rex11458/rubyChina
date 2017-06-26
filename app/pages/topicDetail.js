'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Alert,
  Text,
  ActivityIndicator,
  ListView
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import LoadingView from '../components/loadingView'

import * as Api from '../network/api'

import TopicDetailHeader from './topicDetailHeader'
import TopicDetailCell from './topicDetailCell'

var CACHE =[];

class TopicDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
        noMore:false,
        loadingMore:false,
        isLoading:false,
        pageIndex:1,
        data:this.props.navigation.state.params.data.rowData,
        dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
    };
  }

  static navigationOptions = ({navigation}) => {

      let rowData = navigation.state.params.data.rowData;
    return {
      title:`详情 (${rowData.replies_count}回复)`,
    };
  };

  componentDidMount(){
    this.setState({isLoading:true,loadingMore:false});
    this._fetchData();
    this._fetchComment(this.state.pageIndex);
  }

  async _fetchData(){
    let response = await fetch(Api.Topic(this.state.data.id)).catch((error) => {Alert.alert(error.valueOf())});
    let responseJson = await response.json();

    this.setState({
      topic:responseJson.topic,
      isLoading:false,
      loadingMore:true,
    })
  }

  async _fetchComment(pageIndex){

      var limit = 50;
  		var offset = (pageIndex-1)*limit;
      let topic_id = this.state.data.id;
      let response = await fetch(Api.Comments(topic_id,offset,limit)).catch((error) => {Alert.alert(error.valueOf())});
      let responseJson = await response.json();

      if (responseJson.replies.length == 0) {
          this.setState({noMore:true});
          return;
      }

      if (pageIndex == 1) {
          this._cacheReset(responseJson.replies);
      }else{
          this._chachePush(responseJson.replies);
      }

      this.setState({
        topic:this.state.topic,
        dataSource:this.state.dataSource.cloneWithRows(CACHE),
        pageIndex:this.state.pageIndex+1
      })
  }

  _cacheReset(items){
      CACHE.splice(0,CACHE.length);
      this._chachePush(items);

  }
  _chachePush(items){

      for (var i in items) {

        CACHE.push(items[i]);
      }

  }
  _topicDetail(){
    this.props.navigation.navigate('Web',{html:this.state.topic.body_html,title:this.state.topic.title});
  }

  render() {
    if (this.state.isLoading) {
        return <LoadingView />
    }

    return (
      <View style={styles.container}>

          <ListView style={styles.list}
          renderHeader= {() => (
            <TopicDetailHeader data={this.state.topic} action={() => {
              this._topicDetail()
            }}/>
          )}
          renderFooter={() => this._renderFooter()}
          onEndReached={() => this._onEndReached()}
          dataSource = {this.state.dataSource}
          renderRow ={(rowData) =>(

                <TopicDetailCell data={rowData} action={() => {}}/>

          )}
          >
          </ListView>
      </View>
    );
  }

  _renderFooter(){
      if (this.state.noMore) {

        return <View style={{marginVertical: 30}} ><Text style={{textAlign:'center',fontSize:14,color:'#666666'}}>没有更多了～</Text></View>;
      }

      if (this.state.loadingMore) {
        return <ActivityIndicator color='#11B3E9' style={{marginVertical:20}}/>
      }else{
        return <View style={{marginVertical: 10}} ></View>;
      }
  }

  _onEndReached(){
    if (!this.state.loadingMore) {
        return;
    }
   this._fetchComment(this.state.pageIndex);
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    list:{
    }
});

export default TopicDetail;

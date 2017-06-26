'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Text
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import * as Api from '../network/api'
import TopicCell from './topicCell'
import LoadingView from '../components/loadingView'

var CACHE =[];

class Home extends Component {

  static navigationOptions = ({navigation}) => {
    // let rowData = navigation.state.params.rowData;
    console.log(navigation);
    return {
      title:'社区精华',
      tabBarLabel:'精华',
      tabBarIcon:({tintColor,size}) => (
        <Icon name='md-home' color={tintColor} size={26}/>
      )
        };
  };


  constructor(props) {
    super(props);

    this.state = {
      nodeId:'',
      loadingMore:false,
      isRefreshing:false,
      pageIndex:1,
      dataSource: new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 != r2
      }),
    };
  }

async  _fetchData(page,nodeId=''){
      this.setState({isRefreshing:true,loadingMore:false,nodeId});
      var limit = 50;
      var offset = (page-1)*limit;

    let response = await fetch(Api.NodeTopics(offset,limit,nodeId)).catch( (error) => { console.log(error);} );
    let responseJson = await response.json();

    if (page == 1) {
        this._cacheReset(responseJson.topics);
    }else{
      this._chachePush(responseJson.topics);
    }
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(CACHE),
        pageIndex:this.state.pageIndex+1,
        isRefreshing:false,
        loadingMore:true,
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

  _selectTopic(rowData){
    this.props.navigation.navigate('TopicDetail',{data:{rowData}})
  }

componentDidMount(){

  this._fetchData(1);
}

  render() {
    return (
      <ListView
      dataSource = {this.state.dataSource}
      renderRow ={(rowData) =>(
            <TopicCell data={rowData} action={() => this._selectTopic(rowData)}/>
      )}
      refreshControl={
         <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={()=>{this._onRefresh()}}
           tintColor="#11B3E9"
           title="Loading..."
           titleColor="#3f9ce9"
           colors={['#ff0000', '#00ff00', '#0000ff']}
           progressBackgroundColor="#ffff00"
         />
       }
       renderFooter = {()=>(this._renderFooter())}
       onEndReached={() => {this._onEndReached()}}
       automaticallyAdjustContentInsets={false}
      >
      </ListView>
    );
  }

  _onRefresh(){
    this.setState({
      pageIndex:1
    })
      this._fetchData(this.state.pageIndex);

  }

  _renderFooter(){
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
    return this._fetchData(this.state.pageIndex);
    }
}

const styles = StyleSheet.create({

});


export default Home;

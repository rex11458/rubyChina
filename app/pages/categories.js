'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Alert
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import LoadingView from '../components/loadingView'
import Icon from 'react-native-vector-icons/Ionicons'

import * as Api from '../network/api'

class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged:(r1,r2) => r1 != r2
        }),
        loading:true
    };
  }

  static navigationOptions = {
    title:'分类',
    tabBarIcon:({tintColor}) => (
      <Icon name='md-apps' color={tintColor} size={26}/>
    )
  }

   showLoading(){
     return (

      <LoadingView />
     );
   }

    item(rowData) {
     return (
       <TouchableHighlight underlayColor={'#E6E6E6'} style={styles.item} onPress={() => {
         this.props.navigation.navigate('CategoryDetail',{node:{title:rowData.name,nodeId:rowData.id}})
       }}>
          <View style={styles.content}>
          <Text style={styles.title}>{rowData.name}</Text>
          <Text style={styles.accessoryTitle}>{rowData.summary}</Text>
          </View>
       </TouchableHighlight>
     )
   }

 showNodeList(){
   return (
      <View style={styles.container}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow ={(rowData) =>(
        this.item(rowData)
      )}
      />
      </View>
   );
 }

 componentDidMount(){
   this.fetchData();
 }
  async fetchData(){

    let response =  await fetch(Api.Nodes()).catch(
      (error) => {
        Alert.alert(error);
        console.console.error((error));
      }
    );
    let responseJson = await response.json();
    this.fill(responseJson);
}

  fill(responseJson){

    this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.nodes),loading:false});

  }

  render() {
    if (this.state.loading) {

        return this.showLoading();
    }else{
      return this.showNodeList();
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'white',
  },
  item:{
    flex:1,
    backgroundColor:'white'
  },
  content:{
    borderBottomWidth:0.5,
    borderBottomColor:'#c6c6c6',
    paddingVertical:20,
    marginHorizontal:10,
    justifyContent:'center',
  },
  title:{
    color:'#333333',
    fontSize:16
  },
  accessoryTitle:{
    paddingTop:5,
    color:'#999999',
    fontSize:12
  }
});

export default Categories;

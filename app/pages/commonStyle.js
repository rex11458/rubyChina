/* @flow */

import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderBottomWidth:0.5,
    borderBottomColor:'#c6c6c6',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    padding:10
  },
  image:{
    alignSelf:'center',
    width:50,
    height:50,
    marginRight:10,
    borderRadius:3,
    justifyContent:'center',
    backgroundColor:'#e6e6e6'
  },
  topic:{
    flex:1,
    marginBottom:5,
  },
  title:{
    fontSize:14,
    textAlign:'left',
    color:'#333333'
  },
  subTitleContainer:{
    flex:1,
    flexDirection:'row'
  },
  subTitle:{
      color:'#999999',
      fontSize:12,
      textAlign:'left',
      marginTop:10
  },
  replyNumWrapper:{
    marginLeft:8,
    marginRight:2,
    justifyContent:'center',
    alignSelf:'center',
    backgroundColor:'#98acdf',
    paddingHorizontal:10,
    paddingVertical:2,
    height:18,
    borderRadius:10

  },
  asscessory:{
    color:'#fff',
    fontWeight:'bold'
    // flex:1,
    // alignItems:'flex-start',
    // height:18,
    // // justifyContent:'center',
    // borderRadius:10,
    // paddingHorizontal:2,
    // // paddingVertical:10,
    // backgroundColor:'#f5f5f5'
  }
});

module.exports = styles;

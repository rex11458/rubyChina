'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Linking,
  ScrollView,
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import DeviceInfo from 'react-native-device-info'

class About extends Component {


    static navigationOptions = {
      title:'关于',
      tabBarIcon:({tintColor}) => (
        <Icon name='md-information-circle' color={tintColor} size={26}/>
      )
    }

  render() {
    let version = DeviceInfo.getVersion();
    let address = 'https://github.com/rex11458/rubyChina.git';

    return (
      <ScrollView style={styles.container}>
         <View style={styles.imageContainer}>
            <View style={styles.bg}>
                <Image source={require('../resource/images/react_log.png')} style={styles.image}/>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {version}
              </Text>
              <TouchableHighlight style={styles.button} underlayColor='#88B3E9' onPress={() => {
                Linking.openURL(address)

              }}>
                  <Text style={styles.url}>
                    {address}
                  </Text>

              </TouchableHighlight>
           </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1

  },
  imageContainer:{
    flex:1,
    marginBottom:20,
  },
  textContainer:{
    flex:1,
  },
  bg:{
    backgroundColor:'#222222'
  },
  image:{
    alignSelf:'center',
    width:200,
    height:200,
  },
  text:{
    color:'#222222',
    fontSize:16,
    alignSelf:'center',
  },
  button:{
    borderRadius:5,
    alignSelf:'center',
    marginHorizontal:10,
    marginTop:20,
    alignSelf:'center',
  },
  url:{
    alignSelf:'center',
    color:'#11B3E9',
    textDecorationLine:'underline',
    fontSize:16,

  }
});

export default About;

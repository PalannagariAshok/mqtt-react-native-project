
import React, {Component} from 'react';


import {View, Text, StyleSheet, Image, ScrollView,TextInput,Button,TouchableHighlight} from 'react-native';
const UselessTextInput = () => {
    const [value, onChangeText] = React.useState('');
  
    return (
      <TextInput
        
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    );
  }
  class mqttConnAuth extends Component{
    render() {
      let dashboardView;
      if(this.props.mqttConnection){
        dashboardView=<TouchableHighlight 
                  onPress={this.props.dashboardView}
                  style={styles.submit}
                  underlayColor='#2A4B7C'
                           >
                              
                    <Text style={[styles.submitText]}>View Dashboard</Text>
              </TouchableHighlight>
      }
    return (
        <View style={styles.BrokerConnectionAuth}>
            <Text style={{fontSize:20,paddingVertical:20}}>Authentication</Text>
            <View style={styles.BrokerConnectionAuth1} >
                <View >
                <Text>Username</Text>
                <View> 
                  <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                          type="text"
                          value={this.props.brokerUsername}
                          onChangeText={this.props.onChangeBrokerUsername}
                      />
                </View>
                </View>
                <View>
                <Text> Password</Text>
                <View> 
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                          type="text"
                          value={this.props.brokerPassword}
                          onChangeText={this.props.onChangeBrokerPassword}
                      />
                </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:40}}>
                <Button
                    onPress={this.props.brokerConnection}
                    title={this.props.mqttConnection? 'Connected' : 'connect'}
                    color= {this.props.mqttConnection? '#5EBA7D' : '#2A4B7C'}
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={this.props.brokerDisconnection}
                  title={this.props.mqttConnection? 'Disconect' : 'Disconect'}
                  color= {this.props.mqttConnection? '#FA583F' : '#2A4B7C'}
                    accessibilityLabel="Learn more about this purple button"
                />
              </View>
              <View style={{flexDirection:'row',justifyContent:'center',paddingVertical:40}}>
              
                {dashboardView}
               
              </View>
            </View>
                 
    );
    }


}

const styles = StyleSheet.create({
  submit:{
    width:'40%',
    paddingVertical:10,
   
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  },
    btnActive:{
        color:'#2A4B7C'
    },
    btn:{
        color:'#000000'
    },
    
    BrokerConnectionAuth:{
      height:'40%',
      flexDirection: 'column',
      // justifyContent: 'space-around',
    },
    BrokerConnectionAuth1:{
      
      flexDirection: 'column',
      justifyContent: 'space-around',
    }
  });
export default mqttConnAuth
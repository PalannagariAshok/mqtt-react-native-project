
import React, {Component} from 'react';


import {View, Text, StyleSheet, Image, ScrollView,TextInput} from 'react-native';
// const UselessTextInput = () => {
//     const [value, onChangeText] = React.useState('');
  
//     return (
//       <TextInput
        
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//         onChangeText={text => onChangeText(text)}
//         value={value}
//       />
//     );
//   }
  class mqttConn extends Component{
    render() {
        return (
            <View style={{ height:'40%',
                        flexDirection: 'column',
                        justifyContent: 'space-around',}}>
                <View >
                    <Text>MQTT Broker Url 1</Text>
                    <View> 
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        type="text"
                        value={this.props.brokerUrl}
                        onChangeText={this.props.onChangeBrokerUrl}
                    />
                    </View>
                </View>
                <View>
                    <Text>Port</Text>
                    <View> 
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        type="cc-number"
                        keyboardType="number-pad"
                        value={this.props.brokerPort}
                        onChangeText={this.props.onChangeBrokerPort}
                    />
                    </View>
                </View>
            </View>
            );
    }


}
const styles = StyleSheet.create({
    tabledata: {
      flex: 1,
      flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    iteratedata: {
        flex: 1, 
        flexDirection: 'row',
    },

    
  });


export default mqttConn
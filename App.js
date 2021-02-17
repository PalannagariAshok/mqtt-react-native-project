/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  HomeScreen,
  TextInput,
  Button,
  
} from 'react-native';
// import { Client, Message } from 'react-native-paho-mqtt';
import MqttConn from './component/mqttConnection';
//import mqtt from 'mqtt';
import MQTT from 'sp-react-native-mqtt';
import MqttConnAuth from './component/mqttConnectionAuth'
import Dashboard  from './component/dashboard'
//import { createStackNavigator, createAppContainer } from 'react-navigation';
//import { createStackNavigator, createAppContainer } from 'react-navigation';  
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,

} from 'react-native/Libraries/NewAppScreen';

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

export default class App extends Component {
 
  state = {
    msg:{
      name:'hi'
    },
    brokerUrl:'',
    brokerPort:'',
    username:'',
    password:'',
    connect:0,
    ecgVal:[],
    xVal:[],
    dataset:[],
    tempVal:'',
    humVal:'',
    graphScreen:false,
    mqttConnect:false,
    mqttClient:{},
  }
  // static navigationOptions = {  
  //   title: 'Home',  
  //   headerStyle: {  
  //       backgroundColor: '#f4511e',  
  //   },  
  //   //headerTintColor: '#0ff',  
  //   headerTitleStyle: {  
  //       fontWeight: 'bold',  
  //   },  
  // };  
  handleChangeBrokerUrl=e =>{
    
     return this.setState({brokerUrl: e})}
    ;
  handleChangeBrokerPort=e =>this.setState({brokerPort: e});
  dashboardView=e=>{
    this.setState({connect: 1});
  }
  brokerDisconnection=e=>{
    if(Object.keys(this.state.mqttClient).length>0){
      this.state.mqttClient.disconnect()
    }
    
  }
  handleBrokerConnection=()=>{
    console.log('pressed')
    try{
      MQTT.createClient({
        uri: `${this.state.brokerUrl}:${this.state.brokerPort}`,
        clientId: 'your_client_id'
      }).then((client) =>{
        this.setState({
          mqttClient:client,
        })
        client.on('closed', () =>{
          console.log('mqtt.event.closed');
          this.setState({
            mqttConnect:false,
            connect:0,
          })
        });
        
        client.on('error', (msg) =>{
          console.log('mqtt.event.error', msg);
          this.setState({
            mqttConnect:false,
            connect:0,
          })
        });
      
        client.on('message', (msg)=> {
          console.log('mqtt.event.message', msg.data,);
          let ecgdata;
          let tempdata;
          
          
          if(msg.topic==='ecgdata'){
            ecgdata=JSON.parse(msg.data);
            if( ecgdata.ecgval[0].x){
              console.log("value",ecgdata.ecgval)
              this.setState({
                // connect:1,
                dataset:ecgdata.ecgval
              })
            }
          }
          if(msg.topic==='tempdata'){
            tempdata=JSON.parse(msg.data);
            if( tempdata){
              this.setState({
                tempVal:tempdata.tempval,
                humVal:tempdata.humval,
              })
            }
          }
          
          console.log("hghgjghj",this.state.tempVal)
          
          // if(this.state.ecgVal.length>6){
          //   this.setState({
          //     ecgVal:this.state.ecgVal.slice(1)
          //   })
          // }
          // if(this.state.xVal.length>6){
          //   this.setState({
          //     xVal:this.state.xVal.slice(1)
          //   })
          // }
          // if(this.state.dataset.length>6){
          //   this.setState({
          //     dataset:this.state.dataset.slice(1)
          //   })
          // }
          
          
          
        });
      
        client.on('connect', ()=> {
          console.log('connected');
          this.setState({
            mqttConnect:true,
          })
          client.subscribe('ecgdata', 0);
          client.subscribe('tempdata', 0);
          let data={
            "name":"ashok"
          }
          //client.publish('ecgdata',JSON.stringify(data), 0, false);
        });
      
        client.connect();
      }).catch((err)=>{
        this.setState({
          mqttConnect:false,
          connect:0,
        })
        console.log(err,'no');
      });
    //   const client = new Client({ uri: 'ws://test.mosquitto.org:8080/mqtt', clientId: 'clientId', storage: myStorage });
    //  client.on('connectionLost', (responseObject) => {
    //   if (responseObject.errorCode !== 0) {
    //     console.log(responseObject.errorMessage);
    //   }
    // });
    // client.on('messageReceived', (message) => {
    //   // console.log(message.payloadString);
    //   let msg=JSON.parse(message.payloadString);
    //   // console.log(message.payloadString,typeof(msg))
    //   // let Message = JSON.parse(msg);
    //   this.setState({
    //     msg:msg,
    //   })
    //   console.log(msg.name,this.state.msg);
    //   // if(message.payloadString){
    //   //   let Message = JSON.parse(message);
    //   // }
    //   //console.log(`Received message ${message} from topic ${topic}`)
    // });
    //   client.connect().then(() => {
    //     // Once a connection has been made, make a subscription and send a message.
    //     console.log('onConnect');
    
    //     return client.subscribe('World');
    //   })
    //   .then(() => {
    //     let jsonObject={
    //       name:"ashok1273"
    //     }
    //     const message = new Message(JSON.stringify(jsonObject));
    //     message.destinationName = 'World';
    //     client.send(message);
    //   })
    //   .catch((responseObject) => {
    //     if (responseObject.errorCode !== 0) {
    //       console.log('onConnectionLost12:' + responseObject.errorMessage);
    //     }
    //   });
    }
    catch(err){
      this.setState({
        mqttConnect:false,
        connect:0,
      })
      console.log(err,'no')
    }
  };

  componentDidMount(){
    
    
  };
  render() {
    let Screen;
    if (this.state.connect) {
      Screen = <Dashboard  dataset={this.state.dataset} tempValue={this.state.tempVal} humValue={this.state.humVal}/>;
    } else {
      Screen =  <View style={{padding:10}}>
            <MqttConn brokerUrl={this.state.brokerUrl} brokerPort={this.state.brokerPort} onChangeBrokerUrl={this.handleChangeBrokerUrl} onChangeBrokerPort={this.handleChangeBrokerPort}/>

            <MqttConnAuth brokerConnection={this.handleBrokerConnection} connection={this.state.connect} mqttConnection={this.state.mqttConnect} dashboardView={this.dashboardView} brokerDisconnection={this.brokerDisconnection} /> 
            {/* <Text>{this.state.brokerUrl}</Text>  */}
          </View>;
    }
  return (
    <>
        <View  style={{flex: 1, flexDirection: 'column', backgroundColor: '#EBFAFFCC'}} >  
            <StatusBar backgroundColor="#2A4B7C" barStyle="light-content" />
            <View style={styles.head_child}>
              <Text style={styles.head_child_1}>Sensors View</Text>
            </View>
              {Screen}
        </View>
    </>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  head_child: {
    paddingLeft:70,
    
    height:'10%',
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    fontFamily:"Cochin",
    backgroundColor:"#2A4B7C",
  },


  head_child_1: {
    paddingLeft:"14%",
    alignItems:"center",
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  head_child_2: {
    flex:1,
    color: '#3F4245',
    fontSize: 23,
    fontWeight: 'bold',
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

// const AppNavigator = createStackNavigator(  
//   {  
//       Home: HomeScreen,  
//       Profile: ProfileScreen  
//   },  
//   {  
//       initialRouteName: "Home"  
//   }  
// ); 
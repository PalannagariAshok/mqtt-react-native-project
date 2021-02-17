
import React, {Component} from 'react';
import Speedometer from 'react-native-speedometer-chart';
import RNSpeedometer from 'react-native-speedometer'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { Dimensions,SafeAreaView, } from "react-native";
const screenWidth = Dimensions.get("window").width;


//import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
// import Svg, {
//     Circle,
//     Ellipse,
//     G,
//     TSpan,
//     TextPath,
//     Path,
//     Polygon,
//     Polyline,
//     Line,
//     Rect,
//     Use,
  
//     Symbol,
//     Defs,
//     LinearGradient,
//     RadialGradient,
//     Stop,
//     ClipPath,
//     Pattern,
//     Mask,
//   } from 'react-native-svg';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


import {View, Text, StyleSheet, Image, ScrollView,TextInput,Button,TouchableHighlight} from 'react-native';

  class Dashboard extends Component{
    state={
        ecg:true,
        value: 10,
    }
    onclickECG=e=>{
        this.setState({
            ecg:true
        })
        return true;
    }
    onclickTemp=e=>{
        
        this.setState({
            ecg:false
        })
        return true;
    }
    render() {
        // console.log(this.props.xVal,this.props.ecgVal)
        // let xaxis=this.props.xVal.length>0 ?this.props.xVal: [0];
        // let yaxis=this.props.ecgVal.length>0? this.props.ecgVal :[0];
        let Dataset;
        if(this.props.dataset.length>0){
            Dataset=this.props.dataset;
        }
        else{
            Dataset=[{x:10,y:10},{x:12,y:20}];
        }
        // let maxXValue = Dataset.map(a => Math.max(a.x));
        // console.log(maxXValue)
        // xaxis.forEach((element,i) => {
        //     Dataset.push({
        //         x:element,
        //         y:yaxis[i]
        //     })
        // });
       
        console.log(Dataset)
        let graphScreen;
            if(this.state.ecg){
                if (this.props.dataset.length>0) {
                    graphScreen =  <Chart
                                        style={{ height: 250, width: 400 }}
                                        data={Dataset}
                                        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                                        // xDomain={{ min: 0, max: 10 }}
                                        // yDomain={{ min: 0, max: 20 }}
                                        
                                        >
                                        <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                                        <HorizontalAxis tickCount={5} />
                                        {/* <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} /> */}
                                        <Line theme={{ stroke: { color: '#2A4B7C', width: 1.5}}} 
                                        smoothing="cubic-spline"/>
                                    </Chart>;
                    } else {
                        graphScreen=  <Chart
                                        style={{ height: 250, width: 400 }}
                                        data={[
                                            { x: 0, y: 0 },
                                            { x: 0, y: 2 },
                                        
                                        ]}
                                        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                                        xDomain={{ min: 0, max: 10 }}
                                        yDomain={{ min: 0, max: 20 }}
                                        
                                        >
                                        <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                                        <HorizontalAxis tickCount={5} />
                                        {/* <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} /> */}
                                        <Line theme={{ stroke: { color: '#2A4B7C', width: 1.5}}} 
                                        smoothing="cubic-spline"/>
                                    </Chart>;
                    }
            }
            else if (this.props.tempValue != ''){
                graphScreen=<View >
                    <Text style={{paddingLeft:20,fontSize:20}}>Temperature</Text>
                    <SafeAreaView style={styles.container}>
                    
                        <RNSpeedometer 
                            value={this.props.tempValue} size={250}
                            maxValue={50}
                        />
                        
                        <View style={{paddingLeft:'22%'}}>
                            <Text>0</Text>
                            
                        </View>
                        <View style={{paddingLeft:'75%'}}>
                            <Text>50</Text>
                            
                        </View>
                    </SafeAreaView>
                    
                    <View style={{paddingTop:'50%'}}>
                        <Text style={{paddingLeft:20,fontSize:20}}>Humidity</Text>
                        <SafeAreaView style={styles.container1}>
                        
                            <RNSpeedometer 
                                value={this.props.humValue} size={250}
                                maxValue={50}
                            />
                            
                            <View style={{paddingLeft:'22%'}}>
                                <Text>0</Text>
                                
                            </View>
                            <View style={{paddingLeft:'75%'}}>
                                <Text>50</Text>
                                
                            </View>
                        </SafeAreaView>
                    </View>
                    <Text style={{paddingTop:'80%'}}>1</Text>
                </View>
            }
            
        return (
            <View style={styles.Dashboard}>
                    <View style={styles.User}>
                        <Text style={styles.Text}>User Dashboard</Text>
                        <View style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',}}>
                            <TouchableHighlight 
                            style ={{
                                height: 40,
                                width:100,
                                borderRadius:10,
                                
                            }}>
                                <Button
                                   onPress={() => {
                                    this.onclickECG();
                                 }} 
                                    title="ECG"
                                    color={this.state.ecg?"#2A4B7C": "#c5c5c5"}
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </TouchableHighlight>
                            <TouchableHighlight 
                            style ={{
                                height: 40,
                                width:130,
                                borderRadius:10,
                                
                            }}>
                                <Button
                                    onPress={() => {
                                        this.onclickTemp();
                                     }} 
                                    title="Temperature"
                                    color={this.state.ecg? "#c5c5c5":"#2A4B7C"}
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </TouchableHighlight>
                            
                        </View>
                    </View>
                    <View style={styles.lineGraph}>
                
                    {/* <Chart
                        style={{ height: 200, width: '100%', backgroundColor: '#eee' }}
                        xDomain={{ min: -2, max: 10 }}
                        yDomain={{ min: -2, max: 20 }}
                        padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
                        >
                        <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
                        <HorizontalAxis tickCount={3} />
                        <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
                        <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
                        </Chart> */}
                       {/* <LineChart
                            data={data}
                            width={screenWidth}
                            height={300}
                            chartConfig={chartConfig}
                            bezier
                            /> */}

                       {graphScreen }
                    </View>
                    
               
            </View>
            );
    }


}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        
      },
      container1: {
        flex:1,
        flexDirection:'column',
        
      },
    Dashboard: {
        height:'90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    User: {
        height:'25%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal:20
    },
    Text:{
        fontSize:30,
        paddingVertical:25,
        textAlign: 'center',
    },
    lineGraph:{
        height:'65%',
        // borderWidth:1,
        // borderColor:'red'
    }
    
  });


export default Dashboard 
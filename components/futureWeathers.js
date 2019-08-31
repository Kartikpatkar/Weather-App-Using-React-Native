import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,TouchableNativeFeedback} from 'react-native';

export default class FutureWeathers extends Component {
    render(){
        //console.log(this.props.keyVal);
        return (
            <TouchableNativeFeedback onPress={this.props.gotoMethod}>
                <View style={styles.notes} key={this.props.keyIndex}>
                    <View style={styles.dateinside}><Text style={styles.dateText}> {this.props.date}</Text></View>
                    <View style={styles.inside}><Text style={styles.timeText}>{this.props.time}</Text></View>
                    <View style={styles.inside}><Text style={styles.tempText}>{this.props.keyVal}˚</Text></View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    notes: {
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        height:60,
        borderLeftWidth:5,
        borderLeftColor:'#0bff99',
        marginTop:3,
        justifyContent:'center',
        alignItems:'center',
    },
    dateinside: {
        flex:0.8,
        justifyContent:'center',
        alignItems: 'center',
    },
    inside: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    dateText: {
        padding:5,
        fontSize:20,
    },
    timeText: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding:5,
        fontSize:20,
        
    },
    tempText: {
        padding:5,
        fontSize:20,
        justifyContent:'center',
        alignItems: 'center',
    }
});
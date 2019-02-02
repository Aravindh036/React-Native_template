import React, { Component } from 'react';
import {View,Text} from 'react-native';
import style from './css';

export class TextField extends Component{
    render(){
        return(
            <Text style = {style[this.props.id]}>
               {this.props.text}
            </Text>
        )
    }
}

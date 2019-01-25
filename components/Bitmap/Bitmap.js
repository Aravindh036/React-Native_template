import React, { Component } from 'react';
import style from './css';
import images from "./images"


export class Bitmap extends Component{
    render(){
        if(this.props.mask){
            var {Image} = require('react-native-svg');
            console.log("hi");
            return(
                <Image
                    width='100%'
                    height='100%'
                    href = {{uri:images[this.props.id]}}
                    preserveAspectRatio='xMidYMid slice'
                    clipPath = {"url(#clip)"}
                />
            )
        }
        var {Image} = require('react-native');
        return(
            <Image style = {style[this.props.id]}
                source = {{uri:images[this.props.id]}}
            />
        )
    }
}

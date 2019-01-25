import React, { Component } from 'react';
import {View,WebView} from 'react-native';
import style from './css';
import Svg, {Path, Rect} from 'react-native-svg';
import allpoints from './points';

export class Rectangle extends Component{
    render(){
        if(this.props.points){
            var points = allpoints[this.props.id];
            var svg = ``;
            commands = ``;
            for(var point_index in points){
                point_from = points[parseInt(point_index)];
                var next = 0;
                if(parseInt(point_index) === points.length-1){
                    next = 0;
                }
                else{
                    next = parseInt(point_index)+1
                }
                point_to = points[parseInt(next)];
                curveFrom = point_from.curveFrom;
                curveTo = point_to.curveTo;
                if(point_from.hasCurveFrom && point_from.hasCurveTo){
                    commands += `C ${curveFrom[0]},${curveFrom[1]} ${curveTo[0]},${curveTo[1]}  ${point_to.point[0]},${point_to.point[1]}\n`
                }
                else if(point_from.hasCurveFrom){
                    commands += `Q ${curveFrom[0]},${curveFrom[1]} ${point_to.point[0]},${point_to.point[1]}\n`
                }
                else{
                    commands += `Q ${curveTo[0]},${curveTo[1]} ${point_to.point[0]},${point_to.point[1]}\n`
                }
            }
            start = points[0];
            border = view_style["borderColor"];
            if(border != undefined){
                stroke = border.substring(0,border.length-2);
            }
            else{
                stroke = "black";
            }
            bgColour = view_style["backgroundColor"];
            if(bgColour != undefined){
                fill = bgColour.substring(0,bgColour.length-2);
                oppacity = parseInt(bgColour.substring(bgColour.length-2,bgColour.length),16)/255;
            }
            else{
                fill = "none";
                oppacity = "none"
            }
            // svg = (`<svg style = "position:fixed; top:0; left:0; height:100%; width:100%;"><path d = "M ${start.point},${start.point}\ `+commands+` Z\" style="stroke:${view_style["borderColor"]}; fill:${view_style["backgroundColor"]};"/></svg>`);
            // const firstHtml = '<html><head><style>html, body { margin:0; padding:0; overflow:hidden }</style></head><body>'
            // const lastHtml = '</body></html>'
            var path = <Path d = {`M ${start.point[0]},${start.point[1]} ` + commands+ ` Z`} stroke = {`${stroke}`} fill = {`${fill}`} fill-opacity = {`${oppacity}`}/>
            if(this.props.clippath){
                console.log(stroke);
                return path;
            }
            return(
                <Svg style = {[{"position":"absolute","width":view_style["width"],"top":view_style["top"],"height":view_style["height"],"left":view_style["left"],backgroundColor:"transparent"},]}>
                    {path}
                </Svg>
            );
        }
        else if(this.props.clippath){
            console.log(allpoints[this.props.id][0].cornerRadius);
            return <Rect width = "100%" height="100%" rx = {allpoints[this.props.id][0].cornerRadius}/>
        }
        return(
            <View style = {[style[this.props.id],{borderTopLeftRadius:allpoints[this.props.id][0].cornerRadius,borderTopRightRadius:allpoints[this.props.id][1].cornerRadius,borderBottomRightRadius:allpoints[this.props.id][2].cornerRadius,borderBottomLeftRadius:allpoints[this.props.id][3].cornerRadius}]}>
                
            </View>
        )
    }
}

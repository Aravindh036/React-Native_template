import React, { Component } from 'react';
import Svg, {Path,Defs,ClipPath} from 'react-native-svg';
import {View} from 'react-native';
import {Bitmap} from '../Bitmap/Bitmap';
import style from './css';
import allpoints from './points';

export class Oval extends Component{
    render(){
        if(this.props.points){
            var points = allpoints[this.props.id];
            var svg = ``;
            commands = ``;
            view_style = style[this.props.id];
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
            //set stroke color
            border = view_style["borderColor"];
            if(border != undefined){
                stroke = border.substring(0,border.length-2);
            }
            else{
                stroke = "none";
            }
            //set fill colour
            bgColour = view_style["backgroundColor"];
            if(bgColour != undefined){
                fill = bgColour.substring(0,bgColour.length-2);
                oppacity = parseInt(bgColour.substring(bgColour.length-2,bgColour.length),16)/255;
            }
            else{
                fill = "none";
                oppacity = "none"
            }
            svg = (`<svg><path d = "M ${start.point[0]},${start.point[1]}\ `+commands+` Z\" style="stroke:${stroke}; fill:${fill};"/></svg>`);
            // const firstHtml = '<html><head><style>html, body { margin:0; padding:0; overflow:hidden } svg { position:fixed; top:0; left:0; height:100%; width:100% }</style></head><body>'
            // const lastHtml = '</body></html>'
            var path = <Path d = {`M ${start.point[0]},${start.point[1]} ` + commands+ ` Z`} stroke = {`${stroke}`} fill = {`${fill}`} fill-opacity = {`${oppacity}`}/>
            if(this.props.clippath){
                return path;
            }
            return(
                    <Svg width = "100%" height = "100%" viewBox = {`0 0 ${view_style["actual_height"]} ${view_style["actual_width"]}`}>
                        {path}
                    </Svg>
            );
        }
        return(
            <View style = {style[this.props.id]}>
                
            </View>
        )
    }
}

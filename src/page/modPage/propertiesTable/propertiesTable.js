import { Component } from 'react';
import {pm_propeties} from '@/public_js/properties.js';
import pageLess from './propertiesTable.less';

export class PropertiesTable extends Component {
    constructor(props) {
    	super(props);
    }
    renderTheadTd(item){
        return(
            <td key={item.id} style={{backgroundColor:item.color}}>{item.CNname}</td>
        )
    }
    renderTbodyTd(item,contered){
        let _div
        if(contered.value == 2){
            _div = (
                <td key={`${item.id}_${contered.key}`} style={{color:"#FF3030"}}>{contered.value}</td>
            )
        }
        if(contered.value == 1){
            _div = (
                <td key={`${item.id}_${contered.key}`}>{contered.value}</td>
            )
        }
        if(contered.value == 0.5){
            _div = (
                <td key={`${item.id}_${contered.key}`} style={{color:"#00CD00"}}>{contered.value}</td>
            )
        }
        if(contered.value == 0){
            _div = (
                <td key={`${item.id}_${contered.key}`} style={{color:"#436EEE"}}>{contered.value}</td>
            )
        }
        return(
            _div
        )
    }
    renderTbody(item){
        let countered = []
        for(let i in item.countered){
            const obj = {
                key:i,
                value:item.countered[i]
            }
            countered.push(obj)
        }
        return(
            <tr key={item.id}>
                <td style={{backgroundColor:item.color}}>{item.CNname}</td>
                {countered.map((contered)=>this.renderTbodyTd(item,contered))}
            </tr>
        )
    }
    renderTable(){
        let _propeties = []
        for(let i in pm_propeties){
            if(pm_propeties[i]['id']){
                _propeties.push(pm_propeties[i])
            }
        }
        const _thead = (
            <tr>
                <td>守\攻</td>
                {_propeties.map((item)=>this.renderTheadTd(item))}
            </tr>
        ) 
        const _tbody = _propeties.map((item)=>this.renderTbody(item))
        return (
            <table>
                <thead>
                    {_thead}
                </thead>
                <tbody>
                    {_tbody}
                </tbody>
            </table>
        )
    }
    render(){
        return (
            <div className={pageLess.tableWrapper}>
               {this.renderTable()} 
            </div>
        )
    }
}
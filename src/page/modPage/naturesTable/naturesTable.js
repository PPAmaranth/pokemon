import { Component } from 'react';
import {pm_natures} from '@/public_js/natures.js';
import pageLess from './naturesTable.less';

export class NaturesTable extends Component {
    constructor(props) {
    	super(props);
    }
    renderTheadTd(item){
        return(
            <td key={item.key} style={{backgroundColor:item.color}}>{item.CNname}</td>
        )
    }
    renderColorTd(str){
        const choice = {
            "—":"fff",
            "红色":"#FF3030",
            "黄色":"#FFD700",
            "蓝色":"#B0E2FF",
            "绿色":"#9AFF9A",
            "粉红色":"#FFE1FF",
            "攻击":"#FFF68F",
            "防御":"#FF7F50",
            "特攻":"#7EC0EE",
            "特防":"#3A5FCD",
            "速度":"#DDA0DD"
        }
        if(choice[str]){
            return (<td style={{backgroundColor:choice[str]}}>{str}</td>)
        }else{
            return (<td>{str}</td>)
        }
    }
    renderTbody(item){
        return(
            <tr key={item.key}>
                {this.renderColorTd(item.CNname)}
                {this.renderColorTd(item.like)}
                {this.renderColorTd(item.unlike)}
                {this.renderColorTd(item.up)}
                {this.renderColorTd(item.down)}
            </tr>
        )
    }
    renderTable(){
        const thead = [
            {
                key:1,
                CNname:'性格'
            },
            {
                key:2,
                CNname:'要浇水的花'
            },
            {
                key:3,
                CNname:'要摘掉的花'
            },
            {
                key:4,
                CNname:'增加能力值'
            },
            {
                key:5,
                CNname:'降低能力值'
            },
        ]
        const _thead = (
            <tr>
                {thead.map((item)=>this.renderTheadTd(item))}
            </tr>
        ) 
        let natures = []
        for(let i in pm_natures){
            const obj = {
                key:i,
                ...pm_natures[i]
            }
            natures.push(obj)
        }
        const _tbody = natures.map((item)=>this.renderTbody(item))
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
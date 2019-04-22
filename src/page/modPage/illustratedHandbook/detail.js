import { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { List } from '@/component/list.js';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js';
const notfoundPng = require("@/image/system/notFound.png");

class AbilityTable extends Component{
	constructor(props){
        super(props);
        this.table=React.createRef();
    }
    componentDidMount(){
    	echart.init(this.table);
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
    }
    render(){
        return <input ref={this.table}/>
    }
}

export class Detail extends Component{
	//基本信息
	renderBasicInformation(state){
		const _illustrationBookId = (Array(3).join(0) + state.currentItem.illustrationBookId).slice(-3);
		const _properties = pm_propeties.getProperties([state.currentItem.propertyOne,state.currentItem.propertyTwo]);
		let _propertiesText = `${_properties["0"].CNname}`
		if(_properties[1]){
			_propertiesText = `${_propertiesText}、${_properties["1"].CNname}`
		}
		const _list = [
			{
				key:1,
				label:"编号",
				text:_illustrationBookId
			},
			{
				key:2,
				label:"中文",
				text:state.currentItem.name
			},
			{
				key:3,
				label:"英文",
				text:state.currentItem.enName
			},
			{
				key:4,
				label:"日文",
				text:state.currentItem.jpName
			},
			{
				key:5,
				label:"属性",
				text:_propertiesText
			}
		]
		return(
			<div className={pageLess.basicInformation}>
				<List list={_list}></List>
			</div>
		)
	}
	//能力值
	renderAbility(state){
		const _list = [
			{
				key:1,
				label:"种族值",
				text:state.currentItem.ethnicValue
			},
			{
				key:2,
				label:"HP",
				text:state.currentItem.hp
			},
			{
				key:3,
				label:"攻击",
				text:state.currentItem.attack
			},
			{
				key:4,
				label:"防御",
				text:state.currentItem.defense
			},
			{
				key:5,
				label:"特攻",
				text:state.currentItem.sAttack
			},
			{
				key:6,
				label:"特防",
				text:state.currentItem.sDefense
			},
			{
				key:7,
				label:"速度",
				text:state.currentItem.speed
			}
		]
		return(
			<div className={pageLess.ability}>
				<div className={pageLess.abilityText}>
					<List list={_list}></List>
				</div>
				<div className={pageLess.abilityTable}>
					<div>
						<AbilityTable></AbilityTable>
					</div>
				</div>
			</div>
		)
	}
	//风琴折叠页
	renderCollapseItem(state,item){
		let _contentHeight
		let _contentMaxHeight
		if(state.detailCollapeseActive == item.index){
			_contentHeight = "auto"
			_contentMaxHeight = "10000px"
		}else{
			_contentHeight = "0px"
			_contentMaxHeight = "0px"
		}
		let _content
		if(item.render){
			_content = item.render(state)
		}
		return (
			<div key={item.index} className={pageLess.collapseItem}>
				<div className={pageLess.title} onClick={()=>this.props.handleDetailCollapseChange(item)}>
					<span className={pageLess.titleText}>{item.title}</span>
				</div>
				<div style={{height:_contentHeight,maxHeight:_contentMaxHeight}} className={pageLess.contentWrapper}>
					<div className={pageLess.backgroundTop}>
					<div className={pageLess.backgroundBottom}>
						{_content}
					</div>
				</div>
				</div>
			</div>
		)
	}
	renderDetail(state){
		const _imgUrl = notfoundPng;
		const _detailCollapese ={
	      items:[
	        {
	          title:"基本信息",
	          index:1,
	          render:this.renderBasicInformation
	        },
	        {
	          title:"能力值",
	          index:2,
	          render:this.renderAbility
	        },
	        {
	          title:"属性克制",
	          index:3
	        },
	        {
	          title:"进化关系",
	          index:4
	        },
	        {
	          title:"技能学习（进化）",
	          index:5
	        },
	        {
	          title:"技能学习（技能机）",
	          index:6
	        }
	      ]
	    }
		return (
			<div className={pageLess.detail}>
				<div className={pageLess.imageWrapper}>
					<div className={pageLess.image}>
						<div style={{backgroundImage:`url(${_imgUrl})`}}></div>
					</div>
					<div className={pageLess.image}>
						<div style={{backgroundImage:`url(${_imgUrl})`}}></div>
					</div>
				</div>
				<div className={pageLess.collapseWrapper}>
					{_detailCollapese.items.map((item)=>this.renderCollapseItem(state,item,))}
				</div>
			</div>
		)
	}
	render(){
		return (
			<div>
		  		<div className={pageLess.detailWrapper}>
		        	{this.renderDetail(this.props.ModState)}
		      	</div>
		  	</div>
		)
	}
}
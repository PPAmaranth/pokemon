import { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入雷达
import  'echarts/lib/chart/radar';
import { List } from '@/component/list.js';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js';
const notfoundPng = require("@/image/system/notFound.png");

class AbilityTable extends Component{
	constructor(props){
        super(props);
    }
    componentDidMount(){
    	let _detailAbilityEchart = echarts.init(document.getElementById("detailAbilityEchart"));
        console.log(this.props)
        const option = {
		    title: {},
		    tooltip: {},
		    legend: {},
		    radar: {
		        name: {
		            textStyle: {
		                color: '#000',
		           }
		        },
		        nameGap: 0,
				radius: "75%",
		        indicator: [
		           { name: 'HP', max: 200},
		           { name: '攻击', max: 200},
		           { name: '防御', max: 200},
		           { name: '特攻', max: 200},
		           { name: '特防', max: 200},
		           { name: '速度', max: 200}
		        ]
		    },
		    series: [{
		        name: '',
		        type: 'radar',
		        data : [
		            {
		                value : [45, 49, 49, 65, 65, 45],
		            }
		        ]
		    }]
		};
        _detailAbilityEchart.setOption(option);
    }
    render(){
        return (
        	<div style={{width:"100%",height:"100%"}} id="detailAbilityEchart"></div>
        )
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
					<AbilityTable state={state}></AbilityTable>
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
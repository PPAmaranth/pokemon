import { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/pie';
import { List } from '@/component/list.js';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js';
const notfoundPng = require("@/image/system/notFound.png");

class PropertiesCounteredTable extends Component{
	constructor(props){
        super(props);
    }
    componentDidMount(){
    	//玫瑰图
    	let _propertiesCounteredEchart = echarts.init(document.getElementById("detailPropertiesCounteredEchart"));
        let _legendData = []
        let _colorData = []
        for(var i in pm_propeties){
        	if(pm_propeties[i]['CNname']){
        		_legendData.push(pm_propeties[i]['CNname'])
        		_colorData.push(pm_propeties[i]['color'])
        	}
        }
        let _counteredData = pm_propeties[this.props.state.currentItem.propertyOne]['countered'];
        if(this.props.state.currentItem.propertyTwo){
        	//双属性计算
        	let newCounteredData = {}
        	let _counteredDataTwo = pm_propeties[this.props.state.currentItem.propertyTwo]['countered'];
        	for(let i in _counteredData){
        		newCounteredData[i] = _counteredData[i] * _counteredDataTwo[i]
        	}
        	_counteredData = newCounteredData
        }
        let _echartsData = []
        for(let i in _counteredData){
        	let _obj = {
        		value:_counteredData[i],
        		name:pm_propeties[i]['CNname']
        	}
        	_echartsData.push(_obj)
        }
        const option = {
		    title : {},
		    tooltip : {
		        trigger: 'item'
		    },
		    color:_colorData,
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:_legendData
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:this.props.state.currentItem.name,
		            type:'pie',
		            radius : [0, 90],
		            center : ['50%', '30%'],
		            roseType : 'area',
		            data:_echartsData
		        }
		    ]
		};
        _propertiesCounteredEchart.setOption(option);
		window.resizeCallbacks = {
			...window.resizeCallbacks,
			_propertiesCounteredEchart:{
				..._propertiesCounteredEchart
			}
		}
    }
    render(){
        return (
        	<div style={{width:"100%",height:"100%"}} id="detailPropertiesCounteredEchart"></div>
        )
    }
}

class AbilityTable extends Component{
	constructor(props){
        super(props);
    }
    componentDidMount(){
    	//雷达图
    	let _detailAbilityEchart = echarts.init(document.getElementById("detailAbilityEchart"));
        const option = {
		    title: {},
		    tooltip: {
		    	trigger: 'item',
		    	position: 'left'
		    },
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
		           { name: 'HP', max: 255 , color: '#98FB98'},
		           { name: '攻击', max: 255 , color: '#bbb'},
		           { name: '防御', max: 255 , color: '#FF7F50'},
		           { name: '速度', max: 255 , color: '#DDA0DD'},
		           { name: '特防', max: 255 , color: '#3A5FCD'},
		           { name: '特攻', max: 255 , color: '#7EC0EE'}
		        ]
		    },
		    series: [{
		        name: this.props.state.currentItem.name,
		        type: 'radar',
		        data : [
		            {
		                value : [
			                this.props.state.currentItem.hp, 
			                this.props.state.currentItem.attack,
			                this.props.state.currentItem.defense,
			                this.props.state.currentItem.speed,
			                this.props.state.currentItem.sDefense,
			                this.props.state.currentItem.sAttack
		                ]
		            }
		        ]
		    }]
		};
        _detailAbilityEchart.setOption(option);
		window.resizeCallbacks = {
			...window.resizeCallbacks,
			_detailAbilityEchart:{
				..._detailAbilityEchart
			}
		}
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
		let _illustrationBookId 
		if(state.currentItem.illustrationBookId){
			_illustrationBookId = (Array(3).join(0) + state.currentItem.illustrationBookId).slice(-3);
		}else{
			_illustrationBookId = ""
		}
		const _properties = pm_propeties.getProperties([state.currentItem.propertyOne,state.currentItem.propertyTwo]);
		let _propertiesText = `${_properties["0"].CNname}`
		if(_properties[1]){
			_propertiesText = `${_propertiesText}、${_properties["1"].CNname}`
		}
		const _list = [
			{
				key:1,
				label:"图鉴编号",
				text:_illustrationBookId
			},
			{
				key:2,
				label:"中文名称",
				text:state.currentItem.name
			},
			{
				key:3,
				label:"英文名称",
				text:state.currentItem.enName
			},
			{
				key:4,
				label:"日文名称",
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
	//属性克制
	renderPropertiesCountered(state){
		return(
			<div className={pageLess.propertiesCountered}>
				<PropertiesCounteredTable state={state}></PropertiesCounteredTable>
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
	          index:3,
	          render:this.renderPropertiesCountered
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
	componentWillMount(){
		//多个resize事件
		window.resizeCallbacks = {}
		window.onresize=function(){
		  for(let i in window.resizeCallbacks){
		  	if(window.resizeCallbacks[i].resize){
		  		window.resizeCallbacks[i].resize()
		  	}
		  }
		}
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
import { Component } from 'react';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js'
const requireContext = require.context("@/image/illustratedHandbook",true, /^\.\/.*\.png$/);
const notfoundPng = require("@/image/system/notfound.png");
const projectImgs = requireContext.keys().map(requireContext);

export class List extends Component{
	constructor(props) {
    	super(props);
	}
	//获取图片url
	getImgUrl(baseUrl){
		for(const _url of projectImgs){
			if(_url.indexOf(baseUrl) > 0){
                return _url
            }
		}
	}
	//获取属性
	getProperties(propertiesId){
		let arr = []
		for(const id of propertiesId){
			arr.push(pm_propeties[id])
		}
		return arr
	}
	renderPropertiesDiv(_properties){
		if(_properties.length>1){
			const propertiesDiv = (
				<div style={{background:`linear-gradient(${_properties[0].color},${_properties[1].color})`}}>
					{_properties.map((_properties)=>{
						return (
							<div 
								className={pageLess.propertie} 
								key={_properties.id} 
								style={{backgroundColor:`${_properties.color}`}}
							>
								<span>{_properties.CNname}</span>
							</div>
						)
					})}
				</div>
			)
			return propertiesDiv
		}else{
			const propertiesDiv = (
				<div style={{background:_properties[0].color}}>
					{_properties.map((_properties)=>{
						return (
							<div 
								className={pageLess.propertie} 
								key={_properties.id} 
								style={{backgroundColor:`${_properties.color}`}}
							>
								<span>{_properties.CNname}</span>
							</div>
						)
					})}
				</div>
			)
			return propertiesDiv
		}
	}
	renderListItem(item){
		let _imgUrl;
		if(item.imgUrl){
			_imgUrl	= this.getImgUrl(item.imgUrl);
		}else{
			_imgUrl	= notfoundPng;
		}
		const _illustrationBookId = (Array(3).join(0) + item.illustrationBookId).slice(-3);
		const _properties = this.getProperties([item.propertyOne,item.propertyTwo]);
		const propertiesDiv = this.renderPropertiesDiv(_properties)
		const speciesStrengthBg = {
			HP:"#98FB98",
			Attack:"#FFF68F",
			Defense:"#FF7F50",
			Speed:"#DDA0DD",
			SpecialAttack:"#7EC0EE",
			SpecialDefense:"#3A5FCD",
			Total:"#FFF8DC",
		}
		return (
			<div key={item.id} className={pageLess.listItem} onClick={()=>this.props.listClick(item)}>
				<div>
					<div className={pageLess.number}><span>{_illustrationBookId}</span></div>
					<div className={pageLess.image}>
						<div style={{backgroundImage:`url(${_imgUrl})`}}></div>
					</div>
					<div className={pageLess.name}><span>{item.CNname}</span></div>
				</div>
					{propertiesDiv}
				<div>
					<div>
						<div style={{backgroundColor:speciesStrengthBg.HP}}><div><div>HP</div><div>{item.hp}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.Attack}}><div><div>攻击</div><div>{item.attack}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.Defense}}><div><div>防御</div><div>{item.defense}</div></div></div>
					</div>
					<div>
						<div style={{backgroundColor:speciesStrengthBg.Speed}}><div><div>速度</div><div>{item.speed}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.SpecialAttack}}><div><div>特攻</div><div>{item.sAttack}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.SpecialDefense}}><div><div>特防</div><div>{item.sDefense}</div></div></div>
					</div>
					<div><div style={{backgroundColor:speciesStrengthBg.Total}}><div>总和</div><div>{item.ethnicValue}</div></div></div>
				</div>
			</div>
		)
	}

	render(){
		return (
		  	<div>
		  		<div className={pageLess.listWrapper}>
		        	{this.props.listItems.map((item) => this.renderListItem(item))}
		      	</div>
		  	</div>
		)
	}	
}
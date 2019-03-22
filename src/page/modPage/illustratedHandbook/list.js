import { Component } from 'react';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js'
const requireContext = require.context("@/image/illustratedHandbook",true, /^\.\/.*\.png$/);
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
		const _imgUrl = this.getImgUrl(item.imgUrl);
		const _properties = this.getProperties(item.properties);
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
			<div key={item.number} className={pageLess.listItem} onClick={()=>this.props.listClick(item)}>
				<div>
					<div className={pageLess.number}><span>{item.number}</span></div>
					<div className={pageLess.image}>
						<div style={{backgroundImage:`url(${_imgUrl})`}}></div>
					</div>
					<div className={pageLess.name}><span>{item.CNname}</span></div>
				</div>
					{propertiesDiv}
				<div>
					<div>
						<div style={{backgroundColor:speciesStrengthBg.HP}}><div><div>HP</div><div>{item.speciesStrength.HP}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.Attack}}><div><div>攻击</div><div>{item.speciesStrength.Attack}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.Defense}}><div><div>防御</div><div>{item.speciesStrength.Defense}</div></div></div>
					</div>
					<div>
						<div style={{backgroundColor:speciesStrengthBg.Speed}}><div><div>速度</div><div>{item.speciesStrength.Speed}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.SpecialAttack}}><div><div>特攻</div><div>{item.speciesStrength.SpecialAttack}</div></div></div>
						<div style={{backgroundColor:speciesStrengthBg.SpecialDefense}}><div><div>特防</div><div>{item.speciesStrength.SpecialDefense}</div></div></div>
					</div>
					<div><div style={{backgroundColor:speciesStrengthBg.Total}}><div>总和</div><div>{item.speciesStrength.Total}</div></div></div>
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
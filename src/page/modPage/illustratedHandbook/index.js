import { Component } from 'react';
import pageLess from './index.less';
import {pm_propeties} from '@/public_js/properties.js'
const requireContext = require.context("@/image/illustratedHandbook",true, /^\.\/.*\.png$/);
const projectImgs = requireContext.keys().map(requireContext);

export default class IllustratedHandbook extends Component{
	constructor() {
    	super();
	    this.state = {
	      
	    }
	    this.listItems = [
	    	{
	    		number:"001",
	    		properties:[4,14],
	    		CNname:"妙蛙种子",
	    		speciesStrength:{
	    			HP:45,
	    			Attack:49,
	    			Defense:49,
	    			SpecialAttack:65,
	    			SpecialDefense:65,
	    			Speed:45,
	    			Total:318
	    		},
	    		imgUrl:"001Bulbasaur"
	    	},
	    	{
	    		number:"002",
	    		properties:[4,14],
	    		CNname:"妙蛙草",
	    		speciesStrength:{
	    			HP:60,
	    			Attack:62,
	    			Defense:63,
	    			SpecialAttack:80,
	    			SpecialDefense:80,
	    			Speed:60,
	    			Total:405
	    		},
	    		imgUrl:"002Ivysaur"
	    	}
	    ]
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
	renderListItem(item){
		const _imgUrl = this.getImgUrl(item.imgUrl);
		const _properties = this.getProperties(item.properties);
		const propertiesDiv = (
			_properties.map((_properties)=>{
				return (
					<div 
						className={pageLess.propertie} 
						key={_properties.id} 
						style={{backgroundColor:`${_properties.color}`}}
					>
						<div>{_properties.CNname}</div>
					</div>
				)
			})
		)
		return (
			<div key={item.number} className={pageLess.listItem}>
				<div>
					<div className={pageLess.number}><span>{item.number}</span></div>
					<div className={pageLess.image}>
						<div style={{backgroundImage:`url(${_imgUrl})`}}></div>
					</div>
					<div className={pageLess.name}><span>{item.CNname}</span></div>
				</div>
				<div>
					{propertiesDiv}
				</div>
				<div>
					<div>
						<div style={{backgroundColor:"#98FB98"}}><div><div>HP</div><div>{item.speciesStrength.HP}</div></div></div>
						<div style={{backgroundColor:"#FFF68F"}}><div><div>攻击</div><div>{item.speciesStrength.Attack}</div></div></div>
						<div style={{backgroundColor:"#FF7F50"}}><div><div>防御</div><div>{item.speciesStrength.Defense}</div></div></div>
					</div>
					<div>
						<div style={{backgroundColor:"#DDA0DD"}}><div><div>速度</div><div>{item.speciesStrength.Speed}</div></div></div>
						<div style={{backgroundColor:"#7EC0EE"}}><div><div>特攻</div><div>{item.speciesStrength.SpecialAttack}</div></div></div>
						<div style={{backgroundColor:"#3A5FCD"}}><div><div>特防</div><div>{item.speciesStrength.SpecialDefense}</div></div></div>
					</div>
					<div><div style={{backgroundColor:"#FFF8DC"}}><div>总和</div><div>{item.speciesStrength.Total}</div></div></div>
				</div>
			</div>
		)
	}
	render(){
		const list = (
	      <div className={pageLess.listWrapper}>
	        {this.listItems.map((item) => this.renderListItem(item))}
	      </div>
	    )
		return (
		  	<div>
		  		{list}
		  	</div>
		)
	}
	
}
import { Component } from 'react';
import pageLess from './index.less';
const notfoundPng = require("@/image/system/notFound.png");

export class Detail extends Component{
	renderBasicInformation(){
		return(
			<div className={pageLess.basicInformation}>
				<div>123					
				</div>
			</div>
		)
	}
	//风琴折叠页
	renderCollapseItem(active,item){
		let _contentHeight
		let _contentMaxHeight
		if(active == item.index){
			_contentHeight = "auto"
			_contentMaxHeight = "1000px"
		}else{
			_contentHeight = "0px"
			_contentMaxHeight = "0px"
		}
		let _content
		if(item.render){
			_content = item.render()
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
	          index:2
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
					{_detailCollapese.items.map((item)=>this.renderCollapseItem(state.detailCollapeseActive,item))}
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
import { Component } from 'react';
import { Spin, Icon } from 'antd';
import pageLess from './index.less';
import { connect } from 'dva';
import { Detail } from './detail.js'
import { List }from './list.js'
import { TopTab } from './topTab.js'

const namespace = 'illustratedHandbook';

const mapStateToProps = (state) => {
  const illustratedHandbook = state[namespace];
  return {
    illustratedHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: (state) => {
      dispatch({
        type: `${namespace}/queryAll`,
        payload:state
      });
    },
    handleGetList:(state) =>{
			if(state.loading){
				return
			}
    	if(state.endRow>151){
    		return
    	}
    	const _pageNum = state.pageNum + 1
    	const _state = {
    		...state,
    		pageNum:_pageNum
    	}
    	dispatch({
	        type: `${namespace}/queryAll`,
	        payload:_state
	      });
    },
    handleListClick: (item,scrollY) => {
    	clearEvent()
    	const action = {
	        type: `${namespace}/handleListClick`,
	        scrollY: scrollY,
	        item:item
      };
      dispatch(action);
    },
    handleDetailClick: (state) => {
    	clearEvent()
    	const action = {
	        type: `${namespace}/handleDetailClick`,
      };
      dispatch(action);
    },
    handleDetailCollapseChange: (item) => {
    	const action = {
	        type: `${namespace}/handleDetailCollapseChange`,
	        payload: item,
      };
      dispatch(action);
    },
  };
};

const clearEvent = () =>{
	window.onscroll = null
	window.onresize = null
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component{
	componentDidMount() {
		if(this.props.illustratedHandbook.listItems.length == 0){
			this.props.onDidMount(this.props.illustratedHandbook)
		}
	  }
	render(){
		let page;
		if(this.props.illustratedHandbook.activePage == "list"){
			page = (
				<List 
					modState={this.props.illustratedHandbook}
					listClick = {(item)=>this.props.handleListClick(item)}
					handleGetList = {()=>this.props.handleGetList(this.props.illustratedHandbook)}
				></List>
			)
		}
		if(this.props.illustratedHandbook.activePage == "detail"){
			page = (
				<Detail
					ModState={this.props.illustratedHandbook}
					handleDetailCollapseChange = {(item)=>this.props.handleDetailCollapseChange(item)}
				></Detail>
			)
		}
		const loadingIcon = <Icon type="loading"  style={{ fontSize: 36,color:"#4169E1" }} spin />;

		return (
			<Spin 
				type="loading" 
				style={{
					position:"fixed",
					top:"50%",
					transform:"translateY(-50%)"
				}}
				indicator={loadingIcon} 
				spinning={this.props.illustratedHandbook.loading} 
				delay={500}
			>
			  	<div className={pageLess.indexWrapper}>
			  		<TopTab 
			  			state={this.props.illustratedHandbook}
			  			DetailClick = {()=>this.props.handleDetailClick(this.props.illustratedHandbook)}>
			  		</TopTab>
			  		{page}
			  	</div>
			</Spin>
		)
	}	
}
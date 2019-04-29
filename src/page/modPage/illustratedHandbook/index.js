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
			//加载中则不分发请求
			if(state.loading){
				return
			}
			//lgpe版本截至到超梦151
    	if(state.endRow>151){
    		return
			}
			//增加页数
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
    handleListClick: (item) => {
			dispatch({
					type: `${namespace}/handleListClick`,
					item:item
			});
			dispatch({
					type: `${namespace}/saveScrollY`,
			});
    },
    handleDetailClick: (state) => {
      dispatch({
					type: `${namespace}/handleDetailClick`,
			});
    },
    handleDetailCollapseChange: (item) => {
      dispatch({
					type: `${namespace}/handleDetailCollapseChange`,
					payload: item,
			});
		},
		handleModuleChangeBack: (mainProps) => {
      dispatch({
					type: `${namespace}/handleModuleChangeBack`,
					mainProps: mainProps,
			});
		}
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export class IllustratedHandbookIndex extends React.Component{
	constructor(props) {
    super(props);
  }
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
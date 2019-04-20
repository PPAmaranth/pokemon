import { Component } from 'react';
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
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      });
    },
    handleListClick: (item) => {
    	const action = {
	        type: `${namespace}/handleListClick`,
	        payload: item,
      };
      dispatch(action);
    },
    handleDetailClick: () => {
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

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component{
	componentDidMount() {
	    this.props.onDidMount()
	  }
	render(){
		let page;
		if(this.props.illustratedHandbook.activePage == "list"){
			page = (
				<List 
					modState={this.props.illustratedHandbook}
					listClick = {(item)=>this.props.handleListClick(item)}
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
		return (
		  	<div className={pageLess.indexWrapper}>
		  		<TopTab 
		  			state={this.props.illustratedHandbook}
		  			DetailClick = {()=>this.props.handleDetailClick()}>
		  		</TopTab>
		  		{page}
		  	</div>
		)
	}	
}
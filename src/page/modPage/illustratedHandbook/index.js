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
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class Index extends Component{
	componentWillMount(){
		this.setState(this.props[namespace])
	}
	componentDidMount() {
	    this.props.onDidMount();
	  }
	handleListClick(item){
		this.setState({activePage:"detail",currentItem:item})
	}
	handleDetailClick(){
		this.setState({activePage:"list"})
	}
	render(){
		let page;
		if(this.state.activePage == "list"){
			page = (
				<List 
					listItems={this.state.listItems}
					listClick = {(item)=>this.handleListClick(item)}
				></List>
			)
		}
		if(this.state.activePage == "detail"){
			page = (
				<Detail></Detail>
			)
		}
		return (
		  	<div className={pageLess.indexWrapper}>
		  		<TopTab 
		  			state={this.state}
		  			DetailClick = {()=>this.handleDetailClick()}>
		  		</TopTab>
		  		{page}
		  	</div>
		)
	}	
}
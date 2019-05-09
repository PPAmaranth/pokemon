import { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import pageLess from './index.less';
import { PropertiesTable } from '@/page/modPage/propertiesTable/propertiesTable.js'

const namespace = 'discovery';

const mapStateToProps = (state) => {
  const discovery = state[namespace];
  return {
    discovery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    handleListClick: (item) => {
      if(!item.page){
        return
      }
			dispatch({
					type: `${namespace}/handleListClick`,
					page:item.page,
					animationLeave:'perspectiveLeft',
					animationIn:'slideRightReturn',
			});
    },
    handleDetailClick: () => {
      dispatch({
					type: `${namespace}/handleDetailClick`,
					animationLeave:'slideRight',
					animationIn:'perspectiveLeftReturn',
			});
    },
  }
}

class ChildPageTop extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className={pageLess.topTab}>
					<div className={pageLess.returnBtn} onClick={()=>this.props.DetailClick()}>
						<Icon type="left"/>
					</div>
					<div>{this.props.item.title}</div>
				</div>
    )
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class DiscoveryIndex extends React.Component{
  constructor(props) {
    super(props);
  }
  renderNavIcon(item){
    return (
      <div 
        key={item.key} 
        className={pageLess.navIconWrapper} 
        style={{backgroundColor:item.color}}
        onClick={()=>this.props.handleListClick(item)}
      >
        <div className={pageLess.IconWrapper}>
          <div className={pageLess.icon}>
            <Icon type={item.icon} style={{width:'100%',}}/>
          </div>
          <div className={pageLess.text}>
            {item.title}
          </div>
        </div>
      </div>
    )
  }
  render(){
    const data = [
      {
        title: '招式列表',
        key:'1',
        icon:'bars',
        color:'#1bbc9b'
      },
      {
        title: '属性克制表',
        key:'2',
        icon:'table',
        page:'propertiesTable',
        color:'#3598db'
      },
      {
        title: '性格大全',
        key:'3',
        icon:'solution',
        color:'#e84c3d'
      },
      {
        title: '战斗计算器',
        key:'4',
        icon:'form',
        color:'#bec3c7'
      },
      {
        title: '队伍编辑',
        key:'5',
        icon:'hdd',
        color:'#f1c40f'
      },
      {
        title: '状态与效果',
        key:'6',
        icon:'layout',
        color:'#58d68d'
      },
      {
        title: '资讯攻略',
        key:'7',
        icon:'read',
        color:'#e67f22'
      },
      {
        title: '关于本应用',
        key:'8',
        icon:'team',
        color:'#9a59b5'
      }
    ]
    let page;
    if(this.props.discovery.activePage == "index"){
      page = (<div className={pageLess.navWrapper}>
        {data.map((item) => this.renderNavIcon(item))}
      </div>)
    }
    if(this.props.discovery.activePage == "propertiesTable"){
      page = (
        <div className={pageLess.indexWrapper}>
          <ChildPageTop
            item={data[1]}
            DetailClick={()=>this.props.handleDetailClick()}
          ></ChildPageTop>
          <PropertiesTable></PropertiesTable>
        </div>
      )
    }
    return (
      page
    )
  }
};
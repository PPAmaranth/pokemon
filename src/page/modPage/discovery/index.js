import { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import pageLess from './index.less';

const namespace = 'discovery';

const mapStateToProps = (state) => {
  const discovery = state[namespace];
  return {
    discovery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{}
}

@connect(mapStateToProps, mapDispatchToProps)
export class DiscoveryIndex extends React.Component{
  constructor(props) {
    super(props);
  }
  renderNavIcon(item){
    return (
      <div key={item.key} className={pageLess.navIconWrapper} style={{backgroundColor:item.color}}>
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
        title: '关于本站',
        key:'8',
        icon:'team',
        color:'#9a59b5'
      }
    ]
    return (
      <div className={pageLess.navWrapper}>
        {data.map((item) => this.renderNavIcon(item))}
      </div>
    )
  }
};
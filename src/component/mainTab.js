import { Icon } from 'antd';
import mainLess from '@/style/main.less'
import Link from 'umi/link';
//main主页面底部tab
export class MainTab extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
      {
        id:1,
        iconType:"profile",
        theme:"twoTone",
        twoToneColor:"#2F4F4F",
        activeColor:"#4169E1",
        text:"图鉴"
      },
      {
        id:2,
        iconType:"appstore",
        theme:"twoTone",
        twoToneColor:"#2F4F4F",
        activeColor:"#4169E1",
        text:"发现"
      }
    ]
  }
  //Tabli渲染 active激活id
  renderTabLi(prop,activeId) {
    if(prop.id == activeId){
      return(
        <div key={prop.id} className={mainLess.tabLi}>
          <div  onClick={() => this.props.handleMainTabChange(prop.id)}>
            <Icon type={prop.iconType} theme={prop.theme} twoToneColor={prop.activeColor}/>
            <div className={mainLess.tabLiText} style={{color:prop.activeColor}}>{prop.text}</div>
          </div>
        </div>
      );
    }else{
      return(
        <div key={prop.id} className={mainLess.tabLi}>
          <div onClick={() => this.props.handleMainTabChange(prop.id)}>
            <Icon type={prop.iconType} theme={prop.theme} twoToneColor={prop.twoToneColor}/>
            <div className={mainLess.tabLiText} style={{color:prop.twoToneColor}}>{prop.text}</div>
          </div>
        </div>
      );
    }
  }
  render(){
    const TabBtn = (
      <div className={mainLess.tabUl}>
        {
          this.items.map((item) => this.renderTabLi(item,this.props.activeId))
        }
      </div>
    )
  	return(
  		<div className={mainLess.mainTab}>
        {TabBtn}
      </div>
  	);
  }
}
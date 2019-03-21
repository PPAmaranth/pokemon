import { Icon } from 'antd';
import mainLess from '@/style/main.less'
import Link from 'umi/link';
//main主页面底部tab
export class MainTab extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId:null
    };
    this.items = [
      {
        id:1,
        iconType:"profile",
        theme:"twoTone",
        twoToneColor:"#2F4F4F",
        activeColor:"#4169E1",
        linkUrl:"/illustratedHandbook",
        text:"图鉴"
      },
      {
        id:2,
        iconType:"appstore",
        theme:"twoTone",
        twoToneColor:"#2F4F4F",
        activeColor:"#4169E1",
        linkUrl:"/discovery",
        text:"发现"
      }
    ]
  }
  componentWillMount(){
  	this.setState({
      activeId:this.props.activeId
    })
  }
  //点击事件
  tabLiClick(item){
    this.setState({
      activeId:item.id
    })
  }
  //Tabli渲染 active激活id
  renderTabLi(prop,activeId) {
    if(prop.id == activeId){
      return(
        <div key={prop.id} className={mainLess.tabLi} onClick={() => this.tabLiClick(prop)}>
          <Link to={prop.linkUrl}>
            <Icon type={prop.iconType} theme={prop.theme} twoToneColor={prop.activeColor}/>
            <div className={mainLess.tabLiText} style={{color:prop.activeColor}}>{prop.text}</div>
          </Link>
        </div>
      );
    }else{
      return(
        <div key={prop.id} className={mainLess.tabLi}>
          <Link to={prop.linkUrl} onClick={() => this.tabLiClick(prop)}>
            <Icon type={prop.iconType} theme={prop.theme} twoToneColor={prop.twoToneColor}/>
            <div className={mainLess.tabLiText} style={{color:prop.twoToneColor}}>{prop.text}</div>
          </Link>
        </div>
      );
    }
    
  }
  render(){
    const TabBtn = (
      <div className={mainLess.tabUl}>
        {
          this.items.map((item) => this.renderTabLi(item,this.state.activeId))
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
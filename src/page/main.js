import { Component } from 'react';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { MainTab } from '../component/mainTab.js'
import mainLess from '../style/main.less'
const {
  Header, Footer, Sider, Content,
} = Layout;

export default class MainPage extends Component{
  constructor() {
    super();
    this.state = {
      activePageId:1
    };
  }
  componentWillMount(){
    //修改title
    document.title = "宝可梦"
    //根据url判断激活tab
    let routerMap = {
      "/":1,
      "/illustratedHandbook":1,
      "/discovery":2
    }
    if(this.props.location.pathname){
      this.setState({
        activePageId:routerMap[this.props.location.pathname]
      })
    }
  }
  render() {
    const activeId = this.state.activePageId
    return (
	  	<Layout className={mainLess.wrapper}>
    		<Content className={mainLess.content}>
          <div className={mainLess.contentPage}>
              {this.props.children}
          </div>
    			<MainTab
            activeId={activeId}
          >
          </MainTab>
    		</Content>
	    </Layout>
  	);
  }
}
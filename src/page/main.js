import "antd/dist/antd.css";
import { Layout,Tabs } from 'antd';
import mainLess from '../style/main.less'
const {
  Header, Footer, Sider, Content,
} = Layout;

class MainTab extends React.Component {
  state = {
    tabPosition: 'bottom',
  }
  render(){
  	const TabPane = Tabs.TabPane;
  	return(
  		<Tabs tabPosition={this.state.tabPosition} className={mainLess.mainTab}>
          <TabPane className={mainLess.test3} tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
  	);
  }
}


export default () => {
  console.log(mainLess)
  return (
	  	<Layout style={{height:"100vh","width":"100vw"}}>
    		<Content className={mainLess.content}>
    			<MainTab id="test3"></MainTab>
    		</Content>
	    </Layout>
  	);
}
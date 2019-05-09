import { Component } from 'react';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { MainTab } from '@/component/mainTab.js'
import mainLess from '@/style/main.less'
import { connect } from 'dva';
import { IllustratedHandbookIndex } from '@/page/modPage/illustratedHandbook/index.js'
import { DiscoveryIndex } from '@/page/modPage/discovery/index.js'
const {
  Header, Footer, Sider, Content,
} = Layout;
const namespace = 'main';

const mapStateToProps = (state) => {
  const main = state[namespace];
  return {
    main,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMainTabChange: (nowActivePageId,activePageId) => {
      if(nowActivePageId == activePageId){
        //当前页面点击
        return
      }
      dispatch({
          type: `${namespace}/handleMainTabChange`,
          activePageId: activePageId,
          nowActivePageId:nowActivePageId
      })
      //从1跳出去时 分发illustratedHandbook/saveScrollY 记录scroll 并重置滚动高度
      if(nowActivePageId == 1){
        dispatch({
          type: 'illustratedHandbook/saveScrollY',
        });
        document.documentElement.scrollTop = 0
      }
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MainPage extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    //修改title
    document.title = "宝可梦"
  }
  render() {
    const activeId = this.props.main.activePageId
    const contentPage = {
      "1":function(props){
        return (<IllustratedHandbookIndex main={props} ></IllustratedHandbookIndex>)
      },
      "2":function(props){
        return (<DiscoveryIndex main={props} ></DiscoveryIndex>)
      }
    }
    return (
	  	<Layout className={mainLess.wrapper}>
    		<Content className={mainLess.content}>
          <div className={`${mainLess.contentPage} ${this.props.main.contentPageAnimation}`}>
              {contentPage[activeId](this.props)}
          </div>
    			<MainTab
            activeId={activeId}
            handleMainTabChange={(activePageId)=>this.props.handleMainTabChange(this.props.main.activePageId,activePageId)}
          >
          </MainTab>
    		</Content>
	    </Layout>
  	);
  }
}
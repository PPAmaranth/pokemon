import { Row,Col,Layout } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;



export default () => {
  return (
	  	<Layout style={{height:"100vh","width":"100vw"}}>
    		<Content>main content</Content>
	      <Footer>
	      	<Row gutter={24}>
			  <Col span={6} >1</Col>
			  <Col span={6} >2</Col>
			  <Col span={6} >3</Col>
			  <Col span={6} >4</Col>
			</Row>
	      </Footer>
	    </Layout>
  	);
}
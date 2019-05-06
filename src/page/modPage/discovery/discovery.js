import { Component } from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'dva';

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
export class Discovery extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return <h1>发现</h1>
  }
};
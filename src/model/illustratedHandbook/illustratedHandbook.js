import request from '@/util/request';

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'illustratedHandbook',
  state:{
    activePage:"list",
    currentItem:{},
    pageNum:0,
    pageSize:20,
    detailCollapeseActive:1,
    loading:false,
    listItems:[]
  },
  effects: {
    *queryAll(_, sagaEffects) {
      const { call, put } = sagaEffects;
      yield put({ type: 'showLoading'});
      const endPointURI = 'http://localhost:8010/pokemon/queryAll';
      const method = 'POST';
      const data = {pageNum:_.payload.pageNum,pageSize:_.payload.pageSize}
      const _newlist = yield call(request, endPointURI, method , data);
      yield put({ type: 'updateList', payload: _newlist });
      yield put({ type: 'closeLoading'});
    },
    *handleListClick(_, sagaEffects){
      const { call, put } = sagaEffects;
      yield put({ type: 'saveScrollY'});
      yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationLeave});
      yield call(delay, 500);
      yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationIn});
      yield put({ type: 'toDetail', item: _.item });
    },
    *handleDetailClick(_, sagaEffects){
      const { call, put } = sagaEffects;
      yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationLeave});
      yield call(delay, 500);
      yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationIn});
      yield put({ type: 'toList',});
    }
  },
  reducers: {
    //更新list
    updateList(state, { payload: newList }) {
      if(newList.result.list.pageNum == state.pageNum){
        return
      }
      let _listItems
      //lgpe获取前151
      if(newList.result.endRow<151){
        _listItems = state.listItems.concat(newList.result.list)
      }else{
        let _list = []
        for(let i in newList.result.list){
          if(newList.result.list[i].id<=151){
            _list.push(newList.result.list[i])
          }
        }
        _listItems = state.listItems.concat(_list)
      }
      const newState = {
        ...state,
        listItems:[...new Set(_listItems)],
        pageNum:state.pageNum+1,
        endRow:newList.result.endRow
      }
      return newState
    },
    //显示加载
    showLoading(state){
      const newState = {
        ...state,
        loading:true,
      }
      return newState
    },
    //关闭加载
    closeLoading(state){
      const newState = {
        ...state,
        loading:false,
      }
      return newState
    },
    //跳转到detail
    toDetail(state, { item:item }){
      const newState = {
        ...state,
        currentItem:item,
        activePage:"detail"
      }
      return newState
    },
    //跳转到detaillist
    toList(state){
      const newState = {
        ...state,
        activePage:"list",
      }
      return newState
    },
    //处理当前折叠页index
    handleDetailCollapseChange(state, { payload: item }){
      const newState = {
        ...state,
        detailCollapeseActive:item.index
      }
      return newState
    },
    saveScrollY(state){
      const newState = {
        ...state,
        scrollY:window.scrollY
      }
      return newState
    }
  }
};
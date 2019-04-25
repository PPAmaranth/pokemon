import request from '../util/request';

export default {
  namespace: 'illustratedHandbook',
  state:{
    activePage:"list",
    currentItem:{},
    pageNum:0,
    pageSize:20,
    detailCollapeseActive:1,
    listItems:[
        // {
        //   id:1,
        //   illustrationBookId:1,
        //   propertyOne:12,
        //   propertyTwo:4,
        //   CNname:"妙蛙种子",
        //   attack: 49,
        //   defense: 49,
        //   ethnicValue: 318,
        //   hp: 45,
        //   sAttack: 65,
        //   sDefense: 65,
        //   speed: 45,
        //   // imgUrl:"001Bulbasaur"
        // },
        // {
        //   number:"002",
        //   properties:[4,14],
        //   CNname:"妙蛙草",
        //   propertyOne:4,
        //   propertyTwo:14,
        //   speciesStrength:{
        //     HP:60,
        //     Attack:62,
        //     Defense:63,
        //     SpecialAttack:80,
        //     SpecialDefense:80,
        //     Speed:60,
        //     Total:405
        //   },
        //   imgUrl:"002Ivysaur"
        // }
      ]
  },
  effects: {
    *queryAll(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = 'http://localhost:8010/pokemon/queryAll';
      const method = 'POST';
      const data = {pageNum:_.payload.pageNum,pageSize:_.payload.pageSize}
      const puzzle = yield call(request, endPointURI, method , data);
      yield put({ type: 'updateList', payload: puzzle });
    }
  },
  reducers: {
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
        listItems:_listItems,
        pageNum:state.pageNum+1,
        endRow:newList.result.endRow
      }
      return newState
    },
    handleListClick(state, { item:item }){
      const newState = {
        ...state,
        currentItem:item,
        activePage:"detail",
        scrollY:window.scrollY
      }
      return newState
    },
    handleDetailClick(state){
      const newState = {
        ...state,
        activePage:"list",
      }
      return newState
    },
    handleDetailCollapseChange(state, { payload: item }){
      const newState = {
        ...state,
        detailCollapeseActive:item.index
      }
      return newState
    }
  }
};
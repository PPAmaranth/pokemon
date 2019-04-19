import request from '../util/request';

export default {
  namespace: 'illustratedHandbook',
  state:{
    activePage:"list",
    currentItem:{},
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
    *queryInitCards(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = 'http://localhost:8010/pokemon/queryAll';
      const method = 'POST';
      const data = {id:1}
      const puzzle = yield call(request, endPointURI, method , data);
      yield put({ type: 'updateList', payload: puzzle });
    }
  },
  reducers: {
    updateList(state, { payload: newList }) {
      const newState = {
        ...state,
        listItems:newList.result.list
      }
      return newState
    },
    handleListClick(state, { payload: item }){
      const newState = {
        ...state,
        currentItem:item,
        activePage:"detail"
      }
      return newState
    },
    handleDetailClick(state){
      const newState = {
        ...state,
        activePage:"list",
      }
      return newState
    }
  }
};
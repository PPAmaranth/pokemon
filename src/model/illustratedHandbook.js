import request from '../util/request';

export default {
  namespace: 'illustratedHandbook',
  state:{
    activePage:"list",
    currentItem:{},
    listItems:[
        {
          number:"001",
          properties:[4,14],
          CNname:"妙蛙种子",
          speciesStrength:{
            HP:45,
            Attack:49,
            Defense:49,
            SpecialAttack:65,
            SpecialDefense:65,
            Speed:45,
            Total:318
          },
          imgUrl:"001Bulbasaur"
        },
        {
          number:"002",
          properties:[4,14],
          CNname:"妙蛙草",
          speciesStrength:{
            HP:60,
            Attack:62,
            Defense:63,
            SpecialAttack:80,
            SpecialDefense:80,
            Speed:60,
            Total:405
          },
          imgUrl:"002Ivysaur"
        }
      ]
  },
  effects: {
    *queryInitCards(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = 'http://localhost:8010/book/getBookById';
      const method = 'POST';
      const data = {id:1}
      const puzzle = yield call(request, endPointURI, method , data);
      yield put({ type: 'addNewCard', payload: puzzle });
    }
  },
  reducers: {
    addNewCard(state, { payload: newCard }) {
      return {
        book:newCard
      }
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    }
  }
};
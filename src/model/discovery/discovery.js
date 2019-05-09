import request from '@/util/request';
import { delay } from '@/public_js/public_function.js'

export default {
    namespace: 'discovery',
    state:{
        activePage:'index'
    },
    effects: {
    //处理list点击事件 保存scrollY滚动条状态 切换动画
    *handleListClick(_, sagaEffects){
        const { call, put } = sagaEffects;
        yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationLeave});
        yield call(delay, 500);
        yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationIn});
        yield put({ type: 'toChildPage', page: _.page });
      },
    //处理detail返回点击事件
    *handleDetailClick(_, sagaEffects){
        const { call, put } = sagaEffects;
        yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationLeave});
        yield call(delay, 500);
        yield put({ type: 'main/contentPageAnimationChange', animationName: _.animationIn});
        yield put({ type: 'toIndex'});
      }
    },
    reducers: {
        //跳转到detail
        toChildPage(state, { page:page }){
            const newState = {
            ...state,
            activePage:page
            }
            return newState
        },
        //跳转到index
        toIndex(state){
            const newState = {
            ...state,
            activePage:"index",
            }
            return newState
        },
    }
}
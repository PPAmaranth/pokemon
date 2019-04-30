import request from '@/util/request';
import animationLess from '@/style/animation.less';

export default {
    namespace: 'main',
    state:{
        activePageId:1,
        contentPageAnimation:animationLess['perspectiveUpReturn']
    },
    effects: {
        *handleMainTabChange(_, sagaEffects) {
          const { call, put } = sagaEffects;
          yield put({ type: 'moduleLeaveEvent', activePageId: _.activePageId });
          yield put({ type: 'moduleGoInEvent', activePageId: _.activePageId });
          yield put({ type: 'activeChange', activePageId: _.activePageId });
        }
      },
    reducers: {
        //处理激活id的改变
        activeChange(state, { activePageId:activePageId }){
            const newState = {
                ...state,
                activePageId:activePageId,
            }
            return newState
        },
        //contentPage动画改变处理
        contentPageAnimationChange(state, {animationName:animationName}){
            const newState = {
                ...state,
                contentPageAnimation:animationLess[animationName],
            }
            return newState
        },
        //模块离开时处理
        moduleLeaveEvent(state, {activePageId:activePageId}){
            const _module = {
                "1":function(state){ 
                    const newState = {
                        ...state,
                    }
                    return newState
                }
            }
            if(_module[state.activePageId]){
                return _module[state.activePageId](state)
            }else{
                return state
            }
        },
        //进入模块时处理
        moduleGoInEvent(state, {activePageId:activePageId}){
            const _module = {
                "1":function(state){
                    const newState = {
                        ...state,
                    }
                    return newState
                }
            }
            if(_module[activePageId]){
                return _module[activePageId](state)
            }else{
                return state
            }
        },
    }
}
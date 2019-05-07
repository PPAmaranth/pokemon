import request from '@/util/request';
import animationLess from '@/style/animation.less';
import { delay } from '@/public_js/public_function.js'

export default {
    namespace: 'main',
    state:{
        activePageId:1,
        contentPageAnimation:animationLess['perspectiveUpReturn']
    },
    effects: {
        *handleMainTabChange(_, sagaEffects) {
            const { call, put } = sagaEffects;
            if(_.nowActivePageId<_.activePageId){
                //从左往右
                yield put({ type: 'contentPageAnimationChange', animationName: "slideLeft"});
                yield call(delay, 500);
                yield put({ type: 'contentPageAnimationChange', animationName: "slideRightReturn"});
            }else{
                //从右往左
                yield put({ type: 'contentPageAnimationChange', animationName: "slideRight"});
                yield call(delay, 500);
                yield put({ type: 'contentPageAnimationChange', animationName: "slideLeftReturn"});
            }
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
    }
}
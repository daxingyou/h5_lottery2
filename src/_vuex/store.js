import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'

const state = {
    foc: 0,
    backer: true,
    b: 2,
    new_host:'',
    action:{
                // picurl: 'https://img.will888.cn/photo/pic/',  // 图片地址
                picurl: 'http://admin.baochiapi.com/photo/pic/',
                //
                forseti: 'http://121.58.234.210:19093/forseti/',  // 测试环境
                uaa:  'http://121.58.234.210:19093/uaa/',   // 测试环境
                hermes:  'http://121.58.234.210:19093/hermes/', // 测试环境
                // forseti: 'https://api.88bccp.com/forseti/',   // 线上环境
                // uaa:'https://api.88bccp.com/uaa/',  // 线上环境
                // hermes:'https://api.88bccp.com/hermes/',   // 线上环境
            },
    }



const mutations = {

    Number(state) {
        state.foc++;
    },

    back(state) {
        state.backer = false;
        console.log('back')

    },
    backNormal(state) {
        state.backer = true;
        console.log('backnormal')
    },


}


const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store
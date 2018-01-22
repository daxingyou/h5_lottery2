import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'

const state = {
    foc: 0,
    backer: true,
    b: 2
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
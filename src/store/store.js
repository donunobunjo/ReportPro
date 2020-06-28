import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import baseurl from '../components/baseURL'
Vue.use(Vuex)
Vue.use(VueAxios,Axios)

export default new Vuex.Store({
    state:{
        subjects:[]
    },
    getters:{

    },
    mutations:{
        LOAD_SUBJECTS(state,payload){
            // console.log(payload.data.subjects)
            state.subjects=payload.data.subjects
        }
    },
    actions:{
        async getSubjects({commit}){
            return commit('LOAD_SUBJECTS', await Axios.get(baseurl+'/subject'))
        }

    }
})
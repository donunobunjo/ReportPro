import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import baseurl from '../components/baseURL'
Vue.use(Vuex)
Vue.use(VueAxios,Axios)

export default new Vuex.Store({
    state:{
        subjects:[],
        classes:[],
        sessions:[],
        students:[],
        scores:[]
    },
    getters:{

    },
    mutations:{
        LOAD_SUBJECTS(state,payload){
            state.subjects=payload.data.subjects
        },
        LOAD_CLASSES(state,payload){
            state.classes=payload.data.classes
        },
        LOAD_SESSIONS(state,payload){
            state.sessions= payload.data.sessions
        },
        LOAD_STUDENTS(state,payload){
            state.students=payload.data.students
        },
        LOAD_SCORES(state, payload){
            state.scores=payload.data.scores
        }
    },
    actions:{
        async getSubjects({commit}){
            return commit('LOAD_SUBJECTS', await Axios.get(baseurl+'/subject'))
        },
        async getClasses({commit}){
            return commit('LOAD_CLASSES', await Axios.get(baseurl+'/class'))
        },
        async getSessions({commit}){
            return commit('LOAD_SESSIONS', await Axios.get(baseurl+'/session'))
        },
        async getStudents({commit}){
            return commit('LOAD_STUDENTS', await Axios.get(baseurl+'/student'))
        },
        async getScores({commit}){
            return commit('LOAD_SCORES', await Axios.get(baseurl+'/score'))
        }

    }
})